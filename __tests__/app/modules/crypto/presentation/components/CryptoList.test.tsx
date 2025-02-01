import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CryptoList from '../../../../../../src/modules/crypto/presentation/components/CryptoList';

describe('CryptoList Component', () => {
  const cryptoList = [
    {id: '90', name: 'Bitcoin', symbol: 'BTC', price_usd: '40000'},
    {id: '80', name: 'Ethereum', symbol: 'ETH', price_usd: '2500'},
  ];

  it('renders correctly', () => {
    const {getByText} = render(
      <CryptoList
        cryptoList={cryptoList}
        searchQuery=""
        sortOption="price_asc"
        setSortOption={() => {}}
        navigateToDetail={() => {}}
      />,
    );

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();
  });

  it('calls navigateToDetail when clicking an item', () => {
    const mockNavigate = jest.fn();
    const {getByText} = render(
      <CryptoList
        cryptoList={cryptoList}
        searchQuery=""
        sortOption="price_asc"
        setSortOption={() => {}}
        navigateToDetail={mockNavigate}
      />,
    );

    fireEvent.press(getByText('Bitcoin'));
    expect(mockNavigate).toHaveBeenCalledWith(cryptoList[0]);
  });
});
