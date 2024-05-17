import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderStyle from '../Components/Header/HeaderStyle/HeaderStyle';
import Table from '../Components/Table/Table';
import TableStyle from '../Components/Table/TableStyle/TableStyle';
import DatePicker from 'react-native-modern-datepicker';
import {useIsFocused, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import {Toast} from 'react-native-alert-notification';
import moment from 'moment';

const tableArr = [
  {
    id: 1,
    seats: [
      {
        id: 'D-121',
        image: require('../assets/Icons/round-table.png'),
        price: 199,
      },
      {
        id: 'D-122',
        image: require('../assets/Icons/round-table.png'),
        price: 199,
      },
      {
        id: 'D-123',
        image: require('../assets/Icons/round-table.png'),
        price: 199,
      },
      {
        id: 'D-124',
        image: require('../assets/Icons/round-table.png'),
        price: 199,
      },
    ],
    tableNo: 'D-X',
  },
  {
    id: 2,
    seats: [
      {
        id: 'B-125',
        image: require('../assets/Icons/round-table.png'),
        price: 259,
      },
      {
        id: 'B-126',
        image: require('../assets/Icons/round-table.png'),
        price: 259,
      },
      {
        id: 'B-127',
        image: require('../assets/Icons/round-table.png'),
        price: 259,
      },
      {
        id: 'B-128',
        image: require('../assets/Icons/round-table.png'),
        price: 259,
      },
    ],
    tableNo: 'B-X',
  },
  {
    id: 3,
    seats: [
      {
        id: 'C-129',
        image: require('../assets/Icons/round-table.png'),
        price: 399,
      },
      {
        id: 'C-130',
        image: require('../assets/Icons/round-table.png'),
        price: 399,
      },
      {
        id: 'C-131',
        image: require('../assets/Icons/round-table.png'),
        price: 399,
      },
      {
        id: 'C-132',
        image: require('../assets/Icons/round-table.png'),
        price: 399,
      },
    ],
    tableNo: 'C-X',
  },
];
const ChooseTable = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const {image, id} = route.params;

  const formatDate = date => {
    const convert = moment(date);
    return convert.format('YYYY/MM/DD');
  };

  const currentDate = new Date();

  const [CurrentDate, setCurrentDate] = useState(formatDate(currentDate));

  // Api Handler
  const [isLoading, setIsLoading] = useState(false);

  const [seats, setSeats] = useState([]);

  const fetchRestaurants = useCallback(
    async date => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://restaurant-app-server-three.vercel.app/api/v1/show-restaurant?id=${id}&date=${date}`,
        );

        // console.log(response?.data);

        if (response?.data?.status === 1) {
          const AllSeats = response?.data?.data?.bookings?.flatMap(i =>
            i.Seat.filter(j => !seats.includes(j)),
          );

          setSeats(AllSeats);

          setIsLoading(false);
        } else if (response?.data?.status === 0) {
          setIsLoading(false);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            textBody: response?.data?.message,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    },
    [id, seats],
  );

  useEffect(() => {
    if (
      isFocused &&
      CurrentDate !== null &&
      CurrentDate !== undefined &&
      CurrentDate !== ''
    ) {
      fetchRestaurants(CurrentDate);
    } else {
      fetchRestaurants(CurrentDate);
    }
  }, [CurrentDate, isFocused]);

  // console.log('SEATS: ', seats);

  const handleDate = date => {
    setCurrentDate(date);
    fetchRestaurants(date);
    // console.log('HANDLE DATE: ', date);
  };

  return (
    <View
      style={[
        HeaderStyle.Container,
        {
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
        },
      ]}>
      {/* Date Picker component starts here */}
      <DatePicker
        selected={formatDate(currentDate)}
        mode="calendar"
        minimumDate={formatDate(currentDate)}
        options={{
          defaultFont: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
          headerFont: 'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
          textHeaderColor: '#FFA25B',
          textDefaultColor: '#1c1c1c',
          selectedTextColor: '#fff',
          mainColor: '#1c1c1c',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
        }}
        onDateChange={date => handleDate(date)}
        onSelectedChange={date => setCurrentDate(date)}
      />
      {/* Date Picker component ends here */}
      {isLoading ? (
        <View style={{paddingBottom: RFValue(40)}}>
          <ActivityIndicator size="large" color="#86469C" />
        </View>
      ) : (
        <FlatList
          numColumns={3}
          columnWrapperStyle={TableStyle.TableGap}
          data={tableArr}
          renderItem={({item}) => (
            <Table
              image={item.seats}
              tableNo={item.tableNo}
              CurrentDate={CurrentDate}
              restaurantImage={image}
              id={id}
              BookedSeats={seats}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          initialNumToRender={2}
          windowSize={2}
        />
      )}

      <View style={TableStyle.ReservedContainer}>
        <View style={TableStyle.ReserverRow}>
          <View
            style={[
              TableStyle.ContainerReserved,
              {backgroundColor: '#B4B4B8'},
            ]}></View>
          <Text style={[TableStyle.reservedText, {color: '#B4B4B8'}]}>
            Available
          </Text>
        </View>
        <View style={TableStyle.ReserverRow}>
          <View
            style={[
              TableStyle.ContainerReserved,
              {backgroundColor: '#86469C'},
            ]}></View>
          <Text style={[TableStyle.reservedText, {color: '#86469C'}]}>
            Reserved
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChooseTable;
