import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGE_URL} from '../API/Constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function Movie({item, index}) {
  const navigation = useNavigation();
  const movieId = item.id;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('MovieDetail', {
          index: movieId,
        });
      }}
      style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.poster_path
            ? `${IMAGE_URL}${item.poster_path}`
            : 'https://cdn.dribbble.com/users/1270214/screenshots/7015797/attachments/1479717/error404-page-not-found-flat-illustration-toms-stals.jpg?compress=1&resize=800x600&vertical=center',
        }}
      />
      <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.header}>
        {item.original_title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    margin: 10,
    alignItems: 'center',
  },
  header: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
});
