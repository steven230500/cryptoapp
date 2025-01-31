import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../../app/config/reduxStore';
import {fetchCryptos} from '../redux/cryptoSlice';
import CryptoHeader from '../components/CryptoHeader';
import CryptoChart from '../components/CryptoChart';
import CryptoSearchBar from '../components/CryptoSearchBar';
import CryptoList from '../components/CryptoList';

const CryptoDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading, error} = useSelector(
    (state: RootState) => state.crypto,
  ) as unknown as {
    data: {data: any[]};
    loading: boolean;
    error: string | null;
  };

  const [selectedCrypto, setSelectedCrypto] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  const cryptoList = useMemo(() => data?.data ?? [], [data]);

  useEffect(() => {
    if (cryptoList.length > 0 && !selectedCrypto) {
      setSelectedCrypto(cryptoList[0]);
    }
  }, [cryptoList, selectedCrypto]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CryptoHeader />
      <CryptoSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {selectedCrypto && <CryptoChart selectedCrypto={selectedCrypto} />}
      <CryptoList
        cryptoList={cryptoList}
        searchQuery={searchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setSelectedCrypto={setSelectedCrypto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', padding: 16},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {color: 'white', fontSize: 16},
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', fontSize: 16},
});

export default CryptoDashboard;
