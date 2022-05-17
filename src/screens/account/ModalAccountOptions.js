import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { device, gStyle, colors, fonts } from "../../constants";
import ModalHeader from "../../components/ModalHeader";
import { PlayingContext, ScreenContext, UserContext } from "../../contexts";

// components
import LineItemCategory from "../../components/LineItemCategory";

// mock data
import accountOptions from "../../mockdata/menuAccountOptions.json";

const ModalAccountOptions = ({ navigation }) => {
  const connector = useWalletConnect();
  const { updateShowTabBarState, resetScreenData } = useContext(ScreenContext);
  const { resetSongData } = useContext(PlayingContext);
  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack(null);
      updateShowTabBarState(true);
      return true;
    });

    return () => BackHandler.removeEventListener("hardwareBackPress", true);
  });

  return (
    <React.Fragment>
      <SafeAreaView style={styles.containerSafeArea}>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              "Disconnect Your Wallet?",
              "You won't be able to Use This Player.",
              [
                { text: "Cancel" },
                {
                  onPress: () => {
                    connector.killSession();
                    resetScreenData();
                    resetSongData();
                    clearUser();
                  },
                  text: "Disconnect",
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <View style={styles.containerButton}>
            <Text style={styles.buttonText}>Disconnect Wallet</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[gStyle.flex1, gStyle.pB80]}
        showsVerticalScrollIndicator={false}
        style={[gStyle.container, styles.transparent]}
      >
        <ModalHeader
          left={<Feather color={colors.brandPrimary} name="chevron-down" />}
          leftPress={() => {
            navigation.goBack(null);
            updateShowTabBarState(true);
          }}
          text={"Your Account"}
        />
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.image}
            />
          </View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            Your Account
          </Text>
          {/* <Text style={styles.albumInfo}>
            {`Album by ${album.artist} · ${album.released}`}
          </Text> */}
        </View>

        {Object.keys(accountOptions).map((index) => {
          const item = accountOptions[index];

          return (
            <LineItemCategory
              key={item.id}
              disableRightSide
              icon={item.icon}
              iconLibrary={item.lib}
              onPress={() => null}
              title={item.title}
            />
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
};

ModalAccountOptions.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  containerSafeArea: {
    ...gStyle.containerAbsolute,
    backgroundColor: colors.blackBlur,
  },
  containerButton: {
    ...gStyle.flexCenter,
    ...gStyle.spacer6,
    height: 70,
  },
  buttonText: {
    color: colors.red,
    fontSize: 20,
    fontWeight: "bold",
  },
  transparent: {
    backgroundColor: colors.black80,
  },
  container: {
    alignItems: "center",
    paddingTop: device.iPhoneNotch ? 94 : 50,
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  image: {
    height: 148,
    marginBottom: 16,
    width: 148,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  albumInfo: {
    color: colors.greyInactive,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginBottom: 48,
  },
});

export default ModalAccountOptions;
