import {configureStore} from '@reduxjs/toolkit';
import cryptoReducer from '../../modules/crypto/presentation/redux/cryptoSlice';

console.log('Redux Store cargando...');

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

console.log('Redux Store inicializado:', store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
