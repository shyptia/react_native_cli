import {Notifications} from 'react-native-notifications';
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

export const notificationListener = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerRemoteNotificationsRegistered(event => {
    console.log('Device Token Received', event.deviceToken);
  });

  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    event => {
      console.error(event);
    },
  );

  Notifications.events().registerNotificationReceivedForeground(
    (notification, completion) => {
      console.log('Notification received in foreground');
      completion({alert: true, sound: true, badge: false});
    },
  );

  Notifications.events().registerNotificationOpened(
    (notification, completion) => {
      console.log('Notification opened');
      completion();
    },
  );

  Notifications.events().registerNotificationReceivedBackground(
    (notification, completion) => {
      console.log(
        `Notification received in background: ${notification.title} : ${notification.body}`,
      );

      completion({alert: true, sound: true, badge: false});
    },
  );
};
