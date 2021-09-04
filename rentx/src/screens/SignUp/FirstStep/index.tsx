import React, {useState} from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import * as Yup from 'yup';

import {
   Container,
   Header,
   Title,
   SubTitle,
   Footer,
   Form,
   Steps,
   TitleForm
} from './styles';
import { useNavigation } from '@react-navigation/core';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

export function FirstStep() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  function handleBack(){
    navigation.goBack();
  }

  async function handleNextStep(){
    try{
      const schema = Yup.object().shape({
        username: Yup.string()
        .required('O nome é obrigatório'),
        email: Yup.string()
          .required('Email Obrigatório')
          .email('Digite um e-mail válido'),
       
      })

      const data = { username, email }
      await schema.validate(data);
      
      navigation.navigate('SignUpSecondStep', {user: data});
    }catch(error){
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa, alguma informação esta errada', error.message)
      }
    }
  
  }

  return (
 <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <Container>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <Header>
          <BackButton onPress={handleBack}/>
          <Steps>
            <Bullet active={true}/>
            <Bullet/>
          </Steps>
        </Header>
        <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>
        <Form>
          <TitleForm>1. Dados</TitleForm>
          <Input 
            iconName='user'
            placeholder='Nome'
            autoCorrect={false}
            autoCapitalize="sentences"
            onChangeText={setUsername}
            value={username}
          />

          <Input 
            iconName='mail'
            placeholder='E-mail'
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
        </Form>
        
        <Footer>
          <Button 
            title="Próximo"
            enabled={true}
            loading={false}
            onPress={handleNextStep}
          />

        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}