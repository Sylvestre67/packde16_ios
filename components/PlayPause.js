import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/*find icons name at https://ionicframework.com/docs/ionicons/*/

export default class PlayPause extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
	}

	_renderIcons(){
		let icon;
		if(!this.props.isLoaded){
			icon = <Icon name="ios-refresh" style={styles.playPauseIcon} />
		}else{
			icon = (this.props.isPlaying)
				? <Icon name="ios-pause-outline" style={styles.playPauseIcon} />
				: <Icon name="ios-play-outline" style={styles.playPauseIcon}  />
		}
		return icon
	}

	render(){
		return(<TouchableHighlight underlayColor="rgba(255, 255, 255, 0.5)"
			                    onPress={(this.props.isLoaded) ? this.props.onPress : () => { return; }}
			                    style={styles.playPauseBtn}>
				<View>
					{this._renderIcons()}
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	playPauseBtn: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems:'center'
	},
	playPauseIcon:{
		fontSize: 30
	}
});
