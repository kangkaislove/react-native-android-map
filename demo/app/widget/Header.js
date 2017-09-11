/**
 * 自定义头部组件
 * Created by k.k on 2017/8/18.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Text, TouchableOpacity, Platform
} from 'react-native';

const {width} = Dimensions.get('window');
const screenWidth = width;
class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.Container}>
               {/* <TouchableOpacity style={styles.btn} onPress={this.props.onPress}>
                    <Icon name='md-menu' size={24} color='#EEE'/>
                </TouchableOpacity>*/}
                <View style={styles.Title}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#2EAD63',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 10 : 10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        justifyContent:'center'
    },
    Title: {
        backgroundColor: '#2EAD63',
    },
    titleText: {
        color: '#fff',
        fontSize: 18,
    }
})

export default Header;
