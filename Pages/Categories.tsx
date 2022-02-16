import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity, Modal, Incubator, Colors, Button, Drawer } from "react-native-ui-lib";
import Category from "../models/Category";
import axios from 'axios';
import { API } from '../consts';

const { TextField } = Incubator;

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [category, setCategory] = useState<Category>({ id: '', name: '', active: true });
  const updateCategoryField = <K extends keyof Category>(key: K, val: Category[K]) => {
    setCategory({
      ...category,
      [key]: val
    });
  }

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const { data } = await axios.get<Category[]>(API + '/categories');
      setCategories(data.filter(d => d.active || d.active == undefined));
      setRefreshing(false);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Category }) => {
    return (
      <Drawer
        rightItems={[{ text: 'Remover', background: Colors.red40, onPress: () => deleteCategory(item), }]}
      >
        <TouchableOpacity
          onPress={() => { setModalVisible(true); setCategory(item) }}
          key={item.id} paddingH-10 paddingV-10 marginH-5 bg-white marginV-5
          style={{ borderRadius: 5, elevation: 3 }}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </TouchableOpacity>
      </Drawer>
    )
  }

  const saveCategory = async () => {
    try {
      category.active = true;
      if (category.id) {
        const { data } = await axios.patch(API + `/categories/${category.id}`, category)
      } else {
        const { data } = await axios.post(API + '/categories', category)
      }
      fetchData();
      setModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  }

  const deleteCategory = async (category: Category) => {
    try {
      const { data } = await axios.delete(API + `/categories/${category.id}`);
      fetchData();
      setModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View flex style={styles.bg}>

      <FlatList data={categories} renderItem={renderItem} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
        />
      } />

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType="slide">
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <View padding-10 style={{ width: 300, borderRadius: 5, elevation: 5 }} bg-white>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{category.id ? 'Editar' : 'Criar'} Categoria</Text>
            <TextField
              placeholder="Nome"
              floatingPlaceholder
              enableErrors
              validate={['required']}
              validationMessage={['Campo Obrigatório!']}
              showCharCounter
              value={category.name}
              onChangeText={(val) => updateCategoryField('name', val)}
              fieldStyle={{ borderBottomWidth: 1, borderColor: Colors.green40, paddingBottom: 4 }}
            />
            <Button label="Salvar" size={Button.sizes.medium} backgroundColor={Colors.blue40} onPress={saveCategory} disabled={!category.name} />
          </View>
        </View>
      </Modal>

      <Button
        label="Nova Categoria"
        outline
        marginB-10
        marginH-10
        onPress={() => { setCategory({ id: '', name: '', parent: '', active: true }); setModalVisible(true) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.grey75
  }
});

export default Categories;