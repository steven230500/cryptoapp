import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {STRINGS} from '../../../../../../src/app/strings';

import CryptoSearchBar from '../../../../../../src/modules/crypto/presentation/components/CryptoSearchBar';

describe('CryptoSearchBar Component', () => {
  it('renders search input field correctly', () => {
    const {getByPlaceholderText} = render(
      <CryptoSearchBar searchQuery="" setSearchQuery={jest.fn()} />,
    );
    expect(getByPlaceholderText(STRINGS.searchPlaceholder)).toBeTruthy();
  });

  it('updates the search input value', () => {
    const mockSetSearchQuery = jest.fn();
    const {getByPlaceholderText} = render(
      <CryptoSearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />,
    );

    const input = getByPlaceholderText(STRINGS.searchPlaceholder);
    fireEvent.changeText(input, 'Bitcoin');
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Bitcoin');
  });
});
