import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {RouteProp} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';

import BackIcon from '../../../../../assets/icons/arrow_left.svg';
import {RootState} from '../../../../app/config/reduxStore';
import {getChartLabels} from '../../../../app/utils';
import {TIME_RANGES} from '../../../../app/constants';
import {STRINGS} from '../../../../app/strings';

type RootStackParamList = {
  CryptoDetail: {id: string};
};

type CryptoDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CryptoDetail'
>;

const CryptoDetailScreen = ({
  navigation,
}: {
  route: CryptoDetailScreenRouteProp;
  navigation: any;
}) => {
  const {selectedCrypto: crypto, loading} = useSelector(
    (state: RootState) => state.crypto,
  );

  const [selectedTime, setSelectedTime] = useState('24H');

  if (loading) {
    return (
      <View style={styles.container}>
        <SkeletonPlaceholder backgroundColor="#2E2E2E" highlightColor="#444">
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonHeader} />
            <View style={styles.skeletonChart} />
            <View style={styles.skeletonDetails} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  if (!crypto) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{STRINGS.noData}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <BackIcon width={24} height={24} fill="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={{uri: `https://www.coinlore.com/img/${crypto.nameid}.png`}}
          style={styles.cryptoImage}
        />
        <Text style={styles.cryptoName}>
          {crypto.name} ({crypto.symbol})
        </Text>
      </View>

      <View style={styles.timeSelector}>
        {TIME_RANGES.map(range => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeButton,
              selectedTime === range && styles.activeTimeButton,
            ]}
            onPress={() => setSelectedTime(range)}>
            <Text style={styles.timeText}>{range}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: getChartLabels(selectedTime),
            datasets: [
              {
                data: Array.from(
                  {length: getChartLabels(selectedTime).length},
                  () => Math.random() * 10000,
                ),
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.9}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#1E1E1E',
            backgroundGradientTo: '#1E1E1E',
            color: () => '#00FF00',
            labelColor: () => '#fff',
          }}
          bezier
          style={styles.chartStyle}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          {STRINGS.price}: ${crypto.price_usd}
        </Text>
        <Text
          style={[
            styles.detailText,
            Number(crypto.percent_change_24h) >= 0
              ? styles.positive
              : styles.negative,
          ]}>
          {STRINGS.percentChange}: {crypto.percent_change_24h}%
        </Text>
        <Text style={styles.detailText}>
          {STRINGS.marketCap}: ${crypto.market_cap_usd}
        </Text>
        <Text style={styles.detailText}>
          {STRINGS.volume24h}: ${crypto.volume24}
        </Text>
        <Text style={styles.detailText}>
          {STRINGS.supply}: {crypto.csupply} {crypto.symbol}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', padding: 16},
  backButton: {position: 'absolute', top: 20, left: 20, zIndex: 10},
  header: {alignItems: 'center', marginTop: 40, marginBottom: 20},
  cryptoImage: {width: 100, height: 100, marginBottom: 10},
  cryptoName: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timeButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  activeTimeButton: {backgroundColor: '#00FF00'},
  timeText: {color: 'white', fontSize: 14},
  chartContainer: {alignItems: 'center', marginBottom: 20},
  chartStyle: {borderRadius: 10},
  detailsContainer: {backgroundColor: '#1E1E1E', padding: 16, borderRadius: 10},
  detailText: {color: 'white', fontSize: 16, marginBottom: 5},
  positive: {color: '#00FF00'},
  negative: {color: '#FF4C4C'},
  errorText: {color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20},
  skeletonContainer: {alignItems: 'center', width: '90%'},
  skeletonHeader: {width: 200, height: 20, marginBottom: 20, borderRadius: 5},
  skeletonChart: {
    width: '90%',
    height: 220,
    marginBottom: 20,
    borderRadius: 10,
  },
  skeletonDetails: {width: '90%', height: 100, borderRadius: 10},
});

export default CryptoDetailScreen;
