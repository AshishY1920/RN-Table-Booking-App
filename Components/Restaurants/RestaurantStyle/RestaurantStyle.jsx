import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const RestaurantStyle = StyleSheet.create({
  Image: {
    width: '100%',
    height: RFValue(200),
    resizeMode: 'cover',
    borderTopLeftRadius: RFValue(15),
    borderTopRightRadius: RFValue(15),
  },
  RestaurantContainer: {
    marginVertical: RFValue(8),
    backgroundColor: 'white',
    borderRadius: RFValue(15),
    borderColor: '#EEEEEE',
    shadowColor: '#EEEEEE',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 8,
    shadowRadius: 11.95,

    elevation: 20,
    borderColor: '#EEEEEE',
    borderWidth: 2,
  },
  RestaurantContainerLoading: {
    marginVertical: RFValue(8),
    backgroundColor: 'white',
    // borderWidth: 1,
  },
  RestaurantDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(12),
    gap: 10,
  },
  detailsText: {
    color: '#1c1c1c',
    fontFamily: 'HvDTrial_Brandon_Grotesque_regular-BF64a625c9311e1',
    fontSize: RFPercentage(1.8),
    flex: 1,
  },
  StarRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pointView: {
    color: '#1c1c1c',
    fontSize: RFPercentage(2.3),
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
  },
});

export default RestaurantStyle;
