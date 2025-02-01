import React from 'react';
import {render} from '@testing-library/react-native';
import CryptoHeader from '../../../../../../src/modules/crypto/presentation/components/CryptoHeader';

test('renders user avatar and balance correctly', () => {
  const {getByTestId, getByText} = render(<CryptoHeader />);

  expect(getByText('User')).toBeTruthy();
  expect(getByText('$88,648.43')).toBeTruthy();
  expect(getByTestId('user-avatar')).toBeTruthy();
});
