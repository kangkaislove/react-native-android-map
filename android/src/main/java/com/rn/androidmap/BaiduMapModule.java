package com.rn.androidmap;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by k.k 2017/9/8.
 */
public class BaiduMapModule extends BaseModule {

    private static final String REACT_CLASS = "BaiduMapModule";
    public BaiduMapModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    public String getName() {
        return REACT_CLASS;
    }
}
