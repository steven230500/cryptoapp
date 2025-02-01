import React, {useMemo} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import ArrowRightIcon from '../../../../../assets/icons/arrow_right.svg';
import {STRINGS} from '../../../../app//strings';

interface Props {
  cryptoList: any[];
  searchQuery: string;
  sortOption: string;
  setSortOption: (option: string) => void;
  navigateToDetail: (crypto: any) => void;
}

const CryptoList: React.FC<Props> = ({
  cryptoList,
  searchQuery,
  sortOption,
  setSortOption,
  navigateToDetail,
}) => {
  const filteredCryptoList = useMemo(() => {
    return cryptoList
      .filter(
        crypto =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortOption === 'price_asc') {
          return a.price_usd - b.price_usd;
        }
        if (sortOption === 'price_desc') {
          return b.price_usd - a.price_usd;
        }
        if (sortOption === 'name_asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortOption === 'name_desc') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [cryptoList, searchQuery, sortOption]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={sortOption}
        style={styles.picker}
        dropdownIconColor="white"
        onValueChange={setSortOption}>
        <Picker.Item label={STRINGS.sortByPriceAsc} value="price_asc" />
        <Picker.Item label={STRINGS.sortByPriceDesc} value="price_desc" />
        <Picker.Item label={STRINGS.sortByNameAsc} value="name_asc" />
        <Picker.Item label={STRINGS.sortByNameDesc} value="name_desc" />
      </Picker>

      <FlatList
        data={filteredCryptoList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}>
            <TouchableOpacity
              onPress={() => navigateToDetail(item)}
              style={styles.card}>
              <Image
                source={{
                  uri: `https://www.coinlore.com/img/${item.nameid}.png`,
                }}
                style={styles.icon}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.cryptoName}>{item.name}</Text>
                <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
                <Text style={styles.cryptoPrice}>${item.price_usd}</Text>
              </View>

              <ArrowRightIcon width={24} height={24} fill="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 10},
  picker: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    marginBottom: 10,
    borderRadius: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  cryptoName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cryptoSymbol: {
    color: '#AAA',
    fontSize: 14,
  },
  cryptoPrice: {
    color: '#00FF00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CryptoList;
