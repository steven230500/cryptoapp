import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../app/navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('CryptoDashboard');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../../../assets/animations/crypto.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
