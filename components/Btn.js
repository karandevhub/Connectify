import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Btn({ btnTxt, btnColor, txtColor, Press, breadth }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: btnColor,
        alignItems: "center",
        padding: 10,
        width: breadth,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      }}
      onPress={Press}
    >
      <Text style={{ color: txtColor, fontSize: 20, fontWeight: "bold" }}>
        {btnTxt}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
