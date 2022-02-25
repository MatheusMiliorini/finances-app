import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity, Modal, Incubator, Colors, Button, Drawer } from "react-native-ui-lib";
import Account from "../models/Account";
import axios from 'axios';
import { API } from '../consts';
import MoneyInput from "../components/MoneyInput";
import { parseMoney, formatMoney } from "../utils/money";

const { TextField } = Incubator;

const Accounts = () => {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const defaultAccount: Account = { id: '', name: '', active: true, balance: 0, initialBalance: 0 };

  const [account, setAccount] = useState<Account>({ ...defaultAccount });
  const updateAccountField = <K extends keyof Account>(key: K, val: Account[K]) => {
    setAccount({
      ...account,
      [key]: val
    });
  }
  const [initialBalance, setInitialBalance] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const { data } = await axios.get<Account[]>(API + '/accounts');
      setAccounts(data.filter(d => d.active || d.active == undefined));
      setRefreshing(false);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Account }) => {
    return (
      <Drawer
        rightItems={[{ text: 'Remover', background: Colors.red40, onPress: () => deleteAccount(item), }]}
      >
        <TouchableOpacity
          onPress={() => { editItem(item) }}
          key={item.id} paddingH-10 paddingV-10 marginH-5 bg-white marginV-5
          style={{ borderRadius: 5, elevation: 3 }}
        >
          <View flex row style={{ alignItems: 'center' }}>
            <Text flex style={{ fontSize: 18 }}>{item.name}</Text>
            <Text flex style={{ fontSize: 18, textAlign: 'right' }}>{formatMoney(item.balance)}</Text>
          </View>
        </TouchableOpacity>
      </Drawer>
    )
  }

  const editItem = (item: Account) => {
    setModalVisible(true);
    setTimeout(() => {
      setAccount(item);
      setInitialBalance(formatMoney(item.initialBalance));
    }, 0);
  }

  const saveAccount = async () => {
    try {
      account.initialBalance = parseMoney(initialBalance);
      account.active = true;
      if (account.id) {
        const { data } = await axios.patch(API + `/accounts/${account.id}`, account)
      } else {
        const { data } = await axios.post(API + '/accounts', account)
      }
      fetchData();
      setModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  }

  const deleteAccount = async (account: Account) => {
    try {
      const { data } = await axios.delete(API + `/accounts/${account.id}`);
      fetchData();
      setModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View flex style={styles.bg}>

      <FlatList data={accounts} renderItem={renderItem} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
        />
      } />

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType="slide">
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <View padding-10 style={{ width: 300, borderRadius: 5, elevation: 5 }} bg-white>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{account.id ? 'Editar' : 'Criar'} Conta</Text>
            <TextField
              placeholder="Nome"
              floatingPlaceholder
              enableErrors
              validate={['required']}
              validationMessage={['Campo Obrigatório!']}
              maxLength={50}
              showCharCounter
              value={account.name}
              onChangeText={(val) => updateAccountField('name', val)}
              fieldStyle={{ borderBottomWidth: 1, borderColor: Colors.green40, paddingBottom: 4 }}
            />
            <MoneyInput
              text={initialBalance}
              setText={setInitialBalance}
            />
            <Button label="Salvar" size={Button.sizes.medium} backgroundColor={Colors.blue40} onPress={saveAccount} disabled={!account.name} />
          </View>
        </View>
      </Modal>

      <Button
        label="Nova Conta"
        outline
        marginB-10
        marginH-10
        onPress={() => { setAccount({ ...defaultAccount }); setModalVisible(true) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.grey75
  }
});

export default Accounts;