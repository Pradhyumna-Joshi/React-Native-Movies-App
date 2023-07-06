import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGE_URL} from '../API/Constants';

export default function Person({item, index}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.profile_path
            ? `${IMAGE_URL}${item.profile_path}`
            : 'https://cdn.dribbble.com/users/1270214/screenshots/7015797/attachments/1479717/error404-page-not-found-flat-illustration-toms-stals.jpg?compress=1&resize=800x600&vertical=center',
        }}
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: 120,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: 80,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    position: 'absolute',
    top: 5,
  },
});
