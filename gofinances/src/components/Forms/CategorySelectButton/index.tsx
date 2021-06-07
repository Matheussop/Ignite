import React from "react";
import {TextInputProps} from "react-native"
import { Container, Category, Icon } from "./styles";

interface Props{
  title: string
  onPress: () => void;
}

export function CategorySelectButton({title, onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon />
    </Container>
  );
}
