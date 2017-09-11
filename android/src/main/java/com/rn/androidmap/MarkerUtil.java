package com.rn.androidmap;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.Marker;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.map.OverlayOptions;
import com.baidu.mapapi.model.LatLng;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by k.k 2017/9/8.
 */
public class MarkerUtil {

    //从option中获取经纬度消息
    private static LatLng getLatLngFromOption(ReadableMap option) {
        double latitude = option.getDouble("latitude");
        double longitude = option.getDouble("longitude");
        return new LatLng(latitude, longitude);
    }

    //更新当前位置信息
    public static void updateLocation(Marker maker, ReadableMap option) {
        LatLng position = getLatLngFromOption(option);
        maker.setPosition(position);
        maker.setTitle(option.getString("title"));
    }


    //显示当前位置信息
    public static Marker showLocation(MapView mapView, ReadableMap option, ThemedReactContext mReactContext) {
        ImageView imageView = new ImageView(mReactContext);
        imageView.setLayoutParams(new LinearLayout.LayoutParams(60, 60));
        imageView.setBackgroundResource(R.drawable.current_location_circle);
        BitmapDescriptor bitmap = BitmapDescriptorFactory.fromView(imageView);
        LatLng position = getLatLngFromOption(option);
        OverlayOptions overlayOptions = new MarkerOptions()
                .icon(bitmap)
                .position(position)
                .title(option.getString("title"));

        Marker marker = (Marker) mapView.getMap().addOverlay(overlayOptions);
        return marker;
    }

    //更新覆盖物
    public static void updateMaker(Marker maker, ReadableMap option) {
        LatLng position = getLatLngFromOption(option);
        maker.setPosition(position);
        maker.setTitle(option.getString("title"));
    }

    //添加车辆覆盖物
    public static Marker addMarker(MapView mapView, ReadableMap option, ThemedReactContext mReactContext) {
        BitmapDescriptor bitmap = BitmapDescriptorFactory.fromBitmap(drawtext(drawbitmap(mReactContext, R.mipmap.map_car_n), option.getString("title")));
        LatLng position = getLatLngFromOption(option);
        OverlayOptions overlayOptions = new MarkerOptions()
                .icon(bitmap)
                .position(position)
                .title(option.getString("title"));

        Marker marker = (Marker) mapView.getMap().addOverlay(overlayOptions);

        return marker;
    }

    //添加充电站覆盖物
    public static Marker addChargeMarker(MapView mapView, ReadableMap option, ThemedReactContext mReactContext) {
        BitmapDescriptor bitmap = BitmapDescriptorFactory.fromBitmap(drawtext(drawbitmap(mReactContext, R.mipmap.map_charge_n), option.getString("title")));
        LatLng position = getLatLngFromOption(option);
        OverlayOptions overlayOptions = new MarkerOptions()
                .icon(bitmap)
                .position(position)
                .title(option.getString("title"));

        Marker marker = (Marker) mapView.getMap().addOverlay(overlayOptions);

        return marker;
    }


    private static Bitmap drawbitmap(ThemedReactContext mReactContext, int resId) {
        // TODO Auto-generated method stub
        Bitmap photo = BitmapFactory.decodeResource(mReactContext.getResources(), resId);
        int width = photo.getWidth();
        int hight = photo.getHeight();
        Bitmap newb = Bitmap.createBitmap(width, hight, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(newb);// 初始化和方框一样大小的位图
        Paint photoPaint = new Paint(); // 建立画笔
        canvas.drawBitmap(photo, 0, 0, photoPaint);
        canvas.save(Canvas.ALL_SAVE_FLAG);
        canvas.restore();
        return newb;
    }

    private static Bitmap drawtext(Bitmap bitmap3, String info) {
        // TODO Auto-generated method stub
        int width = bitmap3.getWidth(), hight = bitmap3.getHeight();
        Bitmap btm = Bitmap.createBitmap(width, hight, Bitmap.Config.ARGB_8888); //建立一个空的BItMap
        Canvas canvas = new Canvas(btm);
        Paint photoPaint = new Paint(); //建立画笔
        photoPaint.setDither(true); //获取跟清晰的图像采样
        photoPaint.setFilterBitmap(true);//过滤一些
        Rect src = new Rect(0, 0, bitmap3.getWidth(), bitmap3.getHeight());//创建一个指定的新矩形的坐标
        Rect dst = new Rect(0, 0, width, hight);//创建一个指定的新矩形的坐标
        canvas.drawBitmap(bitmap3, src, dst, photoPaint);//将photo 缩放或则扩大到 dst使用的填充区photoPaint
        Paint textPaint = new Paint(Paint.ANTI_ALIAS_FLAG | Paint.DEV_KERN_TEXT_FLAG);//设置画笔
        textPaint.setTextSize(42.0f);//字体大小
        textPaint.setTypeface(Typeface.DEFAULT_BOLD);//采用默认的宽度
        textPaint.setColor(Color.GRAY);//采用的颜色
        canvas.drawText(info, 56, 55, textPaint);//绘制上去字，中间参数为坐标点
        canvas.save(Canvas.ALL_SAVE_FLAG); //保存
        canvas.restore();
        return btm;
    }
}
