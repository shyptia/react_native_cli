/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {AppButton} from '../AppButton/AppButton';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './ScreenWithAnimationStyles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ScreenWithAnimation'
  >;
};

export const ScreenWithAnimation = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const degree = useSharedValue(0);
  const color = useSharedValue(0);
  const pressed = useSharedValue(false);
  const startingPosition = 200;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const rotation = useDerivedValue(() => {
    return interpolate(degree.value, [0, 360], [0, 360]);
  });

  const changeColor = useDerivedValue(() => {
    return interpolateColor(color.value, [0, 1], ['red', 'purple']);
  });

  const animatedRotateStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotate: rotation.value + 'deg'}],
    };
  });

  const animatedColorStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: changeColor.value,
    };
  });

  const startRotateAnimation = () => {
    degree.value = withTiming(360, {duration: 4000}, () => {
      degree.value = 0;
    });
  };

  const startColorAnimation = () => {
    color.value = withTiming(1, {duration: 4000});
    setTimeout(() => {
      color.value = 0;
    }, 4000);
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {
      pressed.value = true;
    },
    onActive: event => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: () => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

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
            <PanGestureHandler onGestureEvent={eventHandler}>
              <Animated.View style={[styles.circle, uas]} />
            </PanGestureHandler>

            <TouchableOpacity onPress={startRotateAnimation}>
              <Animated.View style={[styles.box, animatedRotateStyles]} />
            </TouchableOpacity>

            <TouchableOpacity onPress={startColorAnimation}>
              <Animated.View style={[styles.circle, animatedColorStyles]} />
            </TouchableOpacity>

            <AppButton title="Go back" onPress={() => navigation.goBack()} />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
