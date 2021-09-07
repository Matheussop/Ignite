import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { database } from '../database';
import api from '../services/api'
import { User as ModelUser } from '../database/models/user'
import { setDate } from 'date-fns/esm';

interface User{
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignCredencials{
  email: string;
  password: string;
}

interface AuthContextData{
  user: User;
  signIn: (credential: SignCredencials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps{
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const [data, setData] = useState<User>({} as User);
  const [loading,setLoading] = useState(true);

  async function signIn( {email, password}: SignCredencials){
    try{

      const response = await api.post('/sessions', {email: email, password: password})

      const {token, user} = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.avatar = user.avatar,
          newUser.driver_license = user.driver_license,
          newUser.token  = token
        })
      })
      setData({...user, token})
    }catch(error: any){
      throw new Error(error)
    }
  }

  async function signOut(){
    try{
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      })

      setData({} as User)
    }catch(error: any){
      throw new Error(error)
    }
  }

  async function updatedUser(user: User){
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(( userData) => {
          userData.name = user.name;
          userData.avatar = user.avatar
        });
      })
      setData(user);
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserData(){
      const usersCollection = database.get<ModelUser>('users');
      const user = await usersCollection.query().fetch();
      if(user.length > 0){
        const userData = user[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData)
      }
      setLoading(false);
    }

    loadUserData();
  }, [])


  return (
    <AuthContext.Provider 
      value={{
        user: data,
        signIn,
        signOut,
        updatedUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };