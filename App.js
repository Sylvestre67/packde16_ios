import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Import the react-native-sound module
import Sound from 'react-native-sound'
import Swiper from 'react-native-swiper';

import blue_sky from './backgrounds/blue_sky.png';
import bombes from './backgrounds/bombes.png';
import caisse from './backgrounds/caisse.png';
import burger from './backgrounds/burger.png';
import phone from './backgrounds/phone.png';
import ride from './backgrounds/ride.png';
import dinner from './backgrounds/dinner.png';
import toy from './backgrounds/toy.png';

Sound.setCategory('Playback');

const images = [blue_sky, bombes, caisse, burger, phone, ride, dinner, toy];

export default class App extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.sound = new Sound('pack_de_nyls.mp3', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}else{
				// loaded successfully
				this._playSound();
			}
		});
	}

	componentDidMount(){
		this.sound.setVolume(2);
	}

	_playSound(){
		if(!this.sound.isLoaded()) {
			console.log('not_ready');
			// this._playSound();
		}else{
			console.log('ready');
			this.sound.play((success) => {
				if (success) {
					console.log('successfully finished playing');
				} else {
					console.log('playback failed due to audio decoding errors');
				}
			});
		}
	}

	_handleSwipe(index){
		this.sound = new Sound('pack_de_nyls.mp3', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}else{
				// loaded successfully
				this._playSound();
			}
		});
	}

	_renderSwipedView(){
		return images.map((image,index) => {
			return (<View style={styles.slide} key={index}>
				<Image
					style={styles.image}
					source={image}
				/>
			</View>)
		})
	}

	render() {
		return (
			<Swiper style={styles.wrapper}
			        loop={false}
			        onIndexChanged={(index) => {
			        	return this._handleSwipe(index)
			        }}>
				{this._renderSwipedView()}
			</Swiper>
		);
	}
}

var styles = StyleSheet.create({
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
	}
})