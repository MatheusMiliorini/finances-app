import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

const PeriodResult = () => {
  return (
    <View marginV-10 paddingH-15>
      <Text style={styles.text}>RESULTADO DO PERÍODO</Text>
      <View marginT-10 style={styles.card}>
        <View paddingH-10 paddingT-15 row>
          <Text flex style={styles.font18}>Entradas</Text>
          <Text flex style={{ ...styles.font18, ...styles.right }}>R$ 1.234,56</Text>
        </View>
        <View paddingH-10 marginT-10 row>
          <Text flex style={styles.font18}>Saídas</Text>
          <Text flex style={{ ...styles.font18, ...styles.right }}>R$ 1.234,56</Text>
        </View>
        <View marginT-10 row style={{ borderTopWidth: 1, borderColor: '#bab8b1' }}>
          <Text flex right style={styles.mainValue}>R$ 5.000,00</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#bab8b1',
    fontWeight: 'bold',
  },
  font18: {
    fontSize: 18
  },
  right: {
    textAlign: 'right',
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
    textAlign: 'right',
    color: '#56bf0f',
    fontSize: 22,
    fontWeight: 'bold',
  }
});

export default PeriodResult;