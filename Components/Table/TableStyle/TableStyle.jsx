import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const TableStyle = StyleSheet.create({
  tableImg: {
    width: RFValue(30),
    height: RFValue(30),
  },
  TableGap: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: RFValue(10),
    gap: RFValue(5),
  },
  TableRow: {
    borderColor: '#C7C7C7',
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: '#607274',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 10,
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(5),
  },
  Opacity: {
    paddingHorizontal: RFValue(4),
    paddingVertical: RFValue(4),
  },
  seatRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: RFValue(10),
  },
  seatText: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
    fontSize: RFPercentage(2),
    color: '#1c1c1c',
    marginTop: RFValue(5),
    backgroundColor: '#F7F7F7',
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(5),
    borderRadius: RFValue(5),
  },
  price: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
    fontSize: RFPercentage(1.8),
    color: '#1c1c1c',
    marginTop: RFValue(5),
  },
  ReservedContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: RFValue(30),
  },
  ContainerReserved: {
    width: RFValue(10),
    height: RFValue(10),
    borderRadius: RFValue(50),
  },
  ReserverRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
  },
  reservedText: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(2),
  },
  tableNo: {
    alignSelf: 'center',
    marginTop: RFValue(5),
    fontSize: RFPercentage(2),
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    color: '#1c1c1c',
  },
  checkout: {
    backgroundColor: '#86469C',
    alignSelf: 'center',
    marginTop: RFValue(30),
    width: RFValue(130),
    height: RFValue(48),
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(5),
  },
  checkoutText: {
    color: 'white',
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(2.3),
    textAlign: 'center',
  },
});

export default TableStyle;
