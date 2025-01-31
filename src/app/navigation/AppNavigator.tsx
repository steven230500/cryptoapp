import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CryptoDashboard from '../../modules/crypto/presentation/screens/CryptoDashboard';
import CryptoDetailScreen from '../../modules/crypto/presentation/screens/CryptoDetailScreen';
import SplashScreen from '../../modules/crypto/presentation/screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  CryptoDashboard: undefined;
  CryptoDetail: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="CryptoDashboard" component={CryptoDashboard} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
