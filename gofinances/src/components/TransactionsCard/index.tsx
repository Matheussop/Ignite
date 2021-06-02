import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

interface ICategory {
  name: string;
  icon: string;
}

export interface TransactionsCardData {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  date: string;
  category: ICategory;
}

interface IProps {
  data: TransactionsCardData
}

export function TransactionsCard({ data }: IProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
          {data.type == 'negative' && '- '}
          {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
