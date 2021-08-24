import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import SignInScreen from './SignInScreen';
import SignUpScreen from './auth/signup/SignUpScreen';
import AuthLandingScreen from './misc/AuthLandingScreen';
import Verification  from './auth/signup/Verification';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => (
    <AuthStack.Navigator headerMode = 'none'>
        <AuthStack.Screen name="AuthLandingScreen" component={AuthLandingScreen} />
        <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
        <AuthStack.Screen name="Verification" component={Verification} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </AuthStack.Navigator>
);

export default AuthStackScreen;