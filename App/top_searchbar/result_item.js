import React, {useState} from 'react';
import {StyleSheet,View,Text, TouchableOpacity} from 'react-native';
import {getCord} from '../utils/calculator';
import Linking from '../utils/linking';


const Item = props => {
  const {item} = props
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.place}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => Linking.turn2MapApp(...Object.values(getCord(item.place)))}>
        <Text style={styles.btnText}>{'Navigation'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:20,
    fontWeight:'bold'
  },
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
    width:100,
    borderRadius:8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'center',
  },
  btnText:{
    fontWeight:'bold',
    color:'#ffffff'
  }
})

export default Item