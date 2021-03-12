import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import { MoveFinger, StartFinger, Physics, GameBorders } from "./systems";
import Entities from "../entities";
import { Ring } from "../entities/Ring";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
  Switch,
  Button,
} from "react-native";
import { ScoreBoard } from "./renderers";

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setupScreen: true,
      score: 0,
      gameEngine: null,
      entities: this.setupWorld(),
      onStart: props.onStart,
      onStop: props.onStop,
    };
  }

  onEvent = (e) => {
    if (e.type === "game-over") {
      //Alert.alert("Game Over");
      this.state.gameEngine.stop();
      this.state.onStop();
    }
  };

  reset = () => {
    this.state.gameEngine.swap(this.setupWorld());
    this.setState({ running: true });
    this.state.gameEngine.start();
  };

  startGame = () => {
    this.setState({ setupScreen: false });
    this.reset();
    this.state.onStart();
  };

  setupWorld = () => {
    let entity = Entities(null);
    return Object.assign({}, entity, {
      1: Ring({ position: [70, 200], world: entity.physics.world }),
      2: Ring({ position: [170, 200], world: entity.physics.world }),
      3: Ring({ position: [270, 200], world: entity.physics.world }),
      4: Ring({ position: [370, 200], world: entity.physics.world }),
      scoreBoard: { factor: 1, score: 0, renderer: <ScoreBoard /> },
    });
  };
  render() {
    return (
      <GameEngine
        ref={(ref) => {
          this.state.gameEngine = ref;
        }}
        style={styles.gameContainer}
        systems={[MoveFinger, Physics, StartFinger, GameBorders]}
        onEvent={this.onEvent}
        entities={this.state.entities}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
