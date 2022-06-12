import React from 'react';
import {StyleSheet,View,Text, TouchableOpacity} from 'react-native';
import Linking from '../utils/linking';


const Item = props => {
  const {item} = props
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => Linking.link2map(...Object.values(coordinate), item.title)}>
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