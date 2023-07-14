import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MainNavigator from './src/navigation';
import { persistor, store } from "./src/store";
export default function App() {

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <MainNavigator/>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
