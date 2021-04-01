import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Switch,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";

import {commonStyles} from "../styles/common";
import fontStyles from "../styles/font-styles";


interface ISetupScreenProps {
  route: any;
  navigation: any;
}
export const SetupScreen = ({ route, navigation }: ISetupScreenProps) => {
  const [factor, setFactor] = useState(false);
  return (
    <View>
      <Image
        style={commonStyles.backgroundImage}
        source={require("../assets/images/cosmos.webp")}
      />
      <View style={style.factorView}>
        <Text style={fontStyles.settingsText}>Factor</Text>
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
        <Text style={fontStyles.helpText} adjustsFontSizeToFit numberOfLines={3}>
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
          <Text style={fontStyles.gameButtonText}>High Score</Text>
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
          <Text style={fontStyles.gameButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const window = Dimensions.get("window");

const style = StyleSheet.create({
  fullScreenButton: {
    width: "100%",
    position: "absolute",
    top: window.height * 0.8,
    alignItems: "center",
    borderRadius: 35,
  },
  highScoreButton: {
    width: "100%",
    position: "absolute",
    top: window.height * 0.7,
    alignItems: "center",
    borderRadius: 35,
  },
  middle: { flex: 1 },
  fullScreenSwitch: {
    flex: 1,
    marginLeft: 5,
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
