import { Feather } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface TypesProps {
  type: "up" | "down" | "total";
}

export const Container = styled.View<TypesProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secundary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px ${RFValue(42)}px 23px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypesProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;
export const Icon = styled(Feather)<TypesProps>`
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.colors.secundary};
  ${({ type }) =>
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.succes};
    `}
  ${({ type }) =>
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
   ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;
export const Footer = styled.View``;
export const Amount = styled.Text<TypesProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
  margin-top: 38px;
`;
export const LastTransaction = styled.Text<TypesProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.background : theme.colors.text};
`;
