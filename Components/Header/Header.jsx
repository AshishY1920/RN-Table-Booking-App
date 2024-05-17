import {View, Text, Image, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderStyle from './HeaderStyle/HeaderStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Searchbar} from 'react-native-paper';

const Header = React.memo(
  ({hideSearch, handleSearch, handleBack, searchNull, setIsNull}) => {
    const [search, setSearch] = useState('');
    const handleInputChange = text => {
      setSearch(text);
    };

    const handleSubmit = () => {
      handleSearch(search);
    };

    const handleDelete = () => {
      handleBack();
      setSearch('');
      Keyboard.dismiss();
    };

    useEffect(() => {
      if (searchNull) {
        setSearch('');
        setIsNull(false);
      }
    }, [searchNull]);
    return (
      <View style={{paddingBottom: RFValue(10)}}>
        {/* Header Top */}
        <View style={HeaderStyle.headerContainer}>
          <View style={HeaderStyle.logoContainer}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                style={HeaderStyle.Userlogo}
                source={require('../../assets/Icons/jc-gellidon-f8NlPwtC-vU-unsplash.jpg')}
              />
            </TouchableOpacity>
            <Text style={HeaderStyle.loginText}>Hello, Ashish Y</Text>
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.8}>
              <FontAwesome name="bell-o" size={RFValue(24)} color="#86469C" />
              {/* <Image
              style={HeaderStyle.Userlogo}
              source={require('../../assets/Icons/ph_bell-fill.png')}
            /> */}
            </TouchableOpacity>
          </View>
        </View>
        {/* Header Top */}

        {!hideSearch && (
          <View style={HeaderStyle.search_content}>
            <Searchbar
              placeholder="Search Restaurant"
              onChangeText={handleInputChange}
              value={search}
              inputStyle={{
                fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
                color: 'black',
                position: 'relative',
                top: RFValue(-3.1),
              }}
              iconColor="#86469C"
              placeholderTextColor={'#1c1c1c'}
              style={{
                borderColor: 'rgba(134, 70, 156, 0.25)',
                backgroundColor: 'rgba(134, 70, 156, 0.1)',
                height: RFValue(39),
                width: '100%',
              }}
              onSubmitEditing={handleSubmit}
              onClearIconPress={handleDelete}
            />
            {/* <View style={HeaderStyle.search_container}>
            <View style={HeaderStyle.inputContainer}>
              <Image
                source={require('../../assets/Icons/loupe.png')}
                style={HeaderStyle.icon}
              />
              <TextInput
                value={search}
                style={HeaderStyle.input}
                onChangeText={text => handleInputChange(text)}
                placeholder={'Search Restaurant'}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#B2A59B"
              />
              {search !== '' && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleDelete()}>
                  <Image
                    source={require('../../assets/Icons/cross.png')}
                    style={HeaderStyle.iconright}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View> */}
          </View>
        )}
      </View>
    );
  },
);

export default Header;
