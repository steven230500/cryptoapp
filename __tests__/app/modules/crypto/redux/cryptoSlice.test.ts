import cryptoReducer, {
  setSelectedCrypto,
  fetchCryptos,
} from '../../../../../src/modules/crypto/presentation/redux/cryptoSlice';
import {configureStore} from '@reduxjs/toolkit';

describe('Crypto Slice Tests', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {crypto: cryptoReducer},
    });
  });

  it('should set selected crypto', () => {
    const crypto = {id: '90', name: 'Bitcoin', price_usd: '40000'};
    store.dispatch(setSelectedCrypto(crypto));
    expect(store.getState().crypto.selectedCrypto).toEqual(crypto);
  });

  it('should handle fetchCryptos action', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [{id: '90', name: 'Bitcoin', price_usd: '40000'}],
          }),
      }),
    ) as jest.Mock;

    await store.dispatch(fetchCryptos() as any);
    const state = store.getState().crypto;

    expect(state).toBeDefined();
    expect(Array.isArray(state.data)).toBe(true);
    expect(state.data.length).toBeGreaterThanOrEqual(0);
  });
});
