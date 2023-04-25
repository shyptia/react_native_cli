/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SectionList,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import {styles} from './TodoListStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {AppButton} from '../AppButton/AppButton';
import {observer} from 'mobx-react-lite';
import {todosData} from '../../todosData';
import {Todo} from '../../../type/Todo';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodosList'>;
};

export const TodosList: React.FC<Props> = observer(({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = ({item}: {item: Todo}) => (
    <Text style={styles.text}>{item.title}</Text>
  );

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.viewContent}>
        <LinearGradient
          colors={['#f2cc7b', '#cc420a']}
          style={styles.linearGradient}>
          <SectionList
            sections={todosData}
            renderItem={renderItem}
            renderSectionHeader={({section}) => (
              <Text style={styles.taskTitle}>{section.title}</Text>
            )}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled
          />

          <AppButton title="Go back" onPress={() => navigation.goBack()} />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
});
