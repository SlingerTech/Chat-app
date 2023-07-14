import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";

import startChatting from "../../assets/start-chatting.png";
import userImage from "../../assets/Avatar.png";
import Header from "../../component/header";
import { alreadyCreatedChatRoom } from "../../config/firebase";
import { getAllUsers, checkAndCreateRoom } from "../../config/firebase";

export default function AllChatRooms(props) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setAllUsers([]);
      const allUsers = await getAllUsers();
      setAllUsers(allUsers);
    };
    fetchData();
  }, []);

  const handleTestChange = async () => {
    await alreadyCreatedChatRoom();
  };
  return (
    <View style={styles.mainContainer}>
      <Header {...props} />
      <View style={styles.chatContainer}>
        {/* <Image style={styles.emptyChat} source={startChatting}/>
                <TouchableOpacity style={styles.startChatButton}>
                    <Text style={styles.startChatButtonText}>Start a chat!</Text>
                </TouchableOpacity>
                <Button
                    title="Testing"
                    onPress={handleTestChange}
                /> */}
        {allUsers.map((users) => {
          return (
            <TouchableOpacity
              key={users.UserId}
              onPress={() => gotoChat(users.UserId)}
              style={styles.singleProfile}
            >
              <Image source={userImage} />
              <Text>{users.userName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },
  chatContainer: {
    marginTop:50,
    height: Dimensions.get("window").height - 100,
    paddingLeft: 10
  },
  startChatButton: {
    marginTop: 15,
  },
  startChatButtonText: {
    color: "#005FFF",
    fontSize: 17,
    fontWeight: 700,
  },
  emptyChat: {
    marginLeft: 10,
  },
  singleProfile: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});
