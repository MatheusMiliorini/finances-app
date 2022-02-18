import axios from "axios";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import AccountBalance from "../components/AccountBalance";
import PeriodResult from "../components/PeriodResult";
import { API } from "../consts";
import { Account } from "../models/Account";

const MainPage = () => {

  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBalance = async () => {
    setRefreshing(true);
    const { data } = await axios.get<Account[]>(API + '/accounts')
    let balance = 0;
    data.forEach(acc => {
      balance += acc.balance;
    });
    setBalance(balance);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchBalance();
  }, []);


  return (
    <View flex style={styles.bg}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchBalance} refreshing={refreshing} />
        }
      >
        <AccountBalance balance={balance} />
        <PeriodResult />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#faf6eb',
  }
});

export default MainPage;