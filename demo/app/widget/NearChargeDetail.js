/**
 * Created by k.k on 2017/9/7.
 */

import React, {Component} from "react";
import {Animated, Dimensions, Easing, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [width - 28, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

class NearChargeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
        };
    }

    render() {
        if (this.state.hide) {
            return (<View />)
        } else {
            return (
                <View style={styles.Container}>

                    <Animated.View style={ styles.mask }>
                        <TouchableOpacity style={{flex: 1}} onPress={this.iknow.bind(this)}/>
                    </Animated.View>

                    <Animated.View style={[styles.tip, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, (height - aHeight - 34)]
                            }),
                        }]
                    }]}>

                        <View style={{flexDirection: 'row', backgroundColor: 'white', alignItems: 'center'}}>
                            <Image style={{width: 50, height: 50}} source={require('./../imgs/near_charge_press.png')}/>
                            <View style={{justifyContent: 'center', marginLeft: 6}}>
                                <Text style={{color: 'gray'}}>黄岗岭充电站</Text>
                                <Text style={{color: 'gray'}}>站长电话:18129834293</Text>
                            </View>
                            <Image style={{width: 15, height: 15, marginLeft: 55}}
                                   source={require('./../imgs/near_location.png')}/>
                            <Text style={{color: 'gray', marginLeft: 4}}>11.80km</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: 50}}/>
                            <Text style={{color: 'gray', marginLeft: 6}}>宝安区黄岗岭工业区B栋商铺108号</Text>
                        </View>

                        <View style={{height:50,flexDirection: 'row',alignItems:'center'}}>
                            <View style={{width: 55}}/>
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Image style={{width: 25, height: 25}} source={require('./../imgs/near_dialog_fast.png')}/>
                                <Text style={{color: 'gray',fontSize:16,marginLeft:4}}>空闲3个/</Text>
                                <Text style={{color: '#B1B1B2',fontSize:16}}>共3个</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems:'center',marginLeft:10}}>
                                <Image style={{width: 25, height: 25}} source={require('./../imgs/near_dialog_slow.png')}/>
                                <Text style={{color: 'gray',fontSize:16,marginLeft:4}}>空闲0个/</Text>
                                <Text style={{color: '#B1B1B2',fontSize:16}}>共0个</Text>
                            </View>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#E5E5E6', marginTop: 10,}}/>

                        <TouchableOpacity onPress={this.props.onPress}>
                            <View
                                style={{
                                    height: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Image style={{width: 20, height: 20,}} source={require('./../imgs/nav.png')}/>
                                <Text
                                    style={{
                                        color: '#2EAD63',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        marginLeft: 4
                                    }}>到这里去</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            );
        }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,//一个用于定义曲线的渐变函数
                    duration: 200,//动画持续的时间（单位是毫秒），默认为200。
                    toValue: 0.8,//动画的最终值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start((finished) => this.setState({hide: true}));

    }

    //取消
    iknow(event) {
        if (!this.state.hide) {
            this.out();
        }
    }

    /**
     * 弹出控件
     */
    showCharge() {
        this.setState({ hide: false}, this.in);
    }

}

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.8,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    tip: {
        position: "absolute",
        width: width,
        height: 180,
        backgroundColor: "#fff",
        top: 50,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 10,
        paddingLeft: 10
    },
});


export default NearChargeDetail;