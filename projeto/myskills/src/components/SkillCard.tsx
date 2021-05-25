import React from 'react';
import { Text, TouchableOpacity,TouchableOpacityProps,StyleSheet } from 'react-native'

interface SkillCardProps extends TouchableOpacityProps{
  skill: string;
}

export function SkillCard({skill, ...rest} : SkillCardProps){
  return(
      <TouchableOpacity style={styles.buttonSkills} {...rest}>
      <Text style={styles.skill}>{skill}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonSkills: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10
  },
  skill: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  }
})