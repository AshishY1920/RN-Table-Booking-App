import {View, Text, Image} from 'react-native';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const NoDataFound = React.memo(({title, bottom, top}) => {
  let showImg = bottom
    ? require('../../assets/Icons/No-appointment.png')
    : require('../../assets/Icons/No-search.png');

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: top ? RFValue(25) : 0,
      }}>
      <Image
        style={{
          width: '100%',
          height: RFValue(180),
          resizeMode: 'contain',
        }}
        source={showImg}
      />
      <Text
        style={{
          fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
          fontSize: RFPercentage(2.5),
          color: '#86469C',
          marginTop: RFValue(8),
        }}>
        {title}
      </Text>
    </View>
  );
});

export default NoDataFound;
