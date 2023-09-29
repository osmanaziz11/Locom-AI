import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {fetchReviews} from '../api';
import { ReviewCard } from '../components';
import { List } from 'src/components/ui';


const ReviewsScreen = () => {
  const insets = useSafeAreaInsets();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then(res => {
      setReviews(res.data);
    });
  }, []);

  const renderReview = ({item}) => {
    return <ReviewCard {...item} />;
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* <Header title="Google Reviews" /> */}
      <View style={styles.content}>
        <List data={reviews} renderItem={renderReview} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default ReviewsScreen;
