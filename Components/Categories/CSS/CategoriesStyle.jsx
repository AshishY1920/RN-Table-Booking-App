import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const CategoriesStyle = StyleSheet.create({
  category: {
    marginRight: RFValue(5),
    marginVertical: RFValue(2),
  },
  categoryImg: {
    width: RFValue(63),
    height: RFValue(63),
    borderRadius: RFValue(50),
    borderColor: '#F6F5F5',
    borderWidth: 3,
  },
  //   #FF5BAE
  categoryTag: {
    color: '#1c1c1c',
    fontFamily: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
    fontSize: RFPercentage(1.8),
    marginTop: RFValue(3),
    alignSelf: 'center',
  },
});

export default CategoriesStyle;
