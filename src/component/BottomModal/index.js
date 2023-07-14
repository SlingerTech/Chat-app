import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { getAllUsers, checkAndCreateRoom } from "../../config/firebase";

import { useEffect, useState } from "react";
import userImage from "../../assets/Avatar.png";

function BottomModal(props) {
  const [allUsers, setAllUsers] = useState([]);

  const { visible, onClose, navigation } = props;

  useEffect(() => {
    const fetchData = async () => {
      setAllUsers([]);
      const allUsers = await getAllUsers();
      setAllUsers(allUsers);
    };
    fetchData();
  }, []);

  gotoChat = async (id) => {
    const room = await checkAndCreateRoom(id);
    console.log("roomId from card", room.roomId);
    navigation.push("chat", { roomId: room.roomId });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.profiles}>
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
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default BottomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    height: Dimensions.get('window').height - 500,
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "#000",
    position: "absolute",
    right: 15,
    top: 10,
    padding: 10,
    borderRadius: 200,
  },
  closeIcon: {
    fontSize: 15
  },
  profiles: {
    flexDirection: "row",
    marginTop: 50
  },
  singleProfile: {
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    flexGrow: 1
  },
});
