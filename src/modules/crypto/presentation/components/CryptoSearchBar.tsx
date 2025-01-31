import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CryptoSearchBar: React.FC<Props> = ({searchQuery, setSearchQuery}) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Buscar criptomoneda..."
      placeholderTextColor="#888"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default CryptoSearchBar;
