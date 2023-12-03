import React, { useState } from "react";
import {
  Divider,
  Input,
  Layout,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";

export const HomeScreen = () => {
  const [savedData, setSavedData] = useState<Data[] | null>(null);
  const [filteredData, setFilteredData] = useState<Data[] | null>(null);
  const [filterBy, setFilterBy] = useState("");

  // Read data from SecureStorage and display it
  useFocusEffect(
    React.useCallback(() => {
      const getDataFromAsyncStorage = async () => {
        const data = await SecureStore.getItemAsync("translation-data");
        // console.log("data", data);
        setSavedData(JSON.parse(data));
        setFilteredData(JSON.parse(data));
      };

      getDataFromAsyncStorage();
    }, [])
  );

  const onDeleteItem = async (id: number) => {
    try {
      const dataToStore = savedData.filter((data) => data.id !== id);
      await SecureStore.setItemAsync(
        "translation-data",
        JSON.stringify(dataToStore)
      );
      setSavedData(dataToStore);
      setFilteredData(dataToStore);
    } catch (e) {
      // saving error
      console.log("catch error", e);
    }
  };

  const onFilterChange = (text: string) => {
    setFilterBy(text);
    // restore the default if the text is empty
    if (text === "") {
      setFilteredData(savedData);
    } else {
      const textRegExp = new RegExp(text.toLowerCase());
      setFilteredData((prevData) =>
        prevData.filter((data) =>
          textRegExp.test(data.italianTranslation.toLowerCase())
        )
      );
    }
  };

  return (
    <Layout style={{ flex: 1, padding: 16, paddingTop: 36 }}>
      <Text category="h1">Home</Text>

      <Input
        value={filterBy}
        placeholder="Cerca"
        onChangeText={onFilterChange}
        style={{ marginVertical: 10 }}
      />

      {filteredData?.length > 0 ? (
        <List
          style={{ maxHeight: 600 }}
          data={filteredData}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }: { item: Data }): React.ReactElement => (
            <ListItem
              key={item.id}
              onLongPress={() => onDeleteItem(item.id)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Text style={{ fontSize: 20 }}>{item.italianTranslation}</Text>
              <Text style={{ fontSize: 20 }}>{item.kanji}</Text>
              <Text style={{ fontSize: 20 }}>{item.pronunciation}</Text>
            </ListItem>
          )}
        />
      ) : null}
    </Layout>
  );
};
