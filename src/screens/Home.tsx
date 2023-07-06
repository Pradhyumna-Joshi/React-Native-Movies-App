import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Discover from './Discover';
import TrendingPeople from './TrendingPeople';
import TrendingMovies from './TrendingMovies';
import {ScrollView} from 'react-native-gesture-handler';

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={'#151C26'} />
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Icon name="menu" size={28} color={'#FFFFFF'} />
            <Text style={styles.headerText}>Movies</Text>
            <Icon name="search" size={26} color={'#FFFFFF'} />
          </View>
          <Discover />
          <TrendingPeople
            title="Trending People"
            url="/trending/person/week"
            screen="home"
          />
          <TrendingMovies title="Trending Movies" url="/movie/top_rated" />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151C26',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#151C26',
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#f1c40f',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
