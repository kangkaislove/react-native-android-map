'use strict';
import React, {Component} from "react";
import {NativeModules} from "react-native";
import NearCarDetail from "./NearCarDetail";
import NearChargeDetail from "./NearChargeDetail";
const _module = NativeModules.NaviModule;
let latitude=0.00;
let longitude=0.00;
let title='';
export default class AlertSelected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:''
        };
        this.select=this.select.bind(this)
    }

    render() {
        title=this.props.markerType;
        if('车'===title){
            return (
                <NearCarDetail  onPress={this._toNavi.bind(this)} ref="nearCarDetail"/>
            );
        }
            return (
                <NearChargeDetail  onPress={this._toNavi.bind(this)} ref="nearChargeDetail"/>
            );

    }

    /**
     * 弹出控件
     */
    select(lat, log) {
        latitude=lat;
        longitude=log;
        if('车'===title){
            this.refs.nearCarDetail.showCar();
        }else{
            this.refs.nearChargeDetail.showCharge();
        }
    }

    _toNavi(){
        _module.naviWithBaidu(latitude,longitude);
    }
}

/*
*
* 需要提醒大家的是，只有在组件的render方法被调用时，ref才会被调用，组件才会返回ref。如果你在调用this.refs.xx时render方法还没被调用，那么你得到的是undefined。
* */
