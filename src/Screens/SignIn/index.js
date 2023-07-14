import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";

import PrimaryButton from "../../component/PrimaryButton";
import { loginUser } from "../../config/firebase";

function SignIn({navigation}){
    const [showPassword, setShowPassword] = useState(true)
    const [collectFormData, setCollectFormData] = useState({
        email: '',
        password: ''
    })

    const getFormField = (key, value) => {
        setCollectFormData({...collectFormData, [key]: value})
    }

    const handlePasswordEye = () => {
        setShowPassword(!showPassword)
    }

    const submitionHandling = async() => {
        const response = await loginUser(collectFormData)
        if(response.status === 'error'){
            console.log('Firebase error from signin', response.error)
        }
        else{
            alert('Successful LoggedIn')
        }
        
    }

    return(
        <ScrollView>
            <View style={styles.signinContainer}>
                <View style={styles.signFormHeadingIcon}>
                    <Text style={styles.signinHeading}>SignIn</Text>
                </View>
                <View style={styles.signInForm}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                        placeholder="johndoe@gmail.com"
                        keyboardType="email-address"
                        onChangeText={(text) => getFormField('email', text)}
                        value={collectFormData.email}
                        style={styles.input}
                    />
                
                    <Text style={styles.formLabel}>Password</Text>
                    <View style={styles.passwordView}>
                        <TextInput
                            placeholder="**********"
                            secureTextEntry={showPassword}
                            onChangeText={(text) => getFormField('password', text)}
                            value={collectFormData.password}
                            style={styles.input}
                        />
                        {/* <TouchableOpacity style={styles.passwordEye} onPress={handlePasswordEye}>
                            <Image source={eye} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.emptySpace}/>
                    <PrimaryButton style={styles.submitButton} clickFunction={submitionHandling} label={'SignIn'}/> 
                    <TouchableOpacity style={styles.signupButton} onPress={() => navigation.push('signup')}>
                        <Text>New User? Signup with us</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    signinContainer: { 
        padding: 10,
        paddingTop: 20,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        height: Dimensions.get("window").height
    },
    signupButton: {
        alignItems: "center",
        marginTop: 10
    },
    signinHeading: {
        fontSize: 30,
        fontWeight: 600,
    },
    signInLogo: {
        alignContent: "center",
        justifyContent: "center",
        paddingLeft: '30%'
    },
    otherLoginButtons: {
        marginTop: 30,
        alignItems: "center"
    },
    logo: {
        alignItems: "center",
    },
    subHeading: {
        color: '#F87A45',
        fontSize: 13
    },
    signFormHeadingIcon: {
        marginTop: 50,
        flexDirection: "row",
    },
    graduatIcon: {
        marginLeft: 20
    },
    signInForm: {
        marginTop: 20,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        marginBottom: 16,
        borderRadius: 13,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 10
    },
    emptySpace: {
        marginTop: 10
    },
    passwordView: {
        position: "relative"
    },
    passwordEye: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SignIn