import {Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderStyle from '../Components/Header/HeaderStyle/HeaderStyle';
import {useNavigation, useRoute} from '@react-navigation/native';
import BookingCheckout from '../Components/BookingCheckout/BookingCheckout';
import axios from 'axios';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Sound from 'react-native-sound';

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {image, CurrentDate, selectedSeats, price, id} = route.params;

  // console.log('Image: ', image);
  // console.log('Current Date: ', CurrentDate);

  // console.log('Selected Seats: ', selectedSeats);

  // console.log('Price: ', price);

  const sum = price && price.reduce((acc, current) => acc + current, 0);

  // console.log('TOTAL SUM: ', sum);

  // console.log('RESTAURANT ID: ', id);

  const [isLoading, setIsLoading] = useState(false);

  // Play Audio When Booking Success
  const playSound = () => {
    var whoosh = new Sound('notification.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    whoosh.setVolume(1);
  };

  const handleBooking = async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://restaurant-app-server-three.vercel.app/api/v1/create-booking/${id}`,
        {
          RestaurantName: 'Dummy!',
          image: image,
          price: sum,
          Bookingdate: CurrentDate,
          Bookingtime: '12:00',
          Seat: selectedSeats,
        },
      );

      if (response?.data?.status === 1) {
        // setSuccess(response?.data?.message);
        playSound();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          textBody: response?.data?.message,
        });
        setTimeout(() => {
          navigation.navigate('Restaurants');
        }, 1000);
      } else if (response?.data?.status === 0) {
        // setError(response?.data?.message);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: response?.data?.message,
        });
      }
      // console.log(response?.data);
    } catch (error) {
      // console.error('Error fetching data:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: error.response?.data?.message,
      });
    }
    setIsLoading(false);
  };

  // console.log('Checkout: ', image);

  return (
    <View
      style={[
        HeaderStyle.Container,
        {
          flex: 1,
          backgroundColor: 'white',
          //   alignItems: 'center',
        },
      ]}>
      <BookingCheckout
        image={image}
        ParsedDate={CurrentDate}
        selectedSeats={selectedSeats}
        sum={sum}
        handleBook={handleBooking}
        isLoading={isLoading}
      />
    </View>
  );
};

export default Checkout;
