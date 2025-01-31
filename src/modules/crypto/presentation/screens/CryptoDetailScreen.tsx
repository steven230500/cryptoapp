import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../app/navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CryptoDetail'>;

const CryptoDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {id} = route.params;

  return (
    <View>
      <Text>Detalles de la Criptomoneda</Text>
      <Text>ID: {id}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CryptoDetailScreen;
