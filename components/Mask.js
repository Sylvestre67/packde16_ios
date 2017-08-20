import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Mask extends React.Component {

	render(){
		return(<View style={(!this.props.isLoaded) ? styles.Mask : {}}></View>)
	}
}

const styles = StyleSheet.create({
	Mask: {
		position:'absolute',
		top:-width*2,
		left:-width,
		width:width*5,
		height:height*5
	}
});

