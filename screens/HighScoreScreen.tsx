import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {IPlace} from "./GameOverScreen";

const HighScoreScreen = (props: any) => {
  return (
    <View style={styles.fullScreen}>
      {props.route.params.highScore.map((score: IPlace, index: number) => {
        let style = styles.other;
        if (index == 0) {
          style = styles.gold;
        } else if (index == 1) {
          style = styles.silver;
        } else if (index == 2) {
          style = styles.bronze;
        }
        const medal = <View style={[style, styles.medal]} />;
        return (
          <View style={styles.scoreView} key={index}>
            {medal}
            <Text
              style={styles.highScoreText}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {score.name}: {score.score}
            </Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Setup")}
      >
        <Text style={{ color: "white" }} adjustsFontSizeToFit numberOfLines={1}>
          Back to main screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  medal: {
    borderRadius: 25,
    width: 25,
    height: 25,
    justifyContent: "center",
marginTop: 15,
  },
  gold: {
    color: "white",
    backgroundColor: "darkgoldenrod",
  },
  silver: {
    color: "black",
    backgroundColor: "silver",
  },
  bronze: {
    color: "white",
    backgroundColor: "orangered",
  },
  other: {
    color: "white",
  },
  highScoreText: {
    color: "beige",
    fontSize: 40,
  },
  fullScreen: {
    backgroundColor: "black",
    opacity: 0.8,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  fullScreenButton: {
    flex: 1,
  },
  scoreView: {
    width: "60%",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "steelblue",
    flex: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
    height: 50,
    position: "absolute",
    bottom: 70,
  },
});

export default HighScoreScreen;
