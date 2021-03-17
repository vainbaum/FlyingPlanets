import React from "react";
import {
  View,
  TouchableOpacity,
  Switch,
  Text,
  StyleSheet,
  Image,
} from "react-native";

interface ISetupScreenProps {
  factor: boolean;
  toggleFactor: () => void;
  startGame: () => void;
}
export const SetupScreen = ({
  factor,
  toggleFactor,
  startGame,
}: ISetupScreenProps) => {
  return (
    <View>
      <Image
        style={style.backgroundImage}
        source={require("../assets/images/cosmos.webp")}
      />
      <View style={style.fullScreenButton}>
        <TouchableOpacity style={style.startGameButton} onPress={startGame}>
          <Text style={style.startGameText}>Start Game</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.factorText}>Factor</Text>
        <View style={style.fullScreenSwitch}>
          <Switch onValueChange={toggleFactor} value={factor} />
        </View>
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
    position: "relative",
    top: 700,
    alignItems: "center",
    borderRadius: 35,
  },
  middle: { flex: 1 },
  fullScreenSwitch: {
    opacity: 1,
    width: "40%",
    backgroundColor: "goldenrod",
  },
  startGameText: {
    color: "snow",
    fontSize: 25,
  },
  factorText: {
    color: "snow",
    fontSize: 25,
    width: "40%",
  },
  startGameButton: {
    borderRadius: 30,
    borderWidth: 1,
    width: "60%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "chocolate",
  },
});
