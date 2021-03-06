import React from "react";
import { categories } from "../../utils/categories";

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
  name: string;
  amount: string;
  date: string;
  category: string;
}

interface IProps {
  data: TransactionsCardData
}

export function TransactionsCard({ data }: IProps) {
  const [category] = categories.filter(item => item.key === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
          {data.type == 'negative' && '- '}
          {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
