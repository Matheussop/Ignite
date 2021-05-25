import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export function Button({onPress}){
  return(
    <TouchableOpacity style={styles.buttonAdd} activeOpacity={0.6} 
    onPress={onPress}
    >
    <Text style={styles.buttonTxt}>Add</Text>
    </TouchableOpacity>
  )
}

const styles = new StyleSheet.create({
  buttonAdd: {
    backgroundColor: "#a370f7",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 20,
  },
  buttonTxt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  }
});
