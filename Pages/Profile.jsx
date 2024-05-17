import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HeaderStyle from '../Components/Header/HeaderStyle/HeaderStyle';
import Header from '../Components/Header/Header';
import {launchImageLibrary} from 'react-native-image-picker';
import ProfileStyle from './ProfileStyle/ProfileStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: 'User Cancelled Image Picker',
        });
        return;
      } else if (response.error) {
        console.log(response.error);
        return;
      }
      // console.log('IMAGE: ', response.assets[0]);
      setProfileImage(response.assets[0]);
    });
  };

  // console.log(profileImage);
  return (
    <View style={[HeaderStyle.Container, {flex: 1, backgroundColor: 'white'}]}>
      {/* <Header hideSearch={true} /> */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={selectImage}
        style={ProfileStyle.profileView}>
        {profileImage !== null ? (
          <Image
            style={ProfileStyle.profileImg}
            source={{
              uri: `data:${profileImage.type};base64,${profileImage.base64}`,
            }}
          />
        ) : (
          <Image
            style={ProfileStyle.profileImg}
            source={require('../assets/Icons/jc-gellidon-f8NlPwtC-vU-unsplash.jpg')}
          />
        )}
        <View style={ProfileStyle.camera}>
          <Entypo name="camera" size={RFValue(22)} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
