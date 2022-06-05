import React, {useState} from 'react';
import {StyleSheet,View,Text, Button, TouchableOpacity} from 'react-native';

const Item = props => {
  
  return (
    <View style={styles.item}>
      <Text>{'Placeholder'}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>{'Details'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    height: 150,
    width: 320,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#757575',
    shadowOpacity: 0.3,
    shadowOffset:{
      width:0,
      height:3
    },
    shadowRadius:8,
    alignItems: 'center',
    justifyContent:'center',
  },
  button: {
    backgroundColor: '#4da4dd',
    height:26,
    width:70,
    borderRadius:8,
    alignItems: 'center',
    justifyContent:'center',
  },
  btnText:{
    fontWeight:'bold',
    color:'#ffffff'
  }
})

export default Item