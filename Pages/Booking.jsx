import {View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AllBookings from '../Components/Bookings/AllBookings';
import TodayBooking from '../Components/Bookings/TodayBooking';
import CancelledBooking from '../Components/Bookings/CancelledBooking';

const Booking = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: RFPercentage(2),
            color: '#1c1c1c',
            fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
            textTransform: 'capitalize',
          },
          tabBarItemStyle: {
            width: RFValue(112),
          },
          tabBarStyle: {
            // borderRadius: RFValue(50),
            shadowColor: '#F7F7F7',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 1,
            marginBottom: RFValue(15),
            paddingHorizontal: RFValue(10),
            borderBottomColor: '#EEEEEE',
            borderBottomWidth: 1,
            width: '100%',
            alignSelf: 'center',
            // borderRadius: RFValue(30),
            overflow: 'hidden',
            marginTop: RFValue(20),
            // backgroundColor: '#FEFDED',
          },
          tabBarIndicatorStyle: {backgroundColor: '#86469C'},
        }}>
        <Tab.Screen name="All" component={AllBookings} />
        <Tab.Screen name="Today" component={TodayBooking} />
        <Tab.Screen name="Cancelled" component={CancelledBooking} />
      </Tab.Navigator>
    </View>
  );
};

export default Booking;
