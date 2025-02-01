import React, {useMemo, useRef} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import ArrowRightIcon from '../../../../../assets/icons/arrow_right.svg';
import {STRINGS} from '../../../../app/strings';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

interface Props {
  cryptoList: any[];
  searchQuery: string;
  sortOption: string;
  setSortOption: (option: string) => void;
  navigateToDetail: (crypto: any) => void;
}

const SORT_OPTIONS = [
  {label: STRINGS.sortByPriceAsc, value: 'price_asc'},
  {label: STRINGS.sortByPriceDesc, value: 'price_desc'},
  {label: STRINGS.sortByNameAsc, value: 'name_asc'},
  {label: STRINGS.sortByNameDesc, value: 'name_desc'},
];

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

  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <View style={styles.container}>
      {/* Selector de ordenamiento */}
      <TouchableOpacity
        style={styles.selectContainer}
        onPress={() => actionSheetRef.current?.show()}>
        <Text style={styles.selectText}>
          {SORT_OPTIONS.find(option => option.value === sortOption)?.label ||
            STRINGS.sortByPriceAsc}
        </Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef} containerStyle={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>{STRINGS.sortBy}</Text>
        {SORT_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.optionButton}
            onPress={() => {
              setSortOption(option.value);
              actionSheetRef.current?.hide();
            }}>
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </ActionSheet>

      {/* Lista de criptomonedas */}
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
  selectContainer: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sheetContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sheetTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
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
