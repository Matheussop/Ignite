import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  CarImages,
  OffLineInfo
} from "./styles";
import { StatusBar, StyleSheet } from "react-native";
import { Car as ModelCar } from '../../database/models/car';
import { ICarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { Accessory } from "../../components/Accessory";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";
import { useNetInfo } from '@react-native-community/netinfo';

import api from "../../services/api";
interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const netInfo = useNetInfo();
  const { car } = route.params as Params;

  const [carUpdated, setCarUptdated] = useState<ICarDTO>({} as ICarDTO)

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, 
        [0, 200], 
        [200, 70], 
        Extrapolate.CLAMP),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, 
        [0, 150], 
        [1, 0], 
        Extrapolate.CLAMP),
    };
  })

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { carUpdated });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdate(){
      const response = await api.get(`/cars/${car.id}`);
      setCarUptdated(response.data);
    }

    if(netInfo.isConnected === true){
      fetchCarUpdate();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <Animated.View style={[headerStyleAnimation, styles.header, {backgroundColor: theme.colors.background_secundary}]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignItems: "center",
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '***' } </Price>
          </Rent>
        </Details>
        { carUpdated.accessories &&
        <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                name={accessory.name}
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        }
        <About>
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={ netInfo.isConnected === true}
        />
        { netInfo.isConnected === false && 
          <OffLineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro
          </OffLineInfo>
        }
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})
