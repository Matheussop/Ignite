import React, { useState, useEffect } from "react";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import { Feather } from "@expo/vector-icons";
import { Accessory } from '../../components/Accessory';


import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendaIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RetalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StatusBar } from "react-native";
import { ICarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatFormDate } from '../../utils/getPlatFormDate'
import { format } from 'date-fns';
import api from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";
interface Params{
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod{
  startFormatted: string;
  endFormatted: string;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();

  const route = useRoute();
  const { car, dates } = route.params as Params;
  const [carUpdated, setCarUptdated] = useState<ICarDTO>({} as ICarDTO)


  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental(){
    setLoading(true);

    await api.post(`rentals`,{
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal,
    })
    .then(() => 
      {
      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: 'Agora vocé so precisa\nir até a concessionária da RENTX\npegar o seu automóvel.',
        nextScreen: 'Home'
      })
    }
    ).catch((err) => {
      setLoading(false)
      Alert.alert('Não foi possivel confirmar o agendamento.')
    })

  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatFormDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatFormDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  },[])

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
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.price}</Price>
          </Rent>
        </Details>
        <Accessories>
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
        </Accessories>
        <RentalPeriod>
          <CalendaIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendaIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RetalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
          <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
          <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
        </RentalPriceDetails>
      </RetalPrice>
      </Content>

      <Footer>
        <Button title="Alugar Agora" onPress={handleConfirmRental} color={theme.colors.success} enabled={!loading} loading={loading}/>
      </Footer>
    </Container>
  );
}
