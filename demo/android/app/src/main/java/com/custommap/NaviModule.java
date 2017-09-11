package com.custommap;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.net.URISyntaxException;

/**
 * 作者： k.k on 2017/8/30.
 * 邮箱：214525789@qq.com
 */

public class NaviModule extends ReactContextBaseJavaModule{

    public static final String MYINTENTMODULE = "NaviModule";
    private Context context;

    public NaviModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
    }

    @Override
    public String getName() {
        return MYINTENTMODULE;
    }

    @ReactMethod
    public void naviWithBaidu(float latitude,float longitude){
        if(isInstallByRead("com.baidu.BaiduMap")){
            goToBaiduMapActivity(context,latitude+"",longitude+""); //启动调用
        }else{
            Toast.makeText(context,"请先安装百度地图客户端",Toast.LENGTH_SHORT).show();
        }
    }

    public  void goToBaiduMapActivity(Context context,String latlng, String lonlng){
        StringBuffer stringBuffer  = new StringBuffer("baidumap://map/direction?destination=");
        stringBuffer.append(latlng)
                .append(",").append(lonlng)
                .append("&mode=").append("driving");
        Log.e(MYINTENTMODULE,"百度地图导航的参数为:" + stringBuffer.toString());
        Intent intent = null;
        try {
            intent = Intent.getIntent(stringBuffer.toString());
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    /**
     * 根据包名检测某个APP是否安装
     * @param packageName 包名
     * @return true 安装 false 没有安装
     */
    public  boolean isInstallByRead(String packageName) {
        return new File("/data/data/" + packageName).exists();
    }
}
