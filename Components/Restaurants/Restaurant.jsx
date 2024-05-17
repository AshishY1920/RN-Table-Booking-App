import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import SkeletonStyle from '../Skeleton/Skeleton';
import RestaurantStyle from './RestaurantStyle/RestaurantStyle';

const Restaurant = React.memo(({image, address, name, desc, id, loading}) => {
  const navigation = useNavigation();

  // If not loading, show restaurant details
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChooseTable', {image: image, id: id})}
      activeOpacity={0.8}
      style={
        loading
          ? RestaurantStyle.RestaurantContainerLoading
          : RestaurantStyle.RestaurantContainer
      }>
      {loading ? (
        <>
          <SkeletonStyle width={'100%'} height={RFValue(200)} />
          <SkeletonStyle
            align={true}
            width={RFValue(150)}
            height={RFValue(10)}
            mt={3}
          />
          <SkeletonStyle
            align={true}
            width={RFValue(80)}
            height={RFValue(10)}
            mt={3}
          />
        </>
      ) : (
        <>
          <View>
            <Image style={RestaurantStyle.Image} source={{uri: image}} />
          </View>
          <View style={RestaurantStyle.RestaurantDetails}>
            <View style={{flex: 4}}>
              <Text
                style={[
                  RestaurantStyle.detailsText,
                  {
                    fontFamily:
                      'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
                    fontSize: RFPercentage(2.5),
                    color: '#86469C',
                  },
                ]}>
                {name}
              </Text>
              <Text style={RestaurantStyle.detailsText}>{desc}</Text>
              <Text
                style={[
                  RestaurantStyle.detailsText,
                  {
                    fontFamily:
                      'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
                    marginTop: RFValue(2),
                  },
                ]}>
                {address}
              </Text>
            </View>
            <View style={[RestaurantStyle.StarRating, {flex: 0.8}]}>
              <AntDesign name="star" size={RFValue(22)} color="#FF9800" />
              <Text style={RestaurantStyle.pointView}>4.2</Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
});

export default Restaurant;
