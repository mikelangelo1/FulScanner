import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={StyleSheet.container}>
      <Text>Details Screen</Text>
      <Button title="Details" onPress={() => navigation.push("Details")} />
      <Button title=" Go to home" onPress={() => {
          navigation.goBack()
      }} />

    </View>
  );
};


export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});