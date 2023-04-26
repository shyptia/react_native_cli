import DeviceInfo from 'react-native-device-info';

export const getDeviceInfo = async () => {
  const deviceInfo = {};

  deviceInfo.apiLevel = await DeviceInfo.getApiLevel();
  deviceInfo.androidId = await DeviceInfo.getAndroidId();
  deviceInfo.appName = DeviceInfo.getApplicationName();
  deviceInfo.batteryState = await DeviceInfo.getPowerState();
  deviceInfo.brand = DeviceInfo.getBrand();
  deviceInfo.carrier = await DeviceInfo.getCarrier();
  deviceInfo.deviceId = DeviceInfo.getDeviceId();
  deviceInfo.deviceName = await DeviceInfo.getDeviceName();
  deviceInfo.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
  deviceInfo.host = await DeviceInfo.getHost();
  deviceInfo.ip = await DeviceInfo.getIpAddress();
  deviceInfo.systemVersion = DeviceInfo.getSystemVersion();
  deviceInfo.uniqueId = await DeviceInfo.syncUniqueId();
  deviceInfo.type = DeviceInfo.getDeviceType();

  console.log(deviceInfo);
};
