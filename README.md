该项目基于https://github.com/lovebing/react-native-baidu-map库进行适应性修改，万分感谢lovebing！

Baidu Map SDK modules and view for React Native(目前适配Android), support react native 0.40+.

为背景物流新能源平台的氢能源卡车。地图上找车，找氢气站，并使用第三方地图客户端导航至指定位置！

![地图上车的位置](https://raw.githubusercontent.com/kangkaislove/react-native-android-map/master/Screenshots/car.jpg)                     ![车站详细信息](https://raw.githubusercontent.com/kangkaislove/react-native-android-map/master/Screenshots/car_location.jpg)
![导航路径规划](https://raw.githubusercontent.com/kangkaislove/react-native-android-map/master/Screenshots/navi.jpg)
![地图上充电站的位置](https://raw.githubusercontent.com/kangkaislove/react-native-android-map/master/Screenshots/site.jpg)
![充电站详细信息](https://raw.githubusercontent.com/kangkaislove/react-native-android-map/master/Screenshots/site_location.jpg)

### Install 安装
    npm install react-native-android-map --save
    
### Import 导入

#### Android Studio
- settings.gradle `
include ':react-native-android-map'
project(':react-native-android-map').projectDir = new File(settingsDir, '../node_modules/react-native-android-map/android')`

- build.gradle `compile project(':react-native-android-map')`

- MainApplication`new BaiduMapPackage(getApplicationContext())`

- AndroidMainifest.xml `<meta-data
            android:name="com.baidu.lbsapi.API_KEY" android:value="xx"/>`
