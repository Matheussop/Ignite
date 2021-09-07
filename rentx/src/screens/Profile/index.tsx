import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from "@expo/vector-icons";
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

import {
   Container,
   HeaderTop,
   Header,
   Title,
   LogoutButton,
   PhotoContainer,
   Photo,
   PhotoButton,
   Content,
   Options,
   Option,
   OptionTitle,
   Section
} from './styles';
import { Input } from '../../components/Input';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';
import * as Yup from 'yup';
import { useNetInfo } from '@react-native-community/netinfo';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  
  const { user, signOut, updatedUser} = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [name, setName] = useState(user.name);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user.avatar);

  function handleBack(){
    navigation.goBack();
  }

  function handleChengeOption(value: 'dataEdit' | 'passwordEdit'){
    if(netInfo.isConnected === false && value === 'passwordEdit'){
      Alert.alert('Você esta Offline','Para mudar a senha, conecte-se a Internet')
    }else{
      setOption(value)
    }
  }

  async function handleAvatarSelect(){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
      quality: 1
    });

    if(result.cancelled){
      return;
    }
    
    if (result.uri){
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate(){
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
        .required('O nome é obrigatório')
      });

      await schema.validate({name});

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name: name,
        avatar: avatar,
        driver_license: '',
        token: user.token,
      });
  
      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa,', error.message)
      }else{
        Alert.alert('Nao foi possivel atualizar o perfil');
      }
    }
  }

  function handleSignOut(){
    Alert.alert('Tem certeza ?', 'Lembre-se, que se você sair, irá precisar de internet para conectar-se novamente.',[
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      }
    ]);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <Container>
          <StatusBar 
            backgroundColor="transparent"
            translucent
            barStyle="light-content"
          /> 
          <Header>
            <HeaderTop>
              <BackButton onPress={handleBack} color={theme.colors.shape}/>
              <Title>Editar Perfil</Title>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape}/>
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              { !!avatar && <Photo source={{uri : avatar}} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape}/>
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight()}}>
            <Options>
              <Option onPress={() => handleChengeOption('dataEdit')} active={option === 'dataEdit'}>
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option onPress={() => handleChengeOption('passwordEdit')}  active={option === 'passwordEdit'}>
                <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>
              </Option>
            </Options>
            { option === 'dataEdit'?  
              <Section >
                <Input 
                  iconName='user'
                  defaultValue={user.name}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize='sentences'
                  autoCorrect={false}
                  placeholder="Nome"
                />
                <Input 
                  iconName='mail'
                  defaultValue={user.email}
                  editable={false}
                />
              </Section>
              :
              <Section>
                <PasswordInput 
                  iconName='lock'
                  placeholder="Senha Atual"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
                <PasswordInput 
                  iconName='lock'
                  placeholder="Nova Senha"
                  value={password}
                  onChangeText={setPassword}
                />
                <PasswordInput 
                  iconName='lock'
                  placeholder="Confirmação Nova Senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </Section>
            }
          <Button title="Salvar Alterações" onPress={handleProfileUpdate}/>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}