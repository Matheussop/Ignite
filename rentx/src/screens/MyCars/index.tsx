import React, { useEffect, useState } from 'react';
import { StatusBar, Alert, FlatList } from "react-native";
import api from '../../services/api';
import { useNavigation,  useIsFocused } from '@react-navigation/native';
import { BackButton } from "../../components/BackButton";
import { AntDesign } from "@expo/vector-icons"

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from "./styles";
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as ModelCar } from '../../database/models/car'
import { format, parseISO } from 'date-fns';

interface DataProps{
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const theme = useTheme();
  const [cars,setCars] = useState<DataProps[]>([] as DataProps[]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const screenIsFocus = useIsFocused();


  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get(`/rentals`);
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            car: data.car,
            start_date: format(parseISO(data.start_date),'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date),'dd/MM/yyyy'),
            id: data.id,
          }
        })
        setCars(dataFormatted);
      }catch(err){
        Alert.alert('Error ao recuperar a lista de agendamentos')
        console.log(err)
      }finally{
        setLoading(false);
      }
    }
    if(screenIsFocus)
    fetchCars();
  }, [screenIsFocus])

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Seus agendamentos {"\n"}
          estão aqui. {"\n"}
        </Title>
        <SubTitle>Conforto segurança e praticidade</SubTitle>
      </Header>
      {loading ? <LoadAnimation/> : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}