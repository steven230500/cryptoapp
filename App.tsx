import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/config/reduxStore';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/app/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
