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

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental(){
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post(`schedules_byuser`,{
      user_id: 1,
      car,
      startDate: format(getPlatFormDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatFormDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })


    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(() => 
      {
      navigation.navigate('SchedulingComplete')}
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
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map((accessory) => (
              <Accessory name={accessory.name} key={accessory.type} icon={getAccessoryIcon(accessory.type)}/>
            ))
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
          <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
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
