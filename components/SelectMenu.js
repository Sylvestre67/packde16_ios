import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableHighlight, Animated} from 'react-native';

const { width, height } = Dimensions.get('window');
const yPosIn = 0;
const yPosOut = -height;

export default class SelectMenu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			slideDown: new Animated.Value(yPosOut)
		};
	}

	componentDidUpdate(){
		return (this.props.isOpen) ? this._slideDown() : this._slideUp();
	}

	componentWillUnmount(){
		this._slideUp();
	}

	_slideDown(){
		Animated.timing(
			this.state.slideDown,
			{
				toValue: yPosIn,
				duration: 500,
			}
		).start();
	}

	_slideUp(){
		Animated.timing(
			this.state.slideDown,
			{
				toValue: yPosOut,
				duration: 250,
			}
		).start();
	}

	render(){
		let { slideDown } = this.state;
		let style = {
			position:'absolute',
			width: width,
			height:height,
			paddingTop:60,
			backgroundColor:'rgba(255,255,255,0.3)'
		};

		const tracks = this.props.tracks.map((track,index) => {
			return (
				<View key={index} style={styles.trackCard}>
					<Text style={styles.trackTitle}>
						{(this.props.index + 1) + '. ' + track.title}
					</Text>
				</View>
			)
		});

		for(var i=0;i<150;i++){
			tracks.push(<View key={Math.random()} style={styles.trackCard}>
				<Text style={styles.trackTitle}>
					Fake Card
				</Text>
			</View>)
		}

		return(<Animated.ScrollView style={{...style, top: slideDown}}>
			{tracks}
		</Animated.ScrollView>)
	}
}

const styles = StyleSheet.create({
	trackCard:{
		width:width * .8,
		marginLeft:width*.1,
		marginBottom:20,
		maxHeight:50,
		backgroundColor:'rgba(255,255,255,0.5)',
		// flex:1,
		// flexDirection:'row',
		// justifyContent:'center',
		// alignContent:'center'
	},
	trackTitle:{
		fontSize: 20,
		fontFamily: 'Museo',
	}
});
