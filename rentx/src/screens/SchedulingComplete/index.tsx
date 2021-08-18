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
import { useNavigation } from '@react-navigation/native';

export function SchedulingComplete() {

  const {width} = useWindowDimensions();
  
  const navigation = useNavigation();

  function handleOkRental(){
    navigation.navigate('Home');
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
        <Title>Carro alugado!</Title>

        <Menssage>Agora vocé so precisa {"\n"} ir até a concessionária da RENTX  {"\n"} pegar o seu automóvel. </Menssage>

        <Footer>
          <ConfirmButton title='Ok' onPress={handleOkRental}/>
        </Footer>
      </Content>
    </Container>
  );
}