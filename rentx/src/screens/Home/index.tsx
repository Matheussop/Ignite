import React from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';


import {
   Container,
   Header,
   TotalCar,
   HeaderContent,
   CarList
} from './styles';

export function Home() {
  const carData = {
    brand: 'AUDI',
    name:'RS 5 Coupé',
    rent: {
       period: 'Ao Dia',
       price: 120,
    },
    thumbnail: 'https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png',
  }
   return (
     <Container>
       <StatusBar barStyle="light-content"
       backgroundColor="transparent"
       translucent
       />
       <Header>
         <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}/>
          <TotalCar>
            Total de 12 Carros
          </TotalCar>
         </HeaderContent>
       </Header>
       <CarList
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData}/>}
       />
     </Container>
   );
}