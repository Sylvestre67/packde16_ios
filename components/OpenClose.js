import React from 'react';
import { StyleSheet, View, TouchableHighlight,  Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/*find icons name at https://ionicframework.com/docs/ionicons/*/
const { width, height } = Dimensions.get('window');

export default class OpenClose extends React.Component {
	constructor(props){
		super(props);
	}

	_renderIcons(){
		let icon;
		icon = (this.props.isOpen)
			? <Icon name="ios-close-outline" style={styles.openCloseBtn} />
			: <Icon name="ios-list-outline" style={styles.openCloseBtn}  />
		return icon
	}

	render(){
		return(<TouchableHighlight underlayColor="rgba(255, 255, 255, 0.5)"
		                           onPress={this.props.onPress}>
				<View style={styles.openCloseWrap}>
					{this._renderIcons()}
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	openCloseWrap:{
		position:'absolute',
		top:25,
		left:(width - 50),
		borderRadius:40,
		width:40,
		height:40,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		paddingTop:2,
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent:'center',
	},
	openCloseBtn: {
		color:'rgba(0,0,0,0.5)',
		fontSize: 35,
	}
});
