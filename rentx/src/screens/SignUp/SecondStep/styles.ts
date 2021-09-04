import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 31}px ;
  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 60px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  padding-right: 24px;
`;

export const TitleForm = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({theme }) => theme.fonts.secundary_600};
  color: ${({theme }) => theme.colors.title};

  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({theme }) => theme.fonts.secundary_600};
  color: ${({theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme }) => theme.fonts.primary_400};
  color: ${({theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
`;

export const Footer = styled.View`

`;


