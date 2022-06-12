import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import { colors, device, gStyle } from "../../../constants";
import { LibraryContext, UserContext } from "../../../contexts";
import { createPlaylist } from "../../../api";

// Components
import ScreenHeader from "../../../components/ScreenHeader";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import TouchText from "../../../components/TouchText";

const CreatePlaylist = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const { userPlaylists, updateUserPlaylists } = useContext(LibraryContext);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const handleNameChange = (value) => setNameInput(value);
  const handleDescriptionChange = (value) => setDescriptionInput(value);

  const handleCreatePlaylist = async () => {
    const user = await getUser();

    try {
      const response = await createPlaylist({
        userid: user.id,
        name: nameInput,
        description: descriptionInput,
      });

      if (response && response.data) {
        updateUserPlaylists([...userPlaylists, response.data.data]);
        navigation.goBack(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="New Playlist" />
      </View>
      <View style={styles.containerContent}>
        <View style={styles.formContainer}>
          <FloatingLabelInput
            label="name"
            currentValue={nameInput}
            onChangeText={handleNameChange}
          />
          <FloatingLabelInput
            label="description"
            currentValue={descriptionInput}
            inputStyle={styles.descriptionInputStye}
            onChangeText={handleDescriptionChange}
            inputProps={{ numberOfLines: 10, multiline: true }}
          />
          <TouchText
            text="Create"
            onPress={handleCreatePlaylist}
            style={[
              styles.btn,
              {
                backgroundColor: !nameInput ? colors.grey : colors.brandPrimary,
              },
            ]}
            styleText={styles.btnText}
            disabled={!nameInput ? true : false}
          />
        </View>
      </View>
    </View>
  );
};

CreatePlaylist.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  containerContent: {
    marginTop: device.iPhoneNotch ? 88 : 64,
  },
  formContainer: {
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  descriptionInputStye: {
    textAlignVertical: "top",
    paddingTop: 5,
  },
  btn: {
    borderRadius: 5,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  btnText: {
    ...gStyle.textBold18,
    color: colors.white,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default withNavigation(CreatePlaylist);
