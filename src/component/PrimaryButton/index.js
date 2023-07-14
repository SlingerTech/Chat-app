import { TouchableOpacity, StyleSheet, Text } from "react-native";
function PrimaryButton(props){
    const {label, clickFunction} = props

    return(
        <TouchableOpacity style={styles.button} onPress={clickFunction}>
            <Text style={styles.textStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F87A45',
        alignContent: "center",
        justifyContent: "center",
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 20
    },
    textStyle: {
        color: 'white',
        textAlign: "center"
    }
})

export default PrimaryButton