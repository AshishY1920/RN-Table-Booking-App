import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const ProfileStyle = StyleSheet.create({
  profileView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(20),
  },
  profileImg: {
    width: RFValue(120),
    height: RFValue(120),
    borderRadius: RFValue(100),
    position: 'relative',
    top: RFValue(0),
  },
  camera: {
    borderRadius: RFValue(100),
    position: 'absolute',
    bottom: RFValue(10),
    // left: '50%',
    // right: '50%',
    // margin: 'auto',
  },
});

export default ProfileStyle;
