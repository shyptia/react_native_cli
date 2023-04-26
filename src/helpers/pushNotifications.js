import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export const askPermission = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    {
      title: 'Notifications',
      message: 'This app would like to send you notificastions.',
      buttonPositive: 'Please accept bare mortal',
    },
  )
    .then(res => {
      console.log('Permission: ', res);
    })
    .catch(error => {
      console.error('Permission error: ', error);
    });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFMCToken();
  }
}

async function GetFMCToken() {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old token', fcmToken);

  if (!fcmToken) {
    try {
      const newFcmToken = await messaging().getToken();

      if (newFcmToken) {
        console.log('new token', newFcmToken);
        await AsyncStorage.setItem('fcmToken', newFcmToken);
      }
    } catch (error) {
      console.log('Error occur in fcmToken');
    }
  }
}

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => console.log('failed', error));

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
  });
};
