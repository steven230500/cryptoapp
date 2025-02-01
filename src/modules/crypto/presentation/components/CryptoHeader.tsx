import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CryptoHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image
        source={{uri: 'https://i.pravatar.cc/301'}}
        style={styles.avatar}
        testID="user-avatar"
      />

      <View>
        <Text style={styles.username}>User</Text>
        <Text style={styles.balance}>$88,648.43</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  avatar: {width: 50, height: 50, borderRadius: 25, marginRight: 10},
  username: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  balance: {color: '#00FF00', fontSize: 16},
});

export default CryptoHeader;
