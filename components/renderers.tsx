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
  score: number;
  factor: number;
  mutable: boolean;
}

const Finger = (props: IProps) => {
  const x = props.body.position.x - RADIUS / 2;
  const y = props.body.position.y - RADIUS / 2;
  const style = props.pressed ? styles.pressedFinger : styles.finger;
  return <View style={[style, { left: x, top: y }]} />;
};

const ScoreBoard = (props: IScoreBoard) => {
  const score = Math.round((props.score + Number.EPSILON) * 100) / 100;
  const factor = Math.round((props.factor + Number.EPSILON) * 100) / 100;
  return (
    <View style={[styles.scoreBoard, { left: 20, top: 20 }]}>
      <Text style={styles.scoreBoardText}>Score: {score}</Text>
      {props.mutable && (
        <Text style={styles.scoreBoardText}>Factor: {factor}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  finger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "#696969",
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
    backgroundColor: "#FAFAD2",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreBoard: {
    position: "absolute",
    justifyContent: "center",
  },
  scoreBoardText: {
    color: "snow",
    textAlign: "left",
  },
});

export { Finger, ScoreBoard };
