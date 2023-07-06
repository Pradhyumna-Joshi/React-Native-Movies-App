import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovies} from '../API/Service';
import {FlatList} from 'react-native-gesture-handler';
import Person from './Person';

export default function TrendingPeople(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = async () => {
    const response: any = await getMovies(props.url);
    console.log(props.screen);
    setPeople(props.screen === 'Detail' ? response.cast : response.results);

    // console.log(response.results[0]);
    setIsLoading(false);
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={30} color={'#FFFFFF'} />
      ) : (
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <FlatList
            horizontal
            data={people}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => <Person item={item} index={index} />}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    paddingLeft: 12,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
