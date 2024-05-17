import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BookingStyle from './BookingStyle/BookingStyle';
import BookingCheckout from '../BookingCheckout/BookingCheckout';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import NoDataFound from '../NoDataFound/NoDataFound';
import {useDispatch, useSelector} from 'react-redux';
import {GetTodaysBookingActions} from '../../Actions/RestaurantActions';
import Loading from '../Loading/Loading';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const TodayBooking = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [Bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLength, setIsLength] = useState(null);

  // Today's Bookings State
  const {todayBooking, loading} = useSelector(state => state.TodayBook);

  const [totalPage, setTotalPage] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBookings = useCallback(
    async currentPage => {
      setIsActive(true);
      if (isLoading || (totalPage !== null && currentPage > totalPage)) return; // Prevent multiple simultaneous requests
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://restaurant-app-server-three.vercel.app/api/v1/get-today-booking?page=${currentPage}`,
        );
        const newData = response?.data?.data || [];
        // Check for duplicates before appending new data
        setBookings(prev => {
          const uniqueData = newData.filter(
            item => !prev.some(prevItem => prevItem._id === item._id),
          ); // Assuming each item has a unique identifier 'id'
          return [...prev, ...uniqueData];
        });
        setTotalPage(response?.data?.pagination?.totalPage);
        setPage(prevPage => prevPage + 1);
        setIsLength(response?.data?.data?.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setIsLoading(false);
    },
    [isLoading, totalPage],
  );

  // console.log('TOTAL PAGE: ', totalPage);

  const renderFooter = () => {
    return isLoading ? (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color="#86469C" />
      </View>
    ) : null;
  };

  const handleRefresh = useCallback(async () => {
    setPage(1);
    setTotalPage(null);
    setIsRefreshing(true);
    await dispatch(GetTodaysBookingActions(1));
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    // if (isFocused && !isActive) {
    //   dispatch(GetTodaysBookingActions(1));
    // } else if (!isFocused) {
    //   setPage(1);
    //   setTotalPage(null);
    //   setIsActive(false);
    // } else {
    //   fetchBookings(page);
    // }
    if (!isFocused) {
      setPage(1);
      setTotalPage(null);
      setIsActive(false);
    } else {
      fetchBookings(page);
    }
  }, [isFocused, page, fetchBookings]);

  useEffect(() => {
    if (todayBooking && todayBooking?.status === 1) {
      setBookings(todayBooking && todayBooking?.data);
    }
  }, [todayBooking]);

  const handleCancel = async id => {
    try {
      // console.log(id);
      const response = await axios.put(
        `https://restaurant-app-server-three.vercel.app/api/v1/cancel-booking/${id}`,
        {
          status: 'Cancelled',
        },
      );

      if (response?.data?.status === 1) {
        dispatch(GetTodaysBookingActions(1));
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          textBody: response?.data?.message,
        });
        setPage(1);
        setTotalPage(null);
        setIsActive(false);
      } else if (response?.data?.status === 0) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: response?.data?.message,
        });
      }
    } catch (error) {
      // console.error('Error fetching data:', error.response?.data?.message);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: error.response?.data?.message,
      });
    }
  };

  return (
    <View style={BookingStyle.BookingContainer}>
      {/* {loading ? (
        <Loading />
      ) : (
        <> */}
      {isLength === 0 && isLength !== null ? (
        <NoDataFound bottom={true} title="No Bookings Found For Today." />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#86469C', '#86469C']}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({item}) => {
            return (
              <BookingCheckout
                id={item._id}
                image={item.image.url}
                ParsedDate={item.Bookingdate}
                selectedSeats={item.Seat}
                cancelledSeats={item.CancelledSeats}
                sum={item.price}
                hide={true}
                loading={loading}
                handleCancel={handleCancel}
                status={item.status}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          data={Bookings}
          keyExtractor={item => item._id}
          onEndReached={() => fetchBookings(page)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
      {/* </>
      )} */}
    </View>
  );
};

export default TodayBooking;
