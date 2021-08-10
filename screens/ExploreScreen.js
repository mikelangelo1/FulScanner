import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import * as BarCodeScanner from 'expo-barcode-scanner';
import { BlurView } from 'expo-blur';
import { throttle } from 'lodash';
import { Linking, Platform, StatusBar, Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Camera } from '../components/Camera';
import QRFooterButton from '../components/QRFooterButton'
import QRIndicator from '../components/QRIndicator'


const initialState = { isVisible : Platform.OS === 'ios', url: null}; 

const ExploreScreen = ({ navigation }) => {
  console.log(navigation.navigate)
  const [ state, setState ] = React.useReducer(
    (props, state) => ({...props, ...state}), initialState
  );
  const [isLit, setLit] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    if (!state.isVisible) {
      timeout = setTimeout(() => {
        setState({ isVisible: true});
      }, 800);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  React.useEffect(() => {
    if (!state.isVisible && state.url) {
      openUrl(state.url);
    }
  }, [state.isVisible, state.url]);

  const _handleBarCodeScanned = throttle(({data: url}) => {
    setState({ isVisible: false, url });
  }, 1000);

  const openUrl = (url) => {
    navigation.pop();

    setTimeout(
      () => {
        StatusBar.setBarStyle('default');
        Linking.openUrl(url);
      },
      Platform.select({
        ios: 16,
        default: 500
      })
      );
  };
  
  const onCancel = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      props.navigation.pop();
    } else {
      props.navigation.goBack();
    }
  }, []);

  const onFlashToggle = React.useCallback(() => {
    setLit(isLit => !isLit);
  }, []);

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {state.isVisible ? (
        <Camera
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={_handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
          flashMode={isLit ? 'torch' : 'off'}
          />
  ): null }

  <View style={[styles.header, { top: 40 + top}]}>
    <Hint>Scan a Fulafia QR code</Hint>
  </View>

  <QRIndicator />

  <View style={[styles.footer, { bottom: 30 + bottom}]}>
    <QRFooterButton onPress={onFlashToggle} isActive={isLit} iconName="ios-flashlight" />
    <QRFooterButton onPress={onCancel} iconName="ios-close" iconSize={48} />
  </View>

  <StatusBar barStyle="light-content" backgroundColor="#000" />
    </View>
  );
};

function Hint({ children }) {
  return (
    <BlurView style={styles.hint} intensity={100} tint="dark">
      <Text style={styles.headerText}>{children}</Text>
    </BlurView>
  );
}

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    hint: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderRadius: 16,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      backgroundColor: 'transparent',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: '10%'
    }
});