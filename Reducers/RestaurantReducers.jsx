import {
  CLEAR_ERRORS,
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

// Get All Restaurant Reducers
export const GetAllrestaurantReducers = (state = {restaurants: {}}, action) => {
  switch (action.type) {
    case GET_ALL_RESTAURANT_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case GET_ALL_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get All Bookings Reducers
export const GetBookingsReducers = (state = {allBookings: {}}, action) => {
  switch (action.type) {
    case GET__BOOKINGS_REQUEST:
      return {
        loading: true,
      };
    case GET__BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        allBookings: action.payload,
      };
    case GET__BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get Today's Bookings Reducers
export const GetTodaysBookingReducers = (
  state = {todayBooking: {}},
  action,
) => {
  switch (action.type) {
    case GET__TODAYS_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case GET__TODAYS_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        todayBooking: action.payload,
      };
    case GET__TODAYS_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get Cancelled Bookings Reducers
export const GetCancelledBookingReducers = (
  state = {cancelledBooking: {}},
  action,
) => {
  switch (action.type) {
    case GET__CANCELLED_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case GET__CANCELLED_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        cancelledBooking: action.payload,
      };
    case GET__CANCELLED_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get All Categories Reducers
export const GetAllCategoriesReducers = (state = {categories: {}}, action) => {
  switch (action.type) {
    case GET__ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
      };
    case GET__ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.data,
      };
    case GET__ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Get All Seats Reducers
export const GetAllSeatsReducers = (state = {seats: {}}, action) => {
  switch (action.type) {
    case GET_ALL_SEATS_BY_RESTAURANT_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_SEATS_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        seats: action.payload,
      };
    case GET_ALL_SEATS_BY_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
