import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TableStyle from './TableStyle/TableStyle';
import BottomSheetModal from '../ModalSheet/ModalSheet';
import Entypo from 'react-native-vector-icons/Entypo';
import ChooseSeats from '../ChooseSeats/ChooseSeats';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Table = React.memo(
  ({image, tableNo, CurrentDate, restaurantImage, id, BookedSeats}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [availableSeats, setAvailableSeats] = useState([]);

    const [selectedSeats, setSelectedSeats] = useState([]);

    // let BookedSeats = ['D-121', 'C-132', 'D-124'];

    const handleModalOpen = seats => {
      setModalVisible(true);
      setAvailableSeats(seats);
      // console.log('SEATS', seats);
    };

    const [price, setPrice] = useState([]);

    const handlePrice = val => {
      setPrice(prev => [...prev, val]);
    };

    const renderItem = ({item}) => {
      // let currentImg = BookedSeats.includes(item.id)
      //   ? require('../../assets/Icons/round-table-color.png')
      //   : item.image;
      return (
        <TouchableOpacity
          onPress={() => handleModalOpen(image)}
          style={TableStyle.Opacity}
          activeOpacity={0.8}>
          <Image
            source={
              BookedSeats.includes(item.id)
                ? require('../../assets/Icons/round-table-color.png')
                : item.image
            }
            style={TableStyle.tableImg}
          />
        </TouchableOpacity>
      );
    };

    // console.log('SELECTED SEATS: ', selectedSeats, CurrentDate);

    const handleCheckout = () => {
      if (selectedSeats?.length === 0) {
        return Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: 'Please Choose Seats',
        });
      } else {
        setModalVisible(false);
        navigation.navigate('checkout', {
          CurrentDate: CurrentDate,
          image: restaurantImage,
          price: price,
          selectedSeats: selectedSeats,
          id: id,
        });
        setSelectedSeats([]);
      }
    };

    return (
      <View>
        <TouchableOpacity
          onPress={() => handleModalOpen(image)}
          style={TableStyle.TableRow}>
          <FlatList
            numColumns={2}
            data={image}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </TouchableOpacity>
        <Text style={TableStyle.tableNo}>{tableNo}</Text>

        {/* Modal Component */}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <BottomSheetModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Choose Seat">
            {/* Content goes here */}
            <View>
              <FlatList
                numColumns={4}
                data={availableSeats}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={TableStyle.seatRow}
                renderItem={({item}) => (
                  <ChooseSeats
                    id={item.id}
                    image={item.image}
                    BookedSeats={BookedSeats}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    availableSeats={availableSeats}
                    price={item.price}
                    handlePrice={handlePrice}
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => handleCheckout()}
                activeOpacity={0.8}
                style={TableStyle.checkout}>
                <Text style={TableStyle.checkoutText}>
                  <Entypo name="bookmark" size={RFValue(22)} /> Checkout
                </Text>
              </TouchableOpacity>
            </View>
            {/* Content goes here */}
          </BottomSheetModal>
        </View>
        {/* Modal Component */}
      </View>
    );
  },
);

export default Table;
