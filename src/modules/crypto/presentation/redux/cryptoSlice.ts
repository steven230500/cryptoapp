import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {GetCryptoList} from '../../domain/getCryptoList';
import {CryptoRepository} from '../../data/cryptoRepository';

const cryptoRepository = new CryptoRepository();
const getCryptoList = new GetCryptoList(cryptoRepository);

export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async () => {
    return await getCryptoList.execute();
  },
);

interface CryptoState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCryptos.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error desconocido';
      });
  },
});

export default cryptoSlice.reducer;
