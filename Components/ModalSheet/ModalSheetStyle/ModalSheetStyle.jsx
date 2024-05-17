import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const ModalSheetStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: RFValue(5),
    borderTopRightRadius: RFValue(5),
    width: '100%',
    maxHeight: RFValue(300),
    height: RFValue(300),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
    gap: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingBottom: RFValue(10),
    padding: RFValue(15),
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
    color: '#86469C',
  },
});

export default ModalSheetStyle;
