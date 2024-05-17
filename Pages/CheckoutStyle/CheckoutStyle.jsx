import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const CheckoutStyle = StyleSheet.create({
  checkoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: RFValue(10),
    marginBottom: RFValue(5),
    borderBottomColor: '#EEE',
    borderBottomWidth: 5,
    paddingVertical: RFValue(10),
    borderRadius: RFValue(50),
  },
  imageCheckout: {
    width: RFValue(80),
    borderRadius: RFValue(8),
    height: RFValue(80),
    resizeMode: 'cover',
    borderColor: '#F6F5F5',
    borderWidth: 3,
  },
  parseDate: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(1.8),
    color: '#1c1c1c',
  },
  selectedSeats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: RFValue(10),
    rowGap: RFValue(5),
    marginTop: RFValue(10),
  },
  seats: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(2),
    borderRadius: RFValue(3),
  },
  seatsText: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(1.8),
    color: '#1c1c1c',
  },
  totalPrice: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(1.8),
    color: '#1c1c1c',
    marginTop: RFValue(5),
  },
  msg: {
    alignSelf: 'center',
    marginTop: RFValue(20),
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(2.5),
  },
  chekoutCancelCTA: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFValue(3),
  },
  green: {
    backgroundColor: '#90D26D',
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(50),
    paddingVertical: RFValue(2),
    color: 'white',
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
  },
  red: {
    backgroundColor: '#E72929',
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(50),
    paddingVertical: RFValue(2),
    color: 'white',
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
  },
});

export default CheckoutStyle;
