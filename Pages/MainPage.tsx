import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import AccountBalance from "../components/AccountBalance";
import PeriodResult from "../components/PeriodResult";

const MainPage = () => {
  return (
    <View flex style={styles.bg}>
      <AccountBalance />
      <PeriodResult />
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#faf6eb'
  }
});

export default MainPage;