import React, {useState} from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Button } from '../../../components/Button';
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
import { useNavigation, useRoute } from '@react-navigation/core';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

interface Params{ 
  user: {
    name: string;
    email: string;
  }
}

export function SecondStep() {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user } = route.params as Params;

  function handleBack(){
    navigation.goBack();
  }

  async function handleRegistrer(){
    try{
      const schema = Yup.object().shape({
        password: Yup.string()
        .required('A senha é obrigatório'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Senhas não são idênticas")
        .required('A senha é obrigatório'),
       
      })
      await schema.validate({password, confirmPassword});
      
      await api.post('/users', {
        name: user.name,
        email: user.email,
        password: password,
        driver_license:'',
      }).then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada!',
          message: 'Agora é só fazer login\ne aproveitar.', 
          nextScreen: 'SignIn'
        })  
      })

    }catch(error){
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa, alguma informação esta errada', error.message)
      }else{
        console.log(error)
        Alert.alert('Error, na autenticação',
                    'Ocorreu um erro ao fazer cadastro, verifique as informações inseridas.')
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
            <Bullet />
            <Bullet active={true}/>
          </Steps>
        </Header>
        <Title>Crie sua{'\n'}conta</Title>
        <SubTitle>
          Faça seu cadastro de{'\n'}
          forma rápida e fácil.
        </SubTitle>
        
        <Form>
          <TitleForm>02. Senha</TitleForm>
          <PasswordInput
            iconName='lock'
            placeholder='Senha'
            onChangeText={setPassword}
            value={password}
          />

          <PasswordInput
            iconName='lock'
            placeholder='Confirmar Senha'
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </Form>
        
        <Footer>
          <Button 
            title="Cadastrar"
            enabled={true}
            loading={false}
            color={theme.colors.success}
            onPress={handleRegistrer}
          />

        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}