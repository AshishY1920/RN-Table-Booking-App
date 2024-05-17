import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={{paddingVertical: 20}}>
      <ActivityIndicator size="large" color="#86469C" />
    </View>
  );
};

export default Loading;
