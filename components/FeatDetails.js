import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');
const xPosIn = 0;
const xPosOut = -750;

export default class FeatDetails extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			slideLeft: new Animated.Value(xPosOut)
		};
	}

	componentDidMount(){
		this._slideIn();
	}

	componentWillReceiveProps(nextProps) {
		// If index has been updated, kick off animation of feat label.
		if(this.props.index !== nextProps.index){
			this._slideOutIn();
		}
	}

	componentWillUnmount(){
		this._slideOut();
	}

	_slideIn(){
		Animated.timing(
			this.state.slideLeft,
			{
				toValue: xPosIn,
				duration: 1000,
			}
		).start();
	}

	_slideOutIn(){
		Animated.sequence([
			Animated.timing(
				this.state.slideLeft,
				{ toValue: xPosOut, duration: 250}
			),
			Animated.delay(100),
			Animated.timing(
				this.state.slideLeft,
				{ toValue: xPosIn, duration: 750 }
			)
		]).start();
	}

	_slideOut(){
		Animated.timing(
			this.state.slideLeft,
			{
				toValue: xPosOut,
				duration: 1000,
			}
		).start();
	}

	render(){
		let { slideLeft } = this.state;
		let feat = this.props.tracks[this.props.index]['feat'];
		let style = {
			flex:1,
			flexDirection: 'row',
			flexWrap:'wrap',
			position:'absolute',
			width: width,
			top:50,
			backgroundColor:'rgba(255, 255, 255, 0.5)'
		};

		return(<Animated.View
			style={{
				...style,
				left: slideLeft
			}}>
			<View style={styles.avatarWrap}>
				<Image  style={styles.avatar}
				        source={this.props.tracks[this.props.index]['avatar']} />
			</View>
			<View style={styles.nameWrap}>
				<Text style={{
					fontSize: 15,
					fontFamily: 'Museo',
				}}>Featuring:</Text>
				<Text style={styles.name}>{feat}</Text>
			</View>
		</Animated.View>)
	}
}

const styles = StyleSheet.create({
	nameWrap:{
		flex:1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		padding:10,
		paddingLeft:0
	},
	name:{
		fontSize: 20,
		fontFamily: 'Museo',
	},
	avatarWrap:{
		padding:10
	},
	avatar: {
		width:80,
		height:80
	}
});



