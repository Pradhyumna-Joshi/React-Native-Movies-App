import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {IMAGE_URL} from '../API/Constants';
import {getMovies} from '../API/Service';
import {Link} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrendingMovies from './TrendingMovies';
import TrendingPeople from './TrendingPeople';

export default function MovieDetail({route}) {
  const index = route.params.index;
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    const response: any = await getMovies(`/movie/${index}`);
    console.log(index);
    console.log(response);
    setDetail(response);
    setIsLoading(false);
  };

  const getGenre = () => {
    return detail.genres.map(item => (
      <View style={styles.genre}>
        <Text style={styles.genreText}>{item.name}</Text>
      </View>
    ));
  };
  return (
    <>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size={100} color={'#000'} />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: detail.backdrop_path
                    ? `${IMAGE_URL}${detail.backdrop_path}`
                    : 'https://cdn.dribbble.com/users/1270214/screenshots/7015797/attachments/1479717/error404-page-not-found-flat-illustration-toms-stals.jpg?compress=1&resize=800x600&vertical=center',
                }}
              />
              {detail.homepage ? (
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => Linking.openURL(detail.homepage)}>
                  <Icon name="link" size={24} color={'#FFFFFF'} />
                </TouchableOpacity>
              ) : null}

              <Text style={styles.title}>{detail.original_title}</Text>
              <Text ellipsizeMode="tail" style={styles.desc}>
                {detail.overview}
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                {getGenre()}
              </View>
            </ScrollView>

            <View style={styles.section}>
              <View style={styles.item}>
                <Text style={styles.header}>BUDGET</Text>
                <Text style={styles.subHeader}>
                  {detail.budget == 0 ? '-' : detail.budget}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.header}>RUNTIME</Text>
                <Text style={styles.subHeader}>{detail.runtime} min</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.header}>RELEASE DATE</Text>
                <Text style={styles.subHeader}>{detail.release_date}</Text>
              </View>
            </View>
            <TrendingPeople
              title="Cast"
              url={`/movie/${index}/credits`}
              screen="Detail"
            />

            <TrendingMovies
              title="You may also like"
              url={`/movie/${index}/similar`}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151C26',
  },
  image: {
    height: 250,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    // marginTop: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    marginTop: 14,
  },
  link: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDC126',
    marginTop: -30,
    alignSelf: 'flex-end',
    marginRight: 20,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  subTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 10,
  },
  section: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  item: {
    margin: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  subHeader: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#EDC126',
  },
  genre: {
    borderColor: '#EDC126',
    borderWidth: 2,
    borderRadius: 50,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
    shadowColor: '#FFFFFF',
  },
  genreText: {
    color: '#FFFFFF',
  },
});
