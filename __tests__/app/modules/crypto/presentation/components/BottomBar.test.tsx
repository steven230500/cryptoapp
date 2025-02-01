import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {STRINGS} from '../../../../../../src/app/strings';
import BottomBar from '../../../../../../src/modules/crypto/presentation/components/BottomBar';

const mockCryptoList = [
  {id: '1', name: 'Bitcoin', symbol: 'BTC', price_usd: '40000'},
  {id: '2', name: 'Ethereum', symbol: 'ETH', price_usd: '2500'},
];

describe('BottomBar Component', () => {
  it('renders the convert button correctly', () => {
    const {getByText} = render(<BottomBar cryptoList={mockCryptoList} />);
    expect(getByText(`💱 ${STRINGS.convert}`)).toBeTruthy();
  });

  it('opens the ActionSheet when the button is pressed', () => {
    const {getByText, getByTestId} = render(
      <BottomBar cryptoList={mockCryptoList} />,
    );
    fireEvent.press(getByText(`💱 ${STRINGS.convert}`));
    expect(getByTestId('action-sheet')).toBeTruthy();
  });

  it('updates the amount input field', () => {
    const {getByPlaceholderText} = render(
      <BottomBar cryptoList={mockCryptoList} />,
    );
    const input = getByPlaceholderText(STRINGS.amount);
    fireEvent.changeText(input, '10');
    expect(input.props.value).toBe('10');
  });
});
