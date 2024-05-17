// BottomSheetModal.js

import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalSheetStyle from './ModalSheetStyle/ModalSheetStyle';
import {RFValue} from 'react-native-responsive-fontsize';

const BottomSheetModal = ({visible, onClose, title, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={ModalSheetStyle.container}>
        <View style={ModalSheetStyle.modal}>
          <View style={ModalSheetStyle.header}>
            <Text style={[ModalSheetStyle.title, {flex: 4}]}>{title}</Text>
            <TouchableOpacity style={{flex: 0.5}} onPress={onClose}>
              <AntDesign
                color="#86469C"
                name="closecircle"
                size={RFValue(28)}
              />
            </TouchableOpacity>
          </View>
          <View style={ModalSheetStyle.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetModal;
