import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

import styled, { css } from 'styled-components/native';

interface OptionsProps { 
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;
  padding: 0 26px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: ${getStatusBarHeight() + 32}px ;
  justify-content: space-between;
  align-items: center;

`;

export const Title = styled.Text` 
  font-size: ${RFValue(25)}px;
  font-family: ${({theme }) => theme.fonts.secundary_600};
  color: ${({ theme }) => theme.colors.shape};
`;


export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 48px;
  
  `;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  /* border-radius: 20px; */
  background-color: ${({ theme }) => theme.colors.main};
  
  justify-content: center;
  align-items: center;
  
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
  
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;

  border-bottom-width: 1px;
  border-bottom-color:  ${({ theme }) => theme.colors.line};

  margin-bottom: 24px;

`;

export const Option = styled.TouchableOpacity<OptionsProps>`
    ${({ theme, active }) => active && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
  padding: 14px;
`;

export const OptionTitle = styled.Text<OptionsProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme, active }) =>  active ? theme.fonts.secundary_600 : theme.fonts.secundary_500};
  color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.text_detail};
`;

export const Section = styled.View`

`;