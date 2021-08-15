import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

interface DateValueProps{
  selected: boolean;
}


export const Container = styled.View`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.background_secundary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  align-items: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center'
  },
  showsVerticalScrollIndicator: false
})`
`;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 38px;
`;

export const Description = styled.View`
`;

export const Rent = styled.View`
`;

export const Brand = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(25)}px;
`;

export const Period = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.main};
  font-size: ${RFValue(25)}px;
  text-transform: uppercase;
`;

export const Acessories = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`;

export const Footer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.background_primary};
  
  padding: 24px 24px  ${getBottomSpace() + 24}px;

`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.line};
  padding-bottom: 16px;
`;

export const CalendaIcon = styled.View`
  width: 48px; 
  height: 48px;
  background-color:  ${({theme}) => theme.colors.main};
  justify-content: center;
  align-items: center;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const RetalPrice = styled.View`
  width: 100%;
  padding-top: 24px;
  /* background-color: ${({theme}) => theme.colors.background_primary} */
`;

export const RentalPriceLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
`;

export const RentalPriceDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
`;

export const RentalPriceQuota = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const RentalPriceTotal = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.success};
  font-size: ${RFValue(24)}px;
`;
