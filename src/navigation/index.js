import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import AllChatRooms from "../Screens/AllChatRooms";
import Mention from "../Screens/Mention";
import Chats from "../Screens/Chat";
export default function MainNavigator() {
  const [currentUser, setCurrentUser] = useState(true);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
      return () => unsubscribe();
    }, [])

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#F87A45",
        }}
      >
        <Tab.Screen
          name="chatroom"
          component={AllChatRooms}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Mentions"
          component={Mention}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="at"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function AuthStack() {
    return (
      <View style={styles.mainNav}>
        <Stack.Navigator>
          <Stack.Screen
            name="signin"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </View>
    );
  }

  function HomeStack() {
    return (
      <View style={styles.mainNav}>
        <Stack.Navigator>
          <Stack.Screen
            name="bottomTabs"
            component={BottomTabs}
            options={{ headerShown: false, headerRight: null }}
          />
          <Stack.Screen
            name="chat"
            component={Chats}
            options={{ headerShown: false, headerRight: null }}
          />
        </Stack.Navigator>
      </View>
    );
  }

  return (
    <View style={styles.mainNav}>
      {currentUser ? <HomeStack /> : <AuthStack />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainNav: {
    flex: 1,
    justifyContent: "center",
  },
});
