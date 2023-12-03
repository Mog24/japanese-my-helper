import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
} from "@ui-kitten/components";
import { default as theme } from "./theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./AppNavigator";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <AppNavigator />
        <StatusBar style="light" />
      </ApplicationProvider>
    </>
  );
}
