import {fetchCryptosFromAPI} from './cryptoApi';

export class CryptoRepository {
  async getAllCryptos() {
    return await fetchCryptosFromAPI();
  }
}
