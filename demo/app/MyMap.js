/**
 * @author k.k
 */
'use strict';
import React, {Component} from "react";

import {Geolocation, MapTypes, MapView} from "react-native-android-map";

import {Alert, BackHandler, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";

import Dimensions from "Dimensions";
import Header from "./widget/Header";
import AlertSelected from "./widget/AlertSelected";
const {width} = Dimensions.get('window');
const screenWidth = width;


export default class BaiduMapDemo extends Component {

    constructor() {
        super();

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15,
            currentLocation: {
                latitude: 0.00,
                longitude: 0.00,
                title: '当前位置'
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            carMarkers: [{
                longitude: 113.981718,
                latitude: 22.542449,
                title: "车"
            }, {
                longitude: 113.959998,
                latitude: 22.525442,
                title: "车"
            }, {
                longitude: 113.949718,
                latitude: 22.537442,
                title: "车"
            }, {
                longitude: 113.981318,
                latitude: 22.537642,
                title: "车"
            }, {
                longitude: 113.941718,
                latitude: 22.537642,
                title: "车"
            }],
            chargeMarkers: [],
            markerType:'车',
            carSelected: true,
            siteSelected: false
        };
        this.viewNearCar = this.viewNearCar.bind();
        this.viewHStation = this.viewHStation.bind();
        this.toCurrentLocation = this.toCurrentLocation.bind(this);
        this.showAlertSelected = this.showAlertSelected.bind(this);
    }

    componentDidMount() {
        this.getCurrentLocationInfo();
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress',this.onBackAndroid);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',this.onBackAndroid);
    }

    onBackAndroid =() =>{
        if(this.lastBackPressed && this.lastBackPressed +2000 >=Date.now()){
            //最近2秒按过back键，可以退出应用
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    }

    getCurrentLocationInfo() {
        Geolocation.getCurrentPosition()
            .then(data => {
                console.log(JSON.stringify(data));
                this.setState({
                    currentLocation: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        title: '当前位置'
                    }
                });
            })
            .catch(e => {
                console.log(e, 'error');
            })
    }

    render() {
        const carSelected = this.state.carSelected;
        const siteSelected = this.state.siteSelected;
        if (carSelected && !siteSelected) {
            return (
                <View style={styles.Container}>
                    <Header title="附近"/>
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        currentLocation={this.state.currentLocation}
                        carMarkers={this.state.carMarkers}
                        chargeMarkers={this.state.chargeMarkers}
                        style={styles.map}
                        onMarkerClick={(e) => {
                            console.log(JSON.stringify(e))
                            this.showAlertSelected(e.position.latitude, e.position.longitude);
                        }}
                        onMapClick={(e) => {
                            console.log(JSON.stringify(e));
                        }}
                    >
                    </MapView>
                    <TouchableOpacity activeOpacity={1} style={styles.SearchText}
                                      onPress={() => Alert.alert('跳转到搜索详情界面')}>
                        <Image style={{width: 15, height: 15}} source={require('./imgs/ic_search.png')}/>
                        <Text style={{color: 'gray', marginLeft: 10, fontSize: 14}}>搜租赁点、搜充电站</Text>
                    </TouchableOpacity>
                    <View style={styles.nearService}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => this.viewNearCar(this)}>
                            <Image style={{width: 50, height: 50}} source={require('./imgs/near_car_press.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={() => this.viewHStation(this)}>
                            <Image style={{width: 50, height: 50}} source={require('./imgs/near_charge_normal.png')}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.Location} onPress={() => this.toCurrentLocation(this)}>
                        <Image style={{width: 40, height: 40}} source={require('./imgs/baidu_location.png')}/>
                    </TouchableOpacity>
                    <AlertSelected ref="alertSelected" markerType={this.state.markerType}/>
                </View>
            )
        }
        return (
            <View style={styles.Container}>
                <Header title="附近"/>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    currentLocation={this.state.currentLocation}
                    carMarkers={this.state.carMarkers}
                    chargeMarkers={this.state.chargeMarkers}
                    style={styles.map}
                    onMarkerClick={(e) => {
                        console.log(JSON.stringify(e))
                        this.showAlertSelected(e.position.latitude, e.position.longitude);
                    }}
                    onMapClick={(e) => {
                    }}
                >
                </MapView>
                <TouchableOpacity style={styles.SearchText} activeOpacity={1} onPress={() => Alert.alert('跳转到搜索详情界面')}>
                    <Image style={{width: 15, height: 15}} source={require('./imgs/ic_search.png')}/>
                    <Text style={{color: 'gray', marginLeft: 10, fontSize: 14}}>搜租赁点、搜充电站</Text>
                </TouchableOpacity>
                <View style={styles.nearService}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.viewNearCar(this)}>
                        <Image style={{width: 50, height: 50}} source={require('./imgs/near_car_normal.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.viewHStation(this)}>
                        <Image style={{width: 50, height: 50}} source={require('./imgs/near_charge_press.png')}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.Location} onPress={() => this.toCurrentLocation(this)}>
                    <Image style={{width: 40, height: 40}} source={require('./imgs/baidu_location.png')}/>
                </TouchableOpacity>
                <AlertSelected ref="alertSelected" markerType={this.state.markerType}/>
            </View>
        );


    }


    showAlertSelected(lat, log) {
        this.refs.alertSelected.select(lat, log);
    }

    /*查看附近车辆*/
    viewNearCar(context) {
        context.setState({
            carMarkers: [
                {
                    longitude: 113.981718,
                    latitude: 22.542449,
                    title: "车"
                }, {
                    longitude: 113.959998,
                    latitude: 22.525442,
                    title: "车"
                }, {
                    longitude: 113.949718,
                    latitude: 22.537442,
                    title: "车"
                }, {
                    longitude: 113.981318,
                    latitude: 22.537642,
                    title: "车"
                }, {
                    longitude: 113.941718,
                    latitude: 22.537642,
                    title: "车"
                }
            ],
            chargeMarkers: [],
            markerType:'车',
            carSelected: true,
            siteSelected: false
        });
    }

    /*查看附近氢气站*/
    viewHStation(context) {
        context.setState({
            chargeMarkers: [
                {
                    longitude: 113.981718,
                    latitude: 22.546749,
                    title: "站"
                }, {
                    longitude: 113.959998,
                    latitude: 22.528642,
                    title: "站"
                }, {
                    longitude: 113.949718,
                    latitude: 22.533542,
                    title: "站"
                }
            ],
            carMarkers: [],
            markerType:'站',
            carSelected: false,
            siteSelected: true
        });
    }

    /*回到当前位置*/
    toCurrentLocation(context) {
        context.getCurrentLocationInfo();
    }

}


const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: '#2EAD63',
    },
    map: {
        flex: 1,
    },
    SearchText: {
        flexDirection: 'row',
        width: screenWidth - 50,
        height: 35,
        marginRight: 25,
        marginLeft: 25,
        position: 'absolute',
        backgroundColor: 'white',
        top: 60,
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        borderRadius: 4
    },
    nearService: {
        flex: 1,
        position: 'absolute',
        top: 120,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    Location: {
        flex: 1,
        position: 'absolute',
        top: 520,
        alignItems: 'flex-end',
        marginLeft: 20,
    }

});
