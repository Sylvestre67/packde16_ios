import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableHighlight } from 'react-native';

export default class TrackDetails extends React.Component {

	render(){
		const track = this.props.tracks[this.props.index];
		return(<View style={styles.trackDetails}>
				<Text style={styles.trackTitle}>{track.title}</Text>
				<Text style={styles.trackFeat}>{track.feat}</Text>
			</View>)
	}
}

const styles = StyleSheet.create({
	trackDetails: {
		flex:3,
		flexDirection: 'column',
		flexWrap:'wrap',
		padding:10,
	},
	trackTitle: {
		fontSize: 20,
		fontFamily: 'Museo',
	},
	trackFeat: {
		fontSize: 15,
		fontFamily: 'Museo',
	},
});
