import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';
import {
  GetAllCategoriesReducers,
  GetAllSeatsReducers,
  GetAllrestaurantReducers,
  GetBookingsReducers,
  GetCancelledBookingReducers,
  GetTodaysBookingReducers,
} from './Reducers/RestaurantReducers';

const reducer = combineReducers({
  AllRestaurants: GetAllrestaurantReducers,
  Bookings: GetBookingsReducers,
  TodayBook: GetTodaysBookingReducers,
  cancelBook: GetCancelledBookingReducers,
  category: GetAllCategoriesReducers,
  seats: GetAllSeatsReducers,
});

const middleware = [thunk];

const Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default Store;
