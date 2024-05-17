import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BookingStyle from './BookingStyle/BookingStyle';
import BookingCheckout from '../BookingCheckout/BookingCheckout';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import NoDataFound from '../NoDataFound/NoDataFound';
import {GetCancelledBookingActions} from '../../Actions/RestaurantActions';
import Loading from '../Loading/Loading';

const CancelledBooking = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [Bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLength, setIsLength] = useState(null);

  const [isActive, setIsActive] = useState(false);

  // Cancelled Bookings State
  const {cancelledBooking, loading} = useSelector(state => state.cancelBook);

  const [totalPage, setTotalPage] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBookings = useCallback(
    async currentPage => {
      setIsActive(true);
      if (isLoading || (totalPage !== null && currentPage > totalPage)) return; // Prevent multiple simultaneous requests
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://restaurant-app-server-three.vercel.app/api/v1/get-cancel-booking?page=${currentPage}`,
        );
        const newData = response?.data?.data || [];
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
    await dispatch(GetCancelledBookingActions(1));
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    // if (isFocused && !isActive) {
    //   dispatch(GetCancelledBookingActions(1));
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
    if (cancelledBooking && cancelledBooking?.status === 1) {
      setBookings(cancelledBooking && cancelledBooking?.data);
    }
  }, [cancelledBooking]);
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
                image={item.image.url}
                ParsedDate={item.Bookingdate}
                selectedSeats={item.Seat}
                cancelledSeats={item.CancelledSeats}
                sum={item.price}
                hide={true}
                loading={loading}
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

export default CancelledBooking;
