import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import CheckoutStyle from '../../Pages/CheckoutStyle/CheckoutStyle';
import TableStyle from '../Table/TableStyle/TableStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import SkeletonStyle from '../Skeleton/Skeleton';
import {Button} from 'react-native-paper';

const BookingCheckout = ({
  selectedSeats,
  image,
  ParsedDate,
  sum,
  handleBook,
  isLoading,
  hide,
  handleCancel,
  id,
  status,
  cancelledSeats,
  loading,
}) => {
  const handleBooking = () => {
    handleBook();
  };

  const cancelBooking = i => {
    handleCancel(i);
  };

  // console.log('SEATS: ', selectedSeats);

  if (loading) {
    return (
      <View style={CheckoutStyle.checkoutContainer}>
        <View style={{flex: 1.2}}>
          <SkeletonStyle width={RFValue(80)} height={RFValue(80)} />
        </View>
        <View style={{flex: 3}}>
          <SkeletonStyle
            width={RFValue(60)}
            height={RFValue(10)}
            align={true}
          />
          <SkeletonStyle
            width={RFValue(50)}
            height={RFValue(15)}
            align={true}
            mt={2}
          />
          <SkeletonStyle
            width={RFValue(60)}
            height={RFValue(10)}
            align={true}
            mt={2}
          />
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={CheckoutStyle.checkoutContainer}>
        <View style={{flex: 1.2}}>
          <Image style={CheckoutStyle.imageCheckout} source={{uri: image}} />
        </View>
        <View style={{flex: 3}}>
          <View style={CheckoutStyle.chekoutCancelCTA}>
            <Text style={CheckoutStyle.parseDate}>{ParsedDate}</Text>
            {hide && status !== 'Cancelled' && (
              <Button onPress={() => cancelBooking(id)} activeOpacity={0.8}>
                <MaterialCommunityIcons
                  name="delete"
                  size={RFValue(20)}
                  color="#D20062"
                />
              </Button>
            )}
          </View>
          <View style={CheckoutStyle.selectedSeats}>
            {selectedSeats && selectedSeats?.length > 0
              ? selectedSeats?.map(i => (
                  <TouchableOpacity style={CheckoutStyle.seats} key={i}>
                    <Text style={CheckoutStyle.seatsText}>{i}</Text>
                  </TouchableOpacity>
                ))
              : cancelledSeats && cancelledSeats?.length > 0
              ? cancelledSeats?.map(i => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[CheckoutStyle.seats, {backgroundColor: '#E72929'}]}
                    key={i}>
                    <Text style={[CheckoutStyle.seatsText, {color: 'white'}]}>
                      {i}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>
          <View
            style={[
              CheckoutStyle.chekoutCancelCTA,
              {borderBottomColor: 'transparent'},
            ]}>
            <Text style={CheckoutStyle.totalPrice}>Total: ₹{sum}</Text>
            {hide && (
              <Text
                style={
                  status === 'Booked' ? CheckoutStyle.green : CheckoutStyle.red
                }>
                {status}
              </Text>
            )}
          </View>
        </View>
      </View>
      {!hide && (
        <TouchableOpacity
          onPress={handleBooking}
          activeOpacity={0.8}
          style={TableStyle.checkout}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              <Text style={TableStyle.checkoutText}>
                {' '}
                <Entypo name="bookmark" size={RFValue(20)} /> Book Now
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BookingCheckout;
