import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AuthLandingScreen from "../screens/misc/AuthLandingScreen";
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/auth/signup/SignUpScreen";
import Verification  from "../screens/auth/signup/Verification"

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode = 'none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="AuthLandingScreen" component={AuthLandingScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="Verification" component={Verification} />

    </RootStack.Navigator>
);

export default RootStackScreen;