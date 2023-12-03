import React, { useState } from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

export const CreateScreen = ({ navigation }) => {
  const [italianTranslation, setItalianTranslation] =
    useState<TItalianTranslation>("");
  const [kanji, setKanji] = useState<TKanji>("");
  const [pronunciation, setPronunciation] = useState<TPronunciation>("");

  // Reset values on component mounting
  useFocusEffect(
    React.useCallback(() => {
      setItalianTranslation("");
      setKanji("")
      setPronunciation("")
    }, [])
  );

  const saveData = async () => {
    // console.log("saveData", italianTranslation, kanji, pronunciation);
    if (italianTranslation !== "" && kanji !== "" && pronunciation !== "") {
      const parsedData: Data = {
        italianTranslation,
        kanji,
        pronunciation,
        id: new Date().getTime(), // this is actually unique
      };

      try {
        let dataToStore = [parsedData];
        // Append previous value
        // IF check is needed for whenever the list is empty
        const value = await SecureStore.getItemAsync("translation-data");
        if (value) dataToStore = [...dataToStore, ...JSON.parse(value)];
        await SecureStore.setItemAsync(
          "translation-data",
          JSON.stringify(dataToStore)
        );
        navigation.navigate("Home");
      } catch (e) {
        // saving error
        console.log("catch error", e);
      }
    }
  };

  console.log("CREATESCREEN");

  return (
    <Layout style={{ flex: 1, padding: 16, paddingTop: 36 }}>
      <Text category="h1" style={{ marginBottom: 16 }}>
        Create
      </Text>

      <Input
        label="Traduzione italiano"
        value={italianTranslation}
        onChangeText={(nextValue) => setItalianTranslation(nextValue)}
        style={{ marginBottom: 16 }}
      />

      <Input
        label="Kanji"
        value={kanji}
        onChangeText={(nextValue) => setKanji(nextValue)}
        style={{ marginBottom: 16 }}
      />

      <Input
        label="Pronuncia"
        value={pronunciation}
        onChangeText={(nextValue) => setPronunciation(nextValue)}
        style={{ marginBottom: 16 }}
      />

      <Button style={{ marginTop: 16 }} onPress={saveData}>
        Salva
      </Button>
    </Layout>
  );
};
