import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import startChatting from '../../assets/start-chatting.png';
import Header from "../../component/header";

export default function Mention(){
    return(
        <View style={styles.mainContainer}>
            <Header/>
            <View style={styles.chatContainer}>
                <Image style={styles.emptyChat} source={startChatting}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
    },
    chatContainer: {
        verticalAlign: "middle",
        justifyContent: "center",
        height: Dimensions.get('window').height - 100,
        
    },
    emptyChat: {
        marginLeft: 10
    }
})