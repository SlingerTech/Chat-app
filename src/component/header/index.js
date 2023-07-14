import React from "react";
import { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";

import userImage from "../../assets/Avatar.png";
import createChat from "../../assets/Icon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomModal from "../BottomModal";
import { logoutUser } from "../../config/firebase";
import { setUserDetails } from "../../store/slices/userSlice";


export default function Header({navigation}) {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleLogout = () => {
        logoutUser()
        dispatch(setUserDetails([]))
    };

    return(
        <View style={styles.mainHeader}>
            <View style={styles.userImage}>
                <Image source={userImage}/>
            </View>
            <View style={styles.pageName}>
                <Text style={styles.heading}>Stream Chat</Text>
            </View>
            <TouchableOpacity style={styles.createChat} onPress={openModal}>
                <Image source={createChat}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createChat} onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <BottomModal visible={modalVisible} onClose={closeModal} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        transform: 'translate(0px, 35px)',
        verticalAlign: "middle",
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        zIndex: 999,
        backgroundColor: "#f7f7f7"
    },
    heading :{
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: 'center',
    },
    pageName : {
        justifyContent: "center",
    }
})