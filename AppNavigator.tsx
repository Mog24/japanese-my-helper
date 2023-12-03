import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { HomeScreen } from "./screens/HomeScreen";
import { CreateScreen } from "./screens/CreateScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" icon={<Icon name="home-outline" />} />
    <BottomNavigationTab
      title="Create"
      icon={<Icon name="plus-square-outline" />}
    />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Create" component={CreateScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
