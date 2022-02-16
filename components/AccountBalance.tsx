import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

const AccountBalance = () => {
  return (
    <View marginT-10 paddingH-15>
      <Text style={styles.text}>SALDO DAS CONTAS</Text>
      <View center marginT-10 style={styles.card}>
        <Text style={styles.mainValue}>R$ 1.500,00</Text>
        <Text style={styles.subText}>Saldo em 14/02/2022</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#bab8b1',
    fontWeight: 'bold',
  },
  subText: {
    color: '#bab8b1',
    opacity: 0.8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  mainValue: {
    color: '#56bf0f',
    fontSize: 32,
    fontWeight: 'bold',
  }
});

export default AccountBalance;