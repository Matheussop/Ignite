import React, {useState} from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import * as Yup from 'yup';
import { PasswordInput } from '../../components/PasswordInput';

import {
   Container,
   Header,
   Title,
   SubTitle,
   Footer,
   Form
} from './styles';
import { useNavigation } from '@react-navigation/core';

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(){
    try{
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email Obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatório'),
      })
      await schema.validate({email, password});

      Alert.alert('tudo certo')
      // TODO Fazer login
    }catch(error){
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa, alguma informação esta errada', error.message)
      }else{
        Alert.alert('Error, na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais')
      }
    }
  
  }

  function handleSignUp(){
    navigation.navigate('SignUpFirstStep');
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
          <Title>Estamos{'\n'}quase lá</Title>
          <SubTitle>
            Faça seu login para começar{'\n'}
            uma experiência incrível.
          </SubTitle>
        </Header>
        
        <Form>
          <Input 
            iconName='mail'
            placeholder='E-mail'
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <PasswordInput
            iconName='lock'
            placeholder='Senha'
            onChangeText={setPassword}
            value={password}
          />
        </Form>
        
        <Footer>
          <Button 
            title="Login"
            enabled={true}
            loading={false}
            onPress={handleSignIn}
          />

          <Button 
            title="Criar conta gratuita"
            enabled={true}
            loading={false}
            color={theme.colors.background_secundary}
            light
            onPress={handleSignUp}
          />
        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}