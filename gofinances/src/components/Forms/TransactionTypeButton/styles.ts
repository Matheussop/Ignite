import { Feather } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps {
  isActive: boolean;
  type: "up" | "down";
}

interface IconProps {
  type: "up" | "down";
}

export const Container = styled.View<ButtonProps>`
  width: 48%;

  /* 
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text}; */
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
    background-color: ${({ theme }) => theme.colors.succes_light}
    border: none;
  `};

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
    background-color: ${({ theme }) => theme.colors.attention_light}
    border: none;
  `};
`;

export const Button = styled(RectButton)`
  padding: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;

  margin-right: 12px;

  color: ${({ type, theme }) =>
    type === "up" ? theme.colors.succes : theme.colors.attention};
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
