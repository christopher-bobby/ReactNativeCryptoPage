import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface ModalComponentProps {
  // Add any props you might need
  isModalVisible: boolean,
  toggleModal: Function
}

const ModalComponent: React.FC<ModalComponentProps> = ({isModalVisible, toggleModal}) => {
console.log("isModalVisible", isModalVisible)

  return (
    <View style={[styles.container, { display: isModalVisible ? 'flex' : 'none' }]}>


      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={()=>toggleModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>This is the modal content!</Text>
            <TouchableOpacity onPress={()=>toggleModal()}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ModalComponent;