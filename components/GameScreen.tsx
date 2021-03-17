import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import { MoveFinger, StartFinger, Physics, GameBorders } from "./systems";
import Entities from "../entities";
import { Ring } from "../entities/Ring";
import { StyleSheet, StatusBar, BackHandler } from "react-native";
import { ScoreBoard } from "./renderers";
import { Image } from "react-native";

interface IGameScreenState {
  setupScreen: boolean;
  score: number;
  factor: boolean;
  gameEngine: any;
  onBack: () => boolean;
  onStart: () => void;
  onStop: () => void;
  entities: any;
}

export default class GameScreen extends Component<any, IGameScreenState> {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      setupScreen: true,
      score: 0,
      factor: props.factor,
      gameEngine: null,
      onStart: props.onStart,
      onStop: props.onStop,
      onBack: props.onBack,
      entities: {},
    };
    this.state.entities = this.setupWorld();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.state.onBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.state.onBack);
  }

  onEvent = (e) => {
    if (!e) {
      return;
    }
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
    console.log(this.state);
    let factor = this.state.factor;
    return Object.assign({}, entity, {
      1: Ring({ position: [70, 200], world: entity.physics.world }),
      2: Ring({ position: [170, 200], world: entity.physics.world }),
      3: Ring({ position: [270, 200], world: entity.physics.world }),
      4: Ring({ position: [370, 200], world: entity.physics.world }),
      scoreBoard: {
        factor: 1,
        score: 0,
        mutable: factor,
        renderer: <ScoreBoard />,
      },
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
        <Image
          style={styles.backgroundImage}
          source={require("../assets/images/cosmos.webp")}
        />
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    zIndex: -1,
  },
});
