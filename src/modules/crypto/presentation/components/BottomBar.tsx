import React, {useState, useMemo, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Picker} from '@react-native-picker/picker';
import {STRINGS} from '../../../../app/strings';

interface Props {
  cryptoList: any[];
}

const BottomBar: React.FC<Props> = ({cryptoList}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [cryptoFrom, setCryptoFrom] = useState(cryptoList[0]?.id || '');
  const [cryptoTo, setCryptoTo] = useState(cryptoList[1]?.id || '');
  const [amount, setAmount] = useState('1');

  const fromCrypto = cryptoList.find(c => c.id === cryptoFrom);
  const toCrypto = cryptoList.find(c => c.id === cryptoTo);

  const convertedAmount = useMemo(() => {
    if (!fromCrypto || !toCrypto || isNaN(parseFloat(amount))) {
      return '0.00';
    }
    const value =
      (parseFloat(amount) * parseFloat(fromCrypto.price_usd)) /
      parseFloat(toCrypto.price_usd);
    return value.toFixed(6);
  }, [fromCrypto, toCrypto, amount]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.exchangeButton}
          onPress={() => actionSheetRef.current?.show()}>
          <Text style={styles.buttonText}>💱 {STRINGS.convert}</Text>
        </TouchableOpacity>
      </View>

      <ActionSheet
        testID="action-sheet"
        ref={actionSheetRef} // 🛠️ Cambio aquí
        containerStyle={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>{STRINGS.convert}</Text>

        <Text style={styles.label}>{STRINGS.amount}:</Text>
        <TextInput
          testID="amount-input"
          style={styles.input}
          keyboardType="numeric"
          placeholder={STRINGS.amount}
          placeholderTextColor="#888"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>{STRINGS.from}</Text>
        <Picker
          selectedValue={cryptoFrom}
          onValueChange={setCryptoFrom}
          style={styles.picker}>
          {cryptoList.map(crypto => (
            <Picker.Item
              key={crypto.id}
              label={crypto.name}
              value={crypto.id}
            />
          ))}
        </Picker>

        <Text style={styles.label}>{STRINGS.to}</Text>
        <Picker
          selectedValue={cryptoTo}
          onValueChange={setCryptoTo}
          style={styles.picker}>
          {cryptoList.map(crypto => (
            <Picker.Item
              key={crypto.id}
              label={crypto.name}
              value={crypto.id}
            />
          ))}
        </Picker>

        <Text style={styles.conversionResult}>
          {amount} {fromCrypto?.symbol} ≈ {convertedAmount} {toCrypto?.symbol}
        </Text>

        <TouchableOpacity
          style={styles.convertButton}
          onPress={() => actionSheetRef.current?.hide()}>
          <Text style={styles.buttonText}>{STRINGS.convert}</Text>
        </TouchableOpacity>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  exchangeButton: {
    backgroundColor: '#00FF00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
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
  label: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
  },
  picker: {
    backgroundColor: '#333',
    color: 'white',
    marginBottom: 10,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  conversionResult: {
    color: '#00FF00',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  convertButton: {
    backgroundColor: '#00FF00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default BottomBar;
