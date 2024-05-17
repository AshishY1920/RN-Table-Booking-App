import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import TableStyle from '../Table/TableStyle/TableStyle';

const ChooseSeats = React.memo(
  ({
    id,
    image,
    BookedSeats,
    selectedSeats,
    setSelectedSeats,
    price,
    handlePrice,
  }) => {
    const handleSeats = (i, p) => {
      if (!selectedSeats.includes(i)) {
        setSelectedSeats(prev => [...prev, i]);
        handlePrice(p);
      } else {
        let filter = selectedSeats.filter(item => item !== i);
        setSelectedSeats(filter);
        handlePrice('');
      }
    };

    return (
      <TouchableOpacity
        onPress={() => handleSeats(id, price)}
        activeOpacity={0.8}
        disabled={BookedSeats.includes(id) ? true : false}
        style={{alignItems: 'center'}}
        key={id}>
        {BookedSeats.includes(id) || selectedSeats.includes(id) ? (
          <Image
            style={TableStyle.tableImg}
            source={require('../../assets/Icons/round-table-color.png')}
          />
        ) : (
          <Image style={TableStyle.tableImg} source={image} />
        )}

        <Text style={TableStyle.seatText}>{id}</Text>
        <Text style={TableStyle.price}>₹{price}</Text>
      </TouchableOpacity>
    );
  },
);

export default ChooseSeats;
