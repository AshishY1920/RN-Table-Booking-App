import axios from 'axios';
import {
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_SEATS_BY_RESTAURANT_FAILURE,
  GET_ALL_SEATS_BY_RESTAURANT_REQUEST,
  GET_ALL_SEATS_BY_RESTAURANT_SUCCESS,
  GET__ALL_CATEGORIES_FAILURE,
  GET__ALL_CATEGORIES_REQUEST,
  GET__ALL_CATEGORIES_SUCCESS,
  GET__BOOKINGS_FAILURE,
  GET__BOOKINGS_REQUEST,
  GET__BOOKINGS_SUCCESS,
  GET__CANCELLED_BOOKING_FAILURE,
  GET__CANCELLED_BOOKING_REQUEST,
  GET__CANCELLED_BOOKING_SUCCESS,
  GET__TODAYS_BOOKING_FAILURE,
  GET__TODAYS_BOOKING_REQUEST,
  GET__TODAYS_BOOKING_SUCCESS,
} from '../Constants/RestaurantConstants';

export const BASEURL = `https://restaurant-app-server-three.vercel.app/api/v1`;

// Get All Restaurants
export const GetAllrestaurantActions = page => async dispatch => {
  try {
    dispatch({
      type: GET_ALL_RESTAURANT_REQUEST,
    });

    const {data} = await axios.get(`${BASEURL}/get-restaurant?page=${page}`);
    dispatch({
      type: GET_ALL_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_RESTAURANT_FAILURE,
      payload: error.message,
    });
  }
};

// Get All Bookings
export const GetAllBookingsActions = page => async dispatch => {
  try {
    dispatch({
      type: GET__BOOKINGS_REQUEST,
    });

    const {data} = await axios.get(`${BASEURL}/get-all-booking?page=${page}`);
    dispatch({
      type: GET__BOOKINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET__BOOKINGS_FAILURE,
      payload: error.message,
    });
  }
};

// Get Today's Bookings
export const GetTodaysBookingActions = page => async dispatch => {
  try {
    dispatch({
      type: GET__TODAYS_BOOKING_REQUEST,
    });

    const {data} = await axios.get(`${BASEURL}/get-today-booking?page=${page}`);
    dispatch({
      type: GET__TODAYS_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET__TODAYS_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

// Get Cancelled Bookings
export const GetCancelledBookingActions = page => async dispatch => {
  try {
    dispatch({
      type: GET__CANCELLED_BOOKING_REQUEST,
    });

    const {data} = await axios.get(
      `${BASEURL}/get-cancel-booking?page=${page}`,
    );
    dispatch({
      type: GET__CANCELLED_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET__CANCELLED_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

// Get All Categories
export const GetAllCategoriesActions = () => async dispatch => {
  try {
    dispatch({
      type: GET__ALL_CATEGORIES_REQUEST,
    });

    const {data} = await axios.get(`${BASEURL}/get-categories`);
    dispatch({
      type: GET__ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET__ALL_CATEGORIES_FAILURE,
      payload: error.message,
    });
  }
};

// Get All Seats
export const GetAllSeatsActions = id => async dispatch => {
  try {
    dispatch({
      type: GET_ALL_SEATS_BY_RESTAURANT_REQUEST,
    });

    const {data} = await axios.get(`${BASEURL}/get-seats/${id}`);
    dispatch({
      type: GET_ALL_SEATS_BY_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SEATS_BY_RESTAURANT_FAILURE,
      payload: error.message,
    });
  }
};
