import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Switch,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import {
  useFonts,
  MajorMonoDisplay_400Regular,
} from "@expo-google-fonts/major-mono-display";

interface ISetupScreenProps {
  route: any;
  navigation: any;
}
export const SetupScreen = ({ route, navigation }: ISetupScreenProps) => {
  const [factor, setFactor] = useState(false);
  let [fontsLoaded] = useFonts({
    MajorMonoDisplay_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return (
    <View>
      <Image
        style={style.backgroundImage}
        source={require("../assets/images/cosmos.webp")}
      />
      <View style={style.factorView}>
        <Text style={style.factorText}>Factor</Text>
        <Switch
          onValueChange={() => {
            setFactor(!factor);
          }}
          value={factor}
          style={style.fullScreenSwitch}
          trackColor={{ false: "aliceblue", true: "crimson" }}
          thumbColor="cornflowerblue"
        />
      </View>
      <View style={style.factorHelpView}>
        <Text style={style.factorText} adjustsFontSizeToFit numberOfLines={3}>
          Factor makes game harder, as objects response on finger moves becomes
          more sensetive over time. On the other hand, score over time is
          multiplied by the factor{" "}
        </Text>
      </View>
      <View style={style.highScoreButton}>
        <TouchableOpacity
          style={style.startGameButton}
          onPress={() => navigation.navigate("HighScore")}
        >
          <Text style={style.startGameText}>High Score</Text>
        </TouchableOpacity>
      </View>
      <View style={style.fullScreenButton}>
        <TouchableOpacity
          style={style.startGameButton}
          onPress={() =>
            navigation.navigate("Game", {
              factor: factor,
            })
          }
        >
          <Text style={style.startGameText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  fullScreen: {
    flexDirection: "column",
    position: "absolute",
    flex: 1,
    opacity: 0.9,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    zIndex: -1,
  },
  fullScreenButton: {
    width: "100%",
    position: "absolute",
    top: 700,
    alignItems: "center",
    borderRadius: 35,
  },
  highScoreButton: {
    width: "100%",
    position: "absolute",
    top: 600,
    alignItems: "center",
    borderRadius: 35,
  },
  middle: { flex: 1 },
  fullScreenSwitch: {
    flex: 1,
    marginLeft: 5,
  },
  startGameText: {
    color: "snow",
    fontSize: 25,
    fontFamily: "MajorMonoDisplay_400Regular",
    textAlign: "center",
  },
  factorText: {
    color: "snow",
    fontSize: 25,
    flex: 1,
    marginRight: 5,
    textAlign: "center",
  },
  factorHelpText: {
    color: "snow",
    fontSize: 16,
    flex: 1,
    textAlign: "left",
  },
  factorView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 100,
  },
  factorHelpView: {
    flexDirection: "row",
    marginTop: 10,
  },
  startGameButton: {
    borderRadius: 30,
    borderWidth: 1,
    width: "60%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "deepskyblue",
  },
});
