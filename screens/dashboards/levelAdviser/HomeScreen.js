// import React, { useState, useEffect } from "react";
// import { View, Text,Vibration, Button, StyleSheet, StatusBar, Alert, TouchableOpacity } from "react-native";
// import { useTheme } from "@react-navigation/native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { LinearGradient } from "expo-linear-gradient";


// const HomeScreen = ({ navigation }) => {

//     const { colors } = useTheme();

//     const theme = useTheme();
    
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [scannedItem, setScannedItem] = useState({
//    type:'',
//     data: '',

//   });

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//        setHasPermission(status === "granted");
//       await resetScanner();
//     })();
//   }, []);

//   const renderAlert= (title, message) =>{
//     Alert.alert(
//       title,
//       message,
//       [
//         { text: 'OK', onPress: () => resetScanner() },
//       ],
//       { cancelable: true }
//     );
//   }
//   const onBarCodeRead= ({ type, data } )=> {
//     if ((type === scannedItem.type && data === scannedItem.data) || data === null) {
//       return;
//     }

//     Vibration.vibrate();
//     setScannedItem({ scannedItem: { data, type } });
//     if (type.startsWith('https://www.qrcode-monkey.com')) {
//       // Do something for EAN
//       console.log(`EAN scanned: ${data}`);
//       resetScanner();
//       navigation.navigate('ProfileScreen', { ean: data });
//     } else if (type.startsWith('org.iso.QRCode')) {
//       // Do samething for QRCode
//       console.log(`QRCode scanned: ${data}`);
//       resetScanner();
//     } else {
//       renderAlert(
//         'This barcode is not supported.',
//         `${type} : ${data}`,
//       );
//     }
//   }

//   const renderMessage= ()=> {
//     if (scannedItem && scannedItem.type) {
//       const { type, data } = scannedItem;
//       return (
//         <Text style={styles.scanScreenMessage}>
//           {`Scanned \n ${type} \n ${data}`}
//         </Text>
//       );
//     }
//     return <Text style={styles.scanScreenMessage}>Focus the barcode to scan.</Text>;
//   }

//   const resetScanner =()=> {
//     SetScanned = null;
//     setScannedItem({
//         type: null,
//         data: null
//       }
//     );
//   }

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>
//   //  return Alert.alert(
//   //     "Grant permission!",
//   //     "Requesting Permission to camera.",
//   //     [{ text: "Okay" }]
//   //   );
    
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   //  return Alert.alert(
//   //     "No access Granted!",
//   //     "Permission  not granted.",
//   //     [{ text: "Okay" }]
//   //   );
    
//   }
 

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
//       {/* <Button title="Scan"  onPress={() => navigation.navigate("Details")} /> */}
//        <BarCodeScanner
      
//         onBarCodeScanned={onBarCodeRead}
//         style={StyleSheet.absoluteFill}
//       > 
//         <View style={styles.layerTop} />
//       <View style={styles.layerCenter}>
//         <View style={styles.layerLeft} />
//         <View style={styles.focused} />
//         <View style={styles.layerRight} />
//       </View>
//       <View style={styles.layerBottom} />
//       </BarCodeScanner>
//        {scanned && (
//       <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
//      )} 
      
//       {scanned && (<View style={styles.button}>
//           <TouchableOpacity
//             style={styles.signIn}
//             onPress={() => {
//               navigation.navigate("Details");
//             }}
//           >
//             <LinearGradient
//               colors={["#08d4c4", "#01ab9d"]}
//               style={styles.signIn}
//             >
//               <Text
//                 style={[
//                   styles.textSign,
//                   {
//                     color: "#fff",
//                   },
//                 ]}
//               >
//                 Scan
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>)}
      
      
//     </View>
//   );
// };

// export default HomeScreen;

// const opacity = 'rgba(0, 0, 0, .6)';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column', 
//     justifyContent: 'center'
//   },
//   layerTop: {
//     flex: 2,
//     backgroundColor: opacity
//   },
//   layerCenter: {
//     flex: 1,
//     flexDirection: 'row'
//   },
//   layerLeft: {
//     flex: 1,
//     backgroundColor: opacity
//   },
//   focused: {
//     flex: 10
//   },
//   layerRight: {
//     flex: 1,
//     backgroundColor: opacity
//   },
//   layerBottom: {
//     flex: 2,
//     backgroundColor: opacity
//   },
//   signIn: {
//     width: "100%",
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   textSIgn: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });



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
  console.log(navigation)
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
  React.useEffect(() => {
    console.log(navigation)
    if (!state.isVisible && state.url) {
      console.log(state)
      openUrl(state.url);
    }
  }, [state.isVisible, state.url]);

  const _handleBarCodeScanned = throttle(({data: url}) => {
    setState({ isVisible: false, url });
  }, 1000);

 
  
  const onCancel = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      navigation.pop();
    } else {
      navigation.goBack();
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

