import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight, Alert } from 'react-native';

import _ from 'lodash';
import Sound from 'react-native-sound'
import Swiper from 'react-native-swiper';


import PlayPause from './components/PlayPause';
import TrackDetails from './components/TrackDetails';
import Mask from './components/Mask';

import blue_sky from './backgrounds/blue_sky.png';
import bombes from './backgrounds/bombes.png';
import caisse from './backgrounds/caisse.png';
import burger from './backgrounds/burger.png';
import phone from './backgrounds/phone.png';
import ride from './backgrounds/ride.png';
import dinner from './backgrounds/dinner.png';
import toy from './backgrounds/toy.png';

Sound.setCategory('Playback');

const { width, height } = Dimensions.get('window');
const images = [blue_sky, bombes, caisse, burger, phone, ride, dinner, toy];
const tracks = [
	{
		url  : 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/11_je_ne_comprends_pas.mp3?raw=true',
		title: 'Je ne comprends pas',
		feat : 'Mr. Kozmo ft. #packde16'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
	{
		url: 'https://github.com/Sylvestre67/packde16_ios/blob/master/audio/pack_de_nyls.mp3?raw=true',
		title: 'Pack de Nyls',
		feat: 'Mr. Kozmo ft. Nyls'
	},
];

// basePath: Sound.MAIN_BUNDLE,

export default class App extends React.Component {
	constructor(props){
		super(props);
		this._playSound = this._playSound.bind(this);
		this._playPauseSound = this._playPauseSound.bind(this);
		this._renderPagination = this._renderPagination.bind(this);

		// this._loadNewSound = _.debounce(this._loadNewSound, 1000);
		this._handleSwipe = _.debounce(this._handleSwipe, 1000);

		this.swiper = {};
	}

	componentWillMount(){
		this.setState(() => {
			return Object.assign({},{
				releaseAndReload: false,
				hasError: false,
				isPlaying: false,
				isLoaded: true,
				tracks: tracks,
				index: 0,
				sound: {}
			})
		});
	}

	componentDidUpdate(prevProps, prevState){}

	componentDidMount(){
		/* Load track 0 */
		this._loadNewSound(this.state.index);
	}

	_loadNewSound(trackIndex){

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
				this._playSound();
			}
		});

		return newSound;
	}

	_playSound(){
		const song = this.state.sound;
		if(!song.isLoaded()) {
			// this.setState(() => { return { isPlaying: false } });
			// Check back in 100ms.
			setInterval(() => { this._playSound(); },100);
		}else{
			this.setState((prevState) => { return Object.assign(prevState,{ isPlaying: true }) });
			song.play((success) => {
				// This callback for when the sound has successfully been played to the end.
				if (success) {
					this.setState((prevState) => { return Object.assign(prevState,{ isPlaying: false }) });
					// this._scrollToNext();
				} else {
					console.log('playback failed due to audio decoding errors');
					this.setState((prevState) => { return Object.assign(prevState,{ hasError: true }) });
				}
			});
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
		return (this.swiper.state.index < this.swiper.props.children.length - 1)
			? (this.swiper.scrollBy(1, true),this._handleSwipe())
			: false;
	}

	_handleSwipe(index){

		this.setState((prevState) => {
			(this.state.sound.release) ? this.state.sound.release() : false;
			return Object.assign(prevState,{ sound: {} })
		});

		this._loadNewSound(index);
	}

	_renderSwipedView(){
		return images.map((image,index) => {
			return (<View style={styles.slide} key={index}>
				<Image  style={styles.image}  source={image} />
			</View>)
		})
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
		return (<Swiper ref={component => this.swiper = component}
			            loop={false}
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
			</Swiper>)
	}
}

const styles = StyleSheet.create({
	wrapper: {

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
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	cardStyle: {
		flex:1,
		flexDirection: 'row',
		flexWrap:'wrap',
		justifyContent: 'space-around',
		alignContent: 'center',
	}
});