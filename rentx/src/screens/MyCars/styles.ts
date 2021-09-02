import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;
  justify-content: center;

  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;

  background-color:  ${({theme}) => theme.colors.header};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_600};
  color: ${({theme}) => theme.colors.background_secundary};
  font-size: ${RFValue(30)}px;
`;

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_400};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(15)}px;

  margin-bottom: 24px;
`;

export const Content = styled.View`
  width: 100%;
  flex:1;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`

export const CarFooter = styled.View`
  width: 100%;
  padding: 12px;
  margin-top: -10px;
  
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({theme}) => theme.colors.background_secundary};

`

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`

export const CarFooterDate = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(13)}px;
`

export const CarFooterTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
`
