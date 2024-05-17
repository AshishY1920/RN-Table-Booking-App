import {View} from 'react-native';
import React from 'react';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import SkeletonStyles from './CSS/SkeletonStyles';

const SkeletonStyle = ({circle, width, height, mt, align}) => {
  return (
    <View style={{alignItems: !align ? 'center' : 'flex-start'}}>
      <Skeleton
        // borderRadius={brl ? 5 : 0}
        LinearGradientComponent={LinearGradient}
        animation="wave"
        width={width}
        height={height}
        circle={circle}
        style={[
          SkeletonStyles.SkeletonContainer,
          {marginTop: mt && RFValue(3)},
        ]}
      />
    </View>
  );
};

export default SkeletonStyle;
