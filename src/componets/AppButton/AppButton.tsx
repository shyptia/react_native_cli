import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {styles} from './AppButtonStyles';
import {CopilotProps} from 'react-native-copilot';

interface Props {
  onPress: () => void;
  title: string;
  copilot?: CopilotProps;
}

export const AppButton: React.FC<Props> = ({onPress, title, copilot}) => {
  return (
    <View {...copilot}>
      <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
