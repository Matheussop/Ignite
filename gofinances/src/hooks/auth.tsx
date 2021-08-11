import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps{
  children: ReactNode
}

interface IUser{
  id: string,
  name: string,
  email: string,
  photo?: string
}

interface IAuthContextData{
  user: IUser;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@gofinances:user'

  async function signInWithGoogle(){
    try{
      const result = await Google.logInAsync({
        iosClientId: '541272048092-u4k6v5m3vfl24fr2ru51l0buf5ldssd3.apps.googleusercontent.com',
        androidClientId: '541272048092-psqjkvf8e6eo8annebs9khqgvmde3jpe.apps.googleusercontent.com',
        scopes: ['profile','email']
      })

      if(result.type === 'success'){
        const userLogged = {
          id: String(result.user.id),
          email: String(result.user.email)!,
          name: String(result.user.name)!,
          photo: String(result.user.photoUrl!)
        };

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    }catch(error){
      throw new Error(error)
    }
  } 

  async function signOut(){
    setUser({} as IUser);
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    setUserStorageLoading(true);

    async function loadUserStorageData(){
      const userStorage = await AsyncStorage.getItem(userStorageKey);
      if(userStorage){
        const userLoged = JSON.parse(userStorage) as IUser;
        setUser(userLoged);
      }
      setUserStorageLoading(false);
    }
    loadUserStorageData();
  },[])

  return(
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signOut,
      userStorageLoading
      }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider , useAuth}