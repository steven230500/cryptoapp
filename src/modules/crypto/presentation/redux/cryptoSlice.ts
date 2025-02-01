import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {GetCryptoList} from '../../domain/getCryptoList';
import {CryptoRepository} from '../../data/cryptoRepository';

const cryptoRepository = new CryptoRepository();
const getCryptoList = new GetCryptoList(cryptoRepository);

export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async () => {
    try {
      const response = await getCryptoList.execute();

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid API response');
      }

      return response.data || [];
    } catch (error) {
      throw error;
    }
  },
);

interface CryptoState {
  data: any[];
  loading: boolean;
  error: string | null;
  selectedCrypto: any | null;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
  selectedCrypto: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<any>) => {
      state.selectedCrypto = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCryptos.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const {setSelectedCrypto} = cryptoSlice.actions;
export default cryptoSlice.reducer;
