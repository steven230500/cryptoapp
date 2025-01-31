import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

interface Props {
  selectedCrypto: any;
}

const CryptoChart: React.FC<Props> = ({selectedCrypto}) => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.cryptoTitle}>{selectedCrypto.name}</Text>
      <LineChart
        data={{
          labels: ['1D', '1W', '1M', '3M', '6M'],
          datasets: [{data: [100, 120, 90, 110, 130]}],
        }}
        width={width * 0.9}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#1E1E1E',
          backgroundGradientTo: '#1E1E1E',
          color: () => '#00FF00',
          labelColor: () => '#fff',
        }}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {alignItems: 'center', marginBottom: 20},
  cryptoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CryptoChart;
