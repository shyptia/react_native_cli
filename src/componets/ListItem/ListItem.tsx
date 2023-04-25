import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './ListItemStyles';

interface Props {
  title: string;
}

export const Item: React.FC<Props> = ({title}) => (
  <View>
    <Text style={styles.text}>{title} </Text>
  </View>
);
