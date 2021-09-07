import React, {useContext, useState} from 'react';
import {Container, Header, TitleWreapper, Title, SignInTitle, Footer, FooterWreapper } from './styles'
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

//SVGS
import AppleSvg from '../../assets/apple.svg'
import LogoSvg from '../../assets/logo.svg'
import GoogleSvg from '../../assets/google.svg'

import {SignInSocialButton} from '../../components/SignInSocialButton'
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components'

export function SignIn(){
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, userStorageLoading } = useAuth();

  async function handleSignInWithGoogle(){
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não foi possivel conectar a conta Google');
    } 
    
  }

  return(
    <Container>
      <Header>
        <TitleWreapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)}/>
          <Title>Controle suas {'\n'} finanças de forma {'\n'} muito simples</Title>
        </TitleWreapper>
        <SignInTitle>
          Faça se login com {'\n'} uma das contas abaixo.
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWreapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          { Platform.OS == 'ios' &&
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          }
        </FooterWreapper>

        {isLoading && <ActivityIndicator color={theme.colors.shape} size={30} style={{ marginTop: 18 }} />}
      </Footer>
    </Container>
  );
}