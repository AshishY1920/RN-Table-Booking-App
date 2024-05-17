import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const HeaderStyle = StyleSheet.create({
  Container: {
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(20),
  },
  Userlogo: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFPercentage(100),
    resizeMode: 'cover',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginText: {
    fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
    fontSize: RFPercentage(2.4),
    color: '#86469C',
  },
  input: {
    flex: 1,
    height: RFValue(38),
    color: '#1c1c1c',
    fontFamily: 'HvDTrial_Brandon_Grotesque_regular-BF64a625c9311e1',
    paddingVertical: RFValue(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8DFF4',
    borderRadius: RFValue(30),
    paddingHorizontal: RFValue(10),
  },
  icon: {
    width: RFValue(15),
    height: RFValue(15),
    marginRight: RFValue(5),
  },
  iconright: {
    width: RFValue(15),
    height: RFValue(15),
    marginRight: RFValue(5),
  },
  search_container: {
    position: 'relative',
    top: 0,
    width: '100%',
  },
  search_content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
    marginTop: RFValue(10),
  },
});

export default HeaderStyle;
