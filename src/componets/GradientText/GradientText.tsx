import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {TextProps} from 'react-native';
import {styles} from './GradientTextStyles';

interface Coordinate {
  x: number;
  y: number;
}

interface Props extends TextProps {
  colors: string[];
  start?: Coordinate;
  end?: Coordinate;
}

export const GradientText: React.FC<Props> = props => {
  const {
    colors,
    style,
    start = {x: 0, y: 0},
    end = {x: 1, y: 1},
    ...restProps
  } = props;

  return (
    <MaskedView maskElement={<Text style={style} {...restProps} />}>
      <LinearGradient colors={colors} start={start} end={end}>
        <Text {...props} style={[style, styles.text]} />
      </LinearGradient>
    </MaskedView>
  );
};
