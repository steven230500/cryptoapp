import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../../app/config/reduxStore';
import {fetchCryptos} from '../redux/cryptoSlice';
import CryptoHeader from '../components/CryptoHeader';
import CryptoSearchBar from '../components/CryptoSearchBar';
import CryptoList from '../components/CryptoList';
import BottomBar from '../components/BottomBar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {StackNavigationProp} from '@react-navigation/stack';
import {STRINGS} from '../../../../app/strings';
import {setSelectedCrypto} from '../redux/cryptoSlice';

type RootStackParamList = {
  CryptoDetail: {id: string};
};

type CryptoDashboardProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CryptoDetail'>;
};

const CryptoDashboard: React.FC<CryptoDashboardProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading, error} = useSelector(
    (state: RootState) => state.crypto,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  const cryptoList = useMemo(() => data ?? [], [data]);

  const navigateToDetail = (crypto: any) => {
    if (crypto.id) {
      dispatch(setSelectedCrypto(crypto));
      navigation.navigate('CryptoDetail', {id: crypto.id});
    }
  };

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        <SkeletonPlaceholder>
          <View>
            <View style={styles.skeletonHeader} />
            <View style={styles.skeletonListItem} />
            <View style={styles.skeletonListItem} />
            <View style={styles.skeletonListItem} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {STRINGS.error}
          {error}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CryptoHeader />
      <CryptoSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CryptoList
        cryptoList={cryptoList}
        searchQuery={searchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        navigateToDetail={navigateToDetail}
      />
      <BottomBar cryptoList={cryptoList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', padding: 16},
  skeletonContainer: {flex: 1, justifyContent: 'center', padding: 16},
  skeletonHeader: {width: '90%', height: 50, marginBottom: 20, borderRadius: 8},
  skeletonListItem: {
    width: '100%',
    height: 60,
    marginBottom: 10,
    borderRadius: 8,
  },
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', fontSize: 16},
});

export default CryptoDashboard;
