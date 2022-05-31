import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors, device } from "../../constants";

// Components
import TouchIcon from "../../components/TouchIcon";

const Searching = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TouchIcon
          icon={<Feather color={colors.white} name="chevron-left" />}
          onPress={() => navigation.goBack(null)}
          style={styles.backIcon}
        />
        <TextInput
          style={styles.input}
          autoFocus={true}
          onChangeText={(searchString) => {
            console.log(searchString);
          }}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: device.iPhoneNotch ? 64 : 24,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#424242",
    width: "90%",
    height: 60,
    borderRadius: 5,
    alignSelf: "center",
  },
  backIcon: {
    padding: 10,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: "90%",
    backgroundColor: "#424242",
    color: "#fff",
  },
});

export default Searching;
