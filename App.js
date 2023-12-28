// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Details from "./screens/Details";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Companies" component={Home} />
        <Stack.Screen name="Company's Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
