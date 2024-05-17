import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BookingStyle from './BookingStyle/BookingStyle';
import BookingCheckout from '../BookingCheckout/BookingCheckout';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import NoDataFound from '../NoDataFound/NoDataFound';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {GetAllBookingsActions} from '../../Actions/RestaurantActions';
// import Loading from '../Loading/Loading';
// import * as Animatable from 'react-native-animatable';

const AllBookings = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [Bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // All Bookings State
  const {allBookings, loading} = useSelector(state => state.Bookings);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [totalPage, setTotalPage] = useState(null);
  const [isLength, setIsLength] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const fetchBookings = useCallback(
    async currentPage => {
      setIsActive(true);
      if (isLoading || (totalPage !== null && currentPage > totalPage)) return;
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://restaurant-app-server-three.vercel.app/api/v1/get-all-booking?page=${currentPage}`,
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
        // console.log(response?.data?.pagination);
        setIsLength(response?.data?.data?.length);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    },
    [totalPage, isLoading],
  );

  // console.log('TOTAL PAGE: ', page, totalPage);

  const renderFooter = () => {
    return isLoading ? (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color="#86469C" />
      </View>
    ) : null;
  };

  const handleCancel = async id => {
    try {
      const response = await axios.put(
        `https://restaurant-app-server-three.vercel.app/api/v1/cancel-booking/${id}`,
        {
          status: 'Cancelled',
        },
      );

      if (response?.data?.status === 1) {
        dispatch(GetAllBookingsActions(1));
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

  useEffect(() => {
    // if (isFocused && !isActive) {
    //   dispatch(GetAllBookingsActions(1));
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
  }, [page, isFocused, fetchBookings]);

  useEffect(() => {
    if (allBookings && allBookings?.status === 1) {
      setBookings(allBookings && allBookings?.data);
    }
  }, [allBookings]);

  const handleRefresh = useCallback(async () => {
    setPage(1);
    setTotalPage(null);
    setIsRefreshing(true);
    await dispatch(GetAllBookingsActions(1));
    setIsRefreshing(false);
  }, [dispatch]);

  // const viewRef = useRef(null);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (isRefreshing) {
      setLoad(true);
    }
    if (!loading) {
      setTimeout(() => {
        setLoad(false);
      }, 5000);
    }
  }, [loading, isRefreshing]);

  // useEffect(() => {
  //   if (viewRef.current && !load) {
  //     viewRef.current
  //       .fadeIn(800)
  //       .then(endState =>
  //         console.log(
  //           endState.finished ? 'bounce finished' : 'bounce cancelled',
  //         ),
  //       );
  //   }
  // }, [load]);

  return (
    <View style={BookingStyle.BookingContainer}>
      {/* {loading ? (
        <Loading />
      ) : (
        <> */}
      {/* <Animatable.View ref={viewRef}> */}
      {isLength === 0 && isLength !== null ? (
        <NoDataFound bottom={true} title="No Bookings Found." />
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
                handleCancel={handleCancel}
                status={item.status}
                loading={load}
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
      {/* </Animatable.View> */}
      {/* </>
      )} */}
    </View>
  );
};

export default AllBookings;
