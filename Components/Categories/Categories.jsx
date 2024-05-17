import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CategoriesStyle from './CSS/CategoriesStyle';
import Skeleton from '../Skeleton/Skeleton';
import SkeletonStyle from '../Skeleton/Skeleton';
import {RFValue} from 'react-native-responsive-fontsize';

const Categories = ({name, img, loading}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={CategoriesStyle.category}>
      {loading ? (
        <>
          <SkeletonStyle
            width={RFValue(63)}
            height={RFValue(63)}
            circle={true}
          />
          <SkeletonStyle
            width={RFValue(35)}
            height={RFValue(10)}
            circle={false}
            mt={true}
          />
        </>
      ) : (
        <>
          <Image style={CategoriesStyle.categoryImg} source={{uri: img}} />
          <Text style={CategoriesStyle.categoryTag}>{name}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Categories;
