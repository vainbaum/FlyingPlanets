import React from "react";
import { StyleSheet, View, Text } from "react-native";

const RADIUS = 20;

export interface IProps {
  position: number[];
  text?: number | string;
  pressed?: boolean;
body?: any;
}

export interface IScoreBoard {
	score: number,
	factor: number,
}

const Finger = (props: IProps) => {
  const x = props.body.position.x - RADIUS / 2;
  const y = props.body.position.y - RADIUS / 2;
  const style = props.pressed ? styles.pressedFinger : styles.finger;
  return (
    <View style={[style, { left: x, top: y }]}>
      <Text>{props.text}</Text>
    </View>
  );
};

const ScoreBoard = (props: IScoreBoard) => {
  const score = Math.round((props.score + Number.EPSILON) * 100) / 100;
  const factor = Math.round((props.factor + Number.EPSILON) * 100) / 100;
  return (
    <View style={[styles.scoreBoard, { left: 20, top: 20 }]}>
      <Text>Score: {score}</Text>
      <Text>Factor: {factor}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  finger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "pink",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  pressedFinger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "#4ddb73",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreBoard: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",

  }
});

export { Finger, ScoreBoard };
