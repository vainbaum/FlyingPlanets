import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface IGameOverScreenProps {
  navigation: any;
  route: any;
}
const GameOverScreen = (props: IGameOverScreenProps) => {
  return (
    <View style={styles.fullScreen}>
      <View style={{ flex: 5 }} />
      <View style={styles.fullScreenButton}>
        <Text
          style={styles.gameOverText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Game Over
        </Text>
        <Text
          style={styles.gameOverText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Score: {props.route.params.score}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.push("Game", {factor: props.route.params.factor})}
      >
        <Text
          style={styles.gameOverText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Restart
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Setup")}
      >
        <Text
          style={styles.backToScreenText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Back to main screen
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 3 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
  },
  backToScreenText: {
    color: "white",
  },
  fullScreen: {
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  fullScreenButton: {
    flex: 1,
  },
  button: {
    backgroundColor: "midnightblue",
    flex: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
  },
});

export default GameOverScreen;
