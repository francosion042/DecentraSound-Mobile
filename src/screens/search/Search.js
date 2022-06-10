/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, Fragment, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle, func } from "../../constants";
import { ScreenContext, SearchContext } from "../../contexts";
import { getGenres } from "../../api";
import Loading from "../../components/Loading";

// components
import PlaylistItem from "../../components/PlaylistItem";
// import TouchIcon from "../../components/TouchIcon";

// icons
import SvgSearch from "../../components/icons/Svg.Search";

const Search = ({ navigation }) => {
  const { updateShowTabBarState } = useContext(ScreenContext);
  const { genres, updateGenres } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleGenres = async () => {
    try {
      const response = await getGenres();
      if (response && response.data.data) {
        updateGenres(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (genres.length !== 0) {
      setIsLoading(false);
    }
    handleGenres();
  }, []);

  const [scrollY] = useState(new Animated.Value(0));
  const [searchStart] = useState(device.width - 48);
  const [searchEnd] = useState(searchStart - 40);

  const opacity = scrollY.interpolate({
    inputRange: [0, 48],
    outputRange: [searchStart, searchEnd],
    extrapolate: "clamp",
  });

  return (
    <Fragment>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        style={gStyle.container}
      >
        <View style={gStyle.spacer11} />
        <View style={styles.containerSearchBar}>
          <Animated.View style={{ width: opacity }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate("Searching")}
              style={styles.searchPlaceholder}
            >
              <View style={gStyle.mR1}>
                <SvgSearch />
              </View>
              <Text style={styles.searchPlaceholderText}>
                Artists, songs or Albums
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Text style={styles.sectionHeading}>Browse all</Text>
        <View style={styles.containerRow}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Loading />
            </View>
          ) : (
            genres.map((genre) => {
              return (
                <View key={genre.id} style={styles.containerColumn}>
                  <PlaylistItem
                    bgColor={func.getRandomColor()}
                    onPress={() =>
                      navigation.navigate("Albums", {
                        albums: genre.albums,
                        heading: `Popular ${genre.title} Albums `,
                      })
                    }
                    title={genre.title}
                  />
                </View>
              );
            })
          )}
        </View>
      </Animated.ScrollView>

      <View style={styles.iconRight}>
        <TouchableOpacity
          onPress={() => {
            updateShowTabBarState(false);
            navigation.navigate("ModalAccountOptions");
          }}
        >
          <FontAwesome
            color={colors.brandPrimary}
            name="user-circle-o"
            size={28}
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  containerSearchBar: {
    ...gStyle.pH3,
    backgroundColor: colors.blackBg,
    paddingBottom: 16,
    paddingTop: device.iPhoneNotch ? 64 : 24,
  },
  searchPlaceholder: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: "row",
    paddingLeft: 16,
    paddingVertical: 16,
  },
  searchPlaceholderText: {
    ...gStyle.text16,
    color: colors.blackBg,
  },
  sectionHeading: {
    ...gStyle.textBold18,
    color: colors.white,
    marginBottom: 24,
    marginLeft: 24,
    marginTop: 16,
  },
  containerRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 24,
  },
  containerColumn: {
    width: "50%",
  },
  iconRight: {
    alignItems: "center",
    height: 28,
    justifyContent: "center",
    position: "absolute",
    right: 24,
    top: device.web ? 40 : device.iPhoneNotch ? 75 : 40,
    width: 28,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "50%",
  },
});

export default Search;
