import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants";

const FloatingLabelInput = ({
  label,
  currentValue,
  onChangeText,
  inputProps,
  inputStyle,
  multiline,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: "absolute",
    left: 10,
    top: isFocused ? 0 : 18,
    fontSize: isFocused ? 15 : 20,
    color: isFocused ? colors.brandPrimary : colors.greyInactive,
    zIndex: !isFocused ? (currentValue ? 0 : 1000) : 1000,
  };
  return (
    <View style={styles.container}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        {...inputProps}
        onChangeText={(value) => onChangeText(value)}
        style={[styles.textInput, inputStyle]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 18, marginVertical: 10 },
  textInput: {
    minHeight: 40,
    fontSize: 15,
    color: "#fff",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.brandPrimary,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
});

export default FloatingLabelInput;
