import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import { Move, Press, Physics, GameBorders } from "../components/systems";
import Entities from "../entities";
import { Ring } from "../entities/Ring";
import { StyleSheet, StatusBar, BackHandler } from "react-native";
import { ScoreBoard } from "../components/renderers";
import { Image } from "react-native";

interface IGameScreenState {
  score: number;
  factor: boolean;
  gameEngine: any;
  onStop: (score: number) => void;
  entities: any;
  navigation: any;
}

export default class GameScreen extends Component<any, IGameScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      factor: props.route.params.factor,
      gameEngine: null,
      onStop: props.onStop,
      entities: {},
      navigation: props.navigation,
    };
    this.state.entities = this.setupWorld();
  }

  goBack = () => {
    this.state.navigation.navigate("Setup");
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  onEvent = (e: { type: string; score: number }) => {
    if (!e) {
      return;
    }
    if (e.type === "game-over") {
      //Alert.alert("Game Over");
      this.state.gameEngine.stop();
      this.state.onStop(e.score);
      this.state.navigation.push("GameOver", { score: e.score, factor: this.state.factor });
    }
  };

  setupWorld = () => {
    let entity = Entities(null);
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
        renderer: <ScoreBoard score={0} factor={1} mutable={factor} />,
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
        systems={[Move, Physics, Press, GameBorders]}
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
