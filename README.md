# accel_and_gyro_sensor
Arduino+MPU6050のデータをwebsocketでブラウザに送りTHREE.jsで表示

## How to Use
```
git clone https://github.com/AtsushiNi/accel_and_gyro_sensor.git
cd accel_and_gyro_sensor
yarn
yarn serve
```

## サーバー
websocketサーバー: ws  
シリアルポート: serialport, @serialport/parser-readline  

## クライアント
ポート: 8000  
webサーバー: http  
3D描画: THREE.js  

## jsパッケージマネージャ
yarn
