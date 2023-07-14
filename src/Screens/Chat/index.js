import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import { getAllMessages, getRoomInfo } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../component/header";

export default function Chats(props) {
  const [sendMessage, setSendMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chatRefresh, setChatRefresh] = useState(false);
  const { route: { params: { roomId } } } = props;
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = getAllMessages(roomId, setAllMessages);

    return () => {
      unsubscribe(); // Clean up the listener
    };
  }, [roomId]);

  const handleSubmission = async () => {
    await getRoomInfo({ roomId, sendMessage });
    setSendMessage("");
    setChatRefresh(!chatRefresh);
  };

  const renderMessage = (message, index) => {
    const isSentByCurrentUser = message.userId === auth.currentUser.uid;
    const messageStyle = isSentByCurrentUser ? styles.sentMessage : styles.incomingMessage;

    return (
      <View key={index} style={[styles.messageContainer, messageStyle]}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <Header {...props}/>

      <ScrollView style={styles.messageList}>
        {allMessages.map((message, index) => renderMessage(message, index))}
      </ScrollView>

      <View style={styles.formStyling}>
        <TextInput
          placeholder="Send Message"
          onChangeText={(text) => setSendMessage(text)}
          value={sendMessage}
          style={styles.input}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
            <MaterialCommunityIcons name="send" style={styles.sendIcon}/>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    borderColor: "#D3D3D3",
    borderRadius: 300,
    borderWidth: 1,
    flexGrow: 1,
    marginRight: 10,
    paddingLeft: 10
  },
  submitButton: {
    backgroundColor: '#7A7A7A',
    borderRadius: 300,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 4
  },
  messageList: {
    marginTop: 20,
    height: 600,
  },
  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "lightgray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "lightblue",
  },
  incomingMessage: {
    alignSelf: "flex-start",
  },
  formStyling: {
    flexDirection: "row",
    alignSelf: "center",
  },
  sendIcon: {
    fontSize: 20,
    color: 'white'
  }
});
