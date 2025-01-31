import {CryptoRepository} from '../data/cryptoRepository';

export class GetCryptoList {
  private cryptoRepository: CryptoRepository;

  constructor(cryptoRepository: CryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute() {
    return await this.cryptoRepository.getAllCryptos();
  }
}
