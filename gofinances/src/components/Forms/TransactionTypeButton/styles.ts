import { Feather } from "@expo/vector-icons";
import styled, {css} from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {TouchableOpacity} from "react-native"
import {TouchableOpacityProps} from "react-native"

interface ButtonProps extends TouchableOpacityProps{
  isActive: boolean;
  type: 'up' | 'down'
}

interface IconProps {
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({theme}) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({isActive, type}) => 
  isActive && type === 'up' && css`
    background-color: ${({ theme}) => theme.colors.succes_light}
    border: none;
  `};

  ${({isActive, type}) => 
  isActive && type === 'down' && css`
    background-color: ${({ theme}) => theme.colors.attention_light}
    border: none;
  `};
  
`;
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;

  margin-right: 12px;
  
  color: ${({type, theme}) => 
    type === 'up' ? theme.colors.succes : theme.colors.attention 
  }
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular}
`;
