import React from 'react';

import { useWindowDimensions, StatusBar } from 'react-native'
import BrandSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
   Container,
   Content,
   Title,
   Menssage,
   Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Props{
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {

  const {width} = useWindowDimensions();
  
  const navigation = useNavigation();

  const route = useRoute();

  const {title, message, nextScreen } = route.params as Props;

  function handleOkRental(){
    navigation.navigate(nextScreen);
  }

  return (
    <Container>
      <StatusBar 
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      /> 
      <BrandSvg width={width}/>
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Menssage>{message}</Menssage>

        <Footer>
          <ConfirmButton title='Ok' onPress={handleOkRental}/>
        </Footer>
      </Content>
    </Container>
  );
}