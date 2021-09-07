import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database/index'

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
import { Car as ModelCar } from '../../database/models/car'


import {
   Container,
   Header,
   TotalCar,
   HeaderContent,
   CarList,
} from './styles';
import { useTheme } from 'styled-components';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useNetInfo } from '@react-native-community/netinfo';
import { ICarDTO } from '../../dtos/CarDTO';

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const netInfo = useNetInfo();

  const [ cars, setCars ] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  // const positionInY = useSharedValue(0);
  // const positionInX = useSharedValue(0);

  // const myCarsButtonStyleAnimated = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {translateX: positionInX.value},
  //       {translateY: positionInY.value},
  //     ]
  //   }
  // })

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any){
  //     ctx.positionX = positionInX.value
  //     ctx.positionY = positionInY.value
  //   },
  //   onActive(event, ctx: any){
  //     positionInX.value = ctx.positionX + event.translationX
  //     positionInY.value = ctx.positionY + event.translationY
  //   },
  //   onEnd(_, ctx: any){
  //     positionInX.value = withSpring(0);
  //     positionInY.value = withSpring(0);
  //   }
  // })

  // function handleOpenMyCars(){
  //   navigation.navigate('MyCars');
  // }
  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        
        const { changes, latestVersion } = data
        return { changes, timestamp: latestVersion}
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user).catch(console.log);
      }
    });
  }

  useEffect(() => {
    let isMounted: boolean = true;
    async function fetchCars(){
      try{
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if(isMounted) 
          setCars(cars);
      }catch(error){
        console.log(error);
      }finally{
        if(isMounted) 
          setLoading(false);
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  },[]);

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  }, [netInfo.isConnected])



  function handleCarDetails(car: ModelCar){
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
        {/* <PanGestureHandler onGestureEvent={onGestureEvent} >
          <Animated.View style={[myCarsButtonStyleAnimated, { 
            position: 'absolute',
            bottom: 13,
            right: 22,
          }]}>
            <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, {backgroundColor: theme.colors.main}]}>
              <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler> */}
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