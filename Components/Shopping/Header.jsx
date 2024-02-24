import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <StatusBar style="light" />
      <Text
        style={{ fontSize: 25, fontWeight: "bold", flex: 1, color: "white" }}>
        LOGO
      </Text>
      <View style={styles.search}>
        <EvilIcons
          name="search"
          size={24}
          color="white"
          style={{ marginTop: 4 }}
        />
        <TextInput
          style={{ width: "100%", color: "white" }}
          placeholder="Search..."
          placeholderTextColor="white"
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 20,
    backgroundColor: "purple",
  },
  search: {
    flexDirection: "row",
    gap: 3,
    flex: 1.5,
    borderColor: "white",
    borderWidth: 1,
    padding: 6,
    overflow: "hidden",
    borderRadius: 5,
  },
});
