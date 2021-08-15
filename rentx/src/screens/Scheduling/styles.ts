import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface DateValueProps{
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.background_secundary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;
  justify-content: center;

  padding: 25px;
  padding-top: ${getStatusBarHeight() + 35}px;

  background-color:  ${({theme}) => theme.colors.header};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_600};
  color: ${({theme}) => theme.colors.background_secundary};
  font-size: ${RFValue(30)}px;

  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`;

export const DataInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(14)}px;

  ${({theme, selected}) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.text};
    padding-bottom: 5px;
  `};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showsVerticalScrollIndicator: false
})``;

export const Footer = styled.View`
  padding: 24px;
`;

 