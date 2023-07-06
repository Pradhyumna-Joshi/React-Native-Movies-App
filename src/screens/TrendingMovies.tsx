import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovies} from '../API/Service';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Movie from './Movie';

export default function TrendingMovies(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const response: any = await getMovies(props.url);
    // console.log(response.results[0]);
    setMovies(response.results);
    setIsLoading(false);
  };
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={30} color={'#FFFFFF'} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>{props.title}</Text>
          <FlatList
            horizontal
            data={movies}
            renderItem={({item, index}) => <Movie item={item} index={index} />}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    marginTop: 16,
    paddingLeft: 12,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
