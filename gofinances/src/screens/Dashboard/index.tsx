import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionsCard, TransactionsCardData } from "../../components/TransactionsCard";
import {
  Container,
  Header,
  User,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from "./styles";
export interface DataListProps extends TransactionsCardData{
  id: string;
}
const data: DataListProps[] = [
  {id: '1', title:"Desenvolvimento de sites", amount:"R$ 12.000,00", category: {name: 'Vendas', icon: 'dollar-sign'}, date:'13/04/2021', type:'positive'},
  {id: '2', title:"Meu salario", amount:"R$ 20.000,00", category: {name: 'Vendas', icon: 'dollar-sign'},date:'13/04/2021', type:'positive'},
  {id: '3', title:"Meu salario", amount:"R$ 20.000,00", category: {name: 'Vendas', icon: 'coffee'},date:'13/04/2021', type:'negative'},
  {id: '4', title:"Meu salario", amount:"R$ 20.000,00", category: {name: 'Vendas', icon: 'shopping-bag'},date:'13/04/2021', type:'positive'},
  {id: '5', title:"Meu salario", amount:"R$ 20.000,00", category: {name: 'Vendas', icon: 'dollar-sign'},date:'13/04/2021', type:'negative'},
]

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/36748285?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Matheus Luiz</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => console.log('teste')}>
          <Icon name="power"/>
          </LogoutButton>
        </UserWrapper>
      </Header>
      
      <HighlightCards  >
        <HighlightCard title="Entradas" amount="R$ 17.400,00" lastTransaction={"Última entrada dia 13 de abril"} type={"up"}/>
        <HighlightCard title="Saídas" amount="R$ 7.400,00" lastTransaction={"Última entrada dia 13 de abril"} type={"down"}/>
        <HighlightCard title="Total" amount="R$ 10.000,00" lastTransaction={"Última entrada dia 13 de abril"} type={"total"}/>
      </HighlightCards>
    
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <TransactionsCard data={item}/>
          }
        />
      </Transactions>
    </Container>
  );
}
