import React from 'react';

import { Container, Title, Amount } from './styles' 

interface IPros{
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({color, title, amount}: IPros){ 
  return (
    <Container color={color} >
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}