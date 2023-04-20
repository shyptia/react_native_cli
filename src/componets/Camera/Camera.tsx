/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  Platform,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './CameraStyles';
import LinearGradient from 'react-native-linear-gradient';
import {AppButton} from '../AppButton/AppButton';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {request, PERMISSIONS} from 'react-native-permissions';
import {RNCamera} from 'react-native-camera';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Camera'>;
};

export const Camera: React.FC<Props> = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [cameraPermission, setCameraPermission] = useState(false);
  const cameraRef = useRef<RNCamera | null>(null);

  const checkCameraPermission = async () => {
    const permission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );

    setCameraPermission(permission === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};

      try {
        const data = await cameraRef.current.takePictureAsync(options);
        console.log(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      const options = {
        quality: RNCamera.Constants.VideoQuality['720p'],
        maxDuration: 5,
      };

      try {
        const data = await cameraRef.current.recordAsync(options);
        console.log(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.viewContent}>
          <LinearGradient
            colors={['#f2cc7b', '#cc420a']}
            style={styles.linearGradient}>
            {cameraPermission ? (
              <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
              />
            ) : (
              <Text style={styles.text}>Camera permission is not granted</Text>
            )}

            <AppButton title="Take photo" onPress={takePicture} />
            <AppButton title="Record video" onPress={recordVideo} />
            <AppButton title="Go back" onPress={() => navigation.goBack()} />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
