import React from "react";
import { View, Button, Switch, Text, StyleSheet } from "react-native";

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
    <View style={style.fullScreen}>
      <View style={style.fullScreenButton}>
        <Button title="Start Game" onPress={startGame} />
      </View>
      <View style={style.middle}>
        <Text>Factor</Text>
      </View>
      <View style={style.fullScreenSwitch}>
        <Switch
          trackColor={{ false: "#767577", true: "#1b38a1" }}
          thumbColor={factor ? "#f5dd4b" : "#570957"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleFactor}
          value={factor}
        />
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
  fullScreenButton: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
  },
  middle: { flex: 1 },
  fullScreenSwitch: {
    flex: 1,
    backgroundColor: "gray",
    opacity: 1,
    alignSelf: "stretch",
  },
});
