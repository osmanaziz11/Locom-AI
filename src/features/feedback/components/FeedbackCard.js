import { StarIcon } from 'src/assets/icons';
import ProfileImage from 'src/components/common/ProfileImage';
import { AppText, Button } from 'src/components/ui';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';



const FeedbackCard = ({owner, likes, onPress}) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <View style={styles.container}>
      <ProfileImage uri={owner.picture} size={48} style={{marginRight: 12}} />
      <View>
        <AppText size={16}>
          {owner.firstName} {owner.lastName}
        </AppText>
        <View style={styles.row}>
          <StarIcon style={{marginRight: 8}} />
          <AppText color="#8083A3" style={{marginRight: 8}}>
            4.8
          </AppText>
          <AppText color="#8083A3" weight={500}>
            ({likes})
          </AppText>
        </View>
      </View>
      <Button
        style={{width: 108, marginLeft: 'auto', height: 42}}
        onPress={handlePress}>
        See feedbacks
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 89,
    borderWidth: 1,
    borderColor: 'rgba(228, 230, 232, 0.6)',
    borderRadius: 14,
    marginBottom: 8,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FeedbackCard;
