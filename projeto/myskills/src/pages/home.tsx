import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from "react-native";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface ISkillData {
  id: string;
  name: string;
}

export const Nome = "Matheus";
export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<ISkillData[]>([]);
  const [greetings, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills((oldState) => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter(skill =>
      skill.id !== id
    ))
  }
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) 
      setGreeting("Good morning") 
    else if(currentHour < 18)
      setGreeting("Good afternoon") 
    else
      setGreeting("Good night")
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {Nome}</Text>
      <Text style={styles.greetings}>
        {greetings}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />
      <Button onPress={handleAddNewSkill} title={'Add'}/>
      <Text style={[styles.title, { marginVertical: 40 }]}>My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <SkillCard 
            onPress={() => handleRemoveSkill(item.id)}
            skill={item.name} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1F1e25",
    color: "#fff",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: "#fff",
  }
});
