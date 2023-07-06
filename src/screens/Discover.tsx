import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovies} from '../API/Service';
import {IMAGE_URL} from '../API/Constants';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
export default function Discover() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    const response: any = await getMovies('/discover/movie');
    // console.log(response.results[0]);
    setMovies(response.results);

    const images_ = response.results.map(
      item => `${IMAGE_URL}${item.backdrop_path}`,
    );

    let temp: any = [];
    for (let i = 0; i < 10; i++) {
      temp = [...temp, images_[i]];
    }

    setImages(temp);
  };
  return (
    <View>
      <SliderBox
        images={images}
        sliderBoxHeight={250}
        autoplay
        circleLoop
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        onCurrentImagePressed={index =>
          navigation.navigate('MovieDetail', {
            index: movies[index].id,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
