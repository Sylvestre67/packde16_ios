import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound'
import Swiper from 'react-native-swiper';
import KeepAwake from 'react-native-keep-awake';

import PlayPause from './components/PlayPause';
import TrackDetails from './components/TrackDetails';
import FeatDetails from './components/FeatDetails';
import SelectMenu from './components/SelectMenu';
import OpenClose from './components/OpenClose';

import blue_sky from './backgrounds/blue_sky.png';
import bombes from './backgrounds/bombes.png';
import caisse from './backgrounds/caisse.png';
import burger from './backgrounds/burger.png';
import phone from './backgrounds/phone.png';
import ride from './backgrounds/ride.png';
import dinner from './backgrounds/dinner.png';
import toy from './backgrounds/toy.png';

Sound.setCategory('Playback');
KeepAwake.activate();

const { width, height } = Dimensions.get('window');
const images = [blue_sky, bombes, caisse, burger, phone, ride, dinner, toy];
const tracks = [
	{
		url  : 'https://s3.eu-central-1.amazonaws.com/pack-de-16/11_je_ne_comprends_pas.mp3',
		title: 'Je ne comprends pas',
		feat : '#packde16',
		avatar: burger
	},
	{
		url: 'https://s3.eu-central-1.amazonaws.com/pack-de-16/pack_de_nyls.mp3',
		title: 'Pack de Nyls',
		feat: 'Nyls',
		avatar: ride
	},
	{
		url: 'https://s3.eu-central-1.amazonaws.com/pack-de-16/pack_de_nyls.mp3',
		title: 'Pack de Nyls',
		feat: 'Jeser',
		avatar: toy
	}
];

export default class App extends React.Component {
	constructor(props){
		super(props);
		this._playSound = this._playSound.bind(this);
		this._playPauseSound = this._playPauseSound.bind(this);
		this._renderPagination = this._renderPagination.bind(this);
		this._handleSwipe = _.debounce(this._handleSwipe, 500);
		this._toggleMenu = this._toggleMenu.bind(this);

		this.swiper = {};
	}

	componentWillMount(){
		this.setState(() => {
			return Object.assign({},{
				releaseAndReload: false,
				hasError: false,
				isPlaying: false,
				isLoaded: false,
				tracks: tracks,
				index: 0,
				sound: {},
				isOpen: false
			})
		});
	}

	componentDidMount(){
		/* Load track 0 */
		this._loadNewSound(this.state.index,true);
	}

	_loadNewSound(trackIndex,initial){

		this.setState((prevState) => {
			return Object.assign(prevState,{ isLoaded: false })
		});

		newSound = new Sound(this.state.tracks[trackIndex].url, this.state.tracks[trackIndex].basePath,(error) => {
			if (error) {
				console.log('failed to load the sound', error);
				Alert.alert('error', error.message);
				return;
			}else{
				this.setState((prevState) => {
					return Object.assign(prevState,{ isLoaded: true, sound: newSound })
				});

				if(!initial){
					this._playSound();
				}
			}
		});

		return newSound;
	}

	_playSound(){

		const song = this.state.sound;

		if(song.isLoaded && song.isLoaded()) {
			this.setState((prevState) => { return Object.assign(prevState,{ isPlaying: true }) });
			song.play((success) => {
				// This callback for when the sound has successfully been played to the end.
				if (success) {
					this.setState((prevState) => {
						this._scrollToNext();
						return Object.assign(prevState,{ isPlaying: false })
					});
				} else {
					console.log('playback failed due to audio decoding errors');
					this.setState((prevState) => { return Object.assign(prevState,{ hasError: true }) });
				}
			});
		}else{
			setTimeout(() => { this._playSound(); },500);
		}
	}

	_playPauseSound(){
		this.setState((prevState) => {
			(this.state.isPlaying)
				? this.state.sound.pause()
				: this.state.sound.play();
			return Object.assign(prevState,{ isPlaying: !prevState.isPlaying })
		});
	}

	_scrollToNext(){
		(this.swiper.state.index < this.swiper.props.children.length - 1)
			? (this.swiper.scrollBy(1, true))
			: false;
		return true
	}

	_handleSwipe(index){

		this.setState((prevState) => {
			(this.state.sound.release) ? this.state.sound.release() : false;
			return Object.assign(prevState,{ sound: {} })
		});

		this._loadNewSound(index);
	}

	_toggleMenu(){
		this.setState((prevState) => {
			return {isOpen: !prevState.isOpen}
		})
	}

	_renderSwipedView(){
		return images.map((image,index) => {
			return (<View style={styles.slide} key={index}>
				<Image  style={styles.image}  source={image} />
			</View>)
		});
	}

	_renderPagination(index, total, context){
		return (<View style={styles.paginationStyle}>
				<View style={styles.cardStyle}>
					<PlayPause {...this.state} onPress={this._playPauseSound}/>
					<TrackDetails {...this.state} />
				</View>
			</View>)
	}

	render() {

		return (<View style={styles.wrapper}>
			<Swiper ref={component => this.swiper = component}
			        loop={false}
			        showsButtons={true}
			        nextButton={<View style={styles.buttonTextWrapper}>
				        <Icon name="ios-arrow-forward" style={styles.buttonText} />
			        </View>}
			        prevButton={<View style={styles.buttonTextWrapper}>
				        <Icon name="ios-arrow-back" style={styles.buttonText} />
			        </View>}
			        renderPagination={ this._renderPagination }
			        onMomentumScrollEnd={(e, state, context) => {
				        /* pause the song */
				        (this.state.sound.pause) ? this.state.sound.pause() : false;

				        this.setState((prevState) => {
					        return Object.assign(prevState,{
						        index: state.index,
						        isPlaying: false,
						        isLoaded: false })
				        });

				        return this._handleSwipe(state.index)
			        }}
			        onTouchStartCapture={(e, state, context) => {}}>
				{this._renderSwipedView()}
			</Swiper>
			<View style={{position:'absolute', top:0}}>
				<FeatDetails {...this.state} />
			</View>
			<View style={{position:'absolute', top:0}}>
				<SelectMenu {...this.state} {...this.props} />
			</View>
			<View style={{position:'absolute', top:0}}>
				<OpenClose isOpen={this.state.isOpen} onPress={this._toggleMenu} />
			</View>
		</View>)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex:1
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	image: {
		flex: 1,
		resizeMode: 'cover'
	},
	paginationStyle:{
		position: 'absolute',
		width:  width * .8,
		bottom: width * .1,
		left:  width * .1,
	},
	cardStyle: {
		flex:1,
		flexDirection: 'row',
		flexWrap:'wrap',
		justifyContent: 'space-around',
		alignContent: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	buttonTextWrapper:{
		borderRadius:40,
		width:40,
		height:40,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		paddingTop:10,
		paddingLeft:17
	},
	buttonText: {
		color:'rgba(0,0,0,0.5)',
		fontSize: 20,
	}
});