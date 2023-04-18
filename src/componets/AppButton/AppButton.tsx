import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './AppButtonStyles';

interface Props {
  onPress: () => void;
  title: string;
}

export const AppButton: React.FC<Props> = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};
