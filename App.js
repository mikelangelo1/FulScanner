import React, { useEffect} from "react";
import { View, ActivityIndicator } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import formReducer  from "./store/reducers/formReducer";
import imageReducer from "./store/reducers/imageReducer";
import notificationReducer from "./store/reducers/notificationReducer";
import authReducer from "./store/reducers/authReducer";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from  '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function App() {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false)

  const initialLoginState = {
    isLoading:true,
    userName: null,
    userToken: null,
  };
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  
  
  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN': 
      return {
        ...prevState, 
        userToken: action.token,
        isLoading: false,
      };
      case 'LOGIN': 
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading:false,
      };
      case 'LOGOUT':
        return {
          ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
        };
        case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fdrfd);
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].userName;
      try {
        await AsyncStorage.setItem('userToken',userToken );
      } catch(e) {
        console.log(e);
      }
      // console.log(' user token ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async() => {
      //setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT'});
    },
    signUp: () => {
      // setUserToken('ffdfrd');
      //setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), [])


  //combining all the reducers into one so all components can have access to the central store
const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  notification: notificationReducer,
  image: imageReducer,
});

// creating the redux store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken}); 
    }, 1000);
  }, []);

  if ( loginState.isLoading) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }


  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext} >
        <Provider store={store}>
        <NavigationContainer theme={theme}>
          { loginState.userToken !== null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            </Drawer.Navigator>
          ) : 
            <RootStackScreen />
          }

        </NavigationContainer>
        </Provider>
      </AuthContext.Provider>
    </PaperProvider>
    
  );
}
