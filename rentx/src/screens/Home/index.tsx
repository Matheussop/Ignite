import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import { Ionicons } from '@expo/vector-icons'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

//API
import api from '../../services/api'
import { ICarDTO } from '../../dtos/CarDTO';


import {
   Container,
   Header,
   TotalCar,
   HeaderContent,
   CarList,
} from './styles';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [ cars, setCars ] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionInY = useSharedValue(0);
  const positionInX = useSharedValue(0);

  const myCarsButtonStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionInX.value},
        {translateY: positionInY.value},
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionInX.value
      ctx.positionY = positionInY.value
    },
    onActive(event, ctx: any){
      positionInX.value = ctx.positionX + event.translationX
      positionInY.value = ctx.positionY + event.translationY
    },
    onEnd(_, ctx: any){
      positionInX.value = withSpring(0);
      positionInY.value = withSpring(0);
    }
  })

  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    fetchCars();
  },[]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  },[])

  function handleCarDetails(car: ICarDTO){
    navigation.navigate('CarDetails', { car });
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
          { !loading && <TotalCar>
            Total de {cars.length} Carros
          </TotalCar>}
         </HeaderContent>
       </Header>
       {loading ? <LoadAnimation/> : 
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
        }
        <PanGestureHandler onGestureEvent={onGestureEvent} >
          <Animated.View style={[myCarsButtonStyleAnimated, { 
            position: 'absolute',
            bottom: 13,
            right: 22,
          }]}>
            <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, {backgroundColor: theme.colors.main}]}>
              <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
     </Container>
   );
}

const styles = StyleSheet.create({
  button : {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30
  }
})