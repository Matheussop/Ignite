import React from 'react'
import { Text, TouchableOpacity,TouchableOpacityProps, StyleSheet } from 'react-native'

interface ButtonProps extends TouchableOpacityProps{
  title: string;
}

export function Button({title, ...rest}: ButtonProps){
  return(
    <TouchableOpacity style={styles.buttonAdd} activeOpacity={0.6} 
    {...rest}
    >
    <Text style={styles.buttonTxt}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
