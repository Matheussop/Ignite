import React, { useEffect, useState } from 'react';
import { StatusBar, Alert, FlatList } from "react-native";
import { ICarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
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

interface CarProps{
  car: ICarDTO;
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const [cars,setCars] = useState<CarProps[]>([] as CarProps[]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
      }catch(err){
        Alert.alert('Error ao recuperar a lista de agendamentos')
      }finally{
        setLoading(false);
      }
    }
    fetchCars();
  }, [])

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
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
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