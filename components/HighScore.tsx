import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HighScoreScreen = (props: any) => {
  return (
    <View style={styles.fullScreen}>
      {props.route.params.highScore.map((score: number, index: number) => {
        let style = styles.otherPlace;
        if (index == 0) {
          style = styles.goldPlace;
        } else if (index == 1) {
          style = styles.silverPlace;
        } else if (index == 2) {
          style = styles.bronzePlace;
        }
        return (
          <View style={styles.scoreView} key={index}>
            <Text style={style} adjustsFontSizeToFit numberOfLines={1}>
              {score}
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
  goldPlace: {
    color: "white",
    fontSize: 40,
    backgroundColor: "darkgoldenrod",
    borderRadius: 20,
    width: "100%",
    textAlign: "center",
  },
  silverPlace: {
    color: "black",
    fontSize: 40,
    backgroundColor: "silver",
    borderRadius: 20,
    width: "100%",
    textAlign: "center",
  },
  bronzePlace: {
    color: "white",
    fontSize: 40,
    backgroundColor: "orangered",
    borderRadius: 20,
    width: "100%",
    textAlign: "center",
  },
  otherPlace: {
    color: "white",
    textAlign: "center",
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
