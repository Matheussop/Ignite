import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FlatList } from 'react-native'
import { ICarDTO } from '../../dtos/CarDTO';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
  flex: 1;
  background-color:  ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({theme}) => theme.colors.header};

  justify-content: flex-end;
`

export const TotalCar = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};

  color:  ${({theme}) => theme.colors.text};
  align-self: flex-end;

`

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px;
`

export const CarList = styled(FlatList as new () => FlatList<ICarDTO>).attrs({
  contentContainerStyle:{
    padding: 24
  },
  showsVerticalScrollIndicator: false
})``