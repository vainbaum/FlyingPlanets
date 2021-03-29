import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import { Move, Press, Physics, GameBorders } from "../components/systems";
import Entities from "../entities";
import { Planet } from "../entities/Planet";
import { StyleSheet, StatusBar, BackHandler, Dimensions } from "react-native";
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

interface IGameScreenProps {
  route: { params: { factor: boolean } };
  navigation: { navigation: () => boolean | null };
  onStop: (score: number) => void;
}

export default class GameScreen extends Component<
  IGameScreenProps,
  IGameScreenState
> {
  constructor(props: IGameScreenProps) {
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
      this.state.navigation.push("GameOver", {
        score: e.score,
        factor: this.state.factor,
      });
    }
  };

  setupWorld = () => {
    let entity = Entities(null);
    let factor = this.state.factor;
    return Object.assign({}, entity, this.createPlanets(entity.physics.world), {
      scoreBoard: {
        factor: 1,
        score: 0,
        mutable: factor,
        renderer: <ScoreBoard score={0} factor={1} mutable={factor} />,
      },
    });
  };

  createPlanets = (world) => {
    const window = Dimensions.get("window");
    const startingHeight = window.height * 0.1;
    let planetEntities = {};
    for (let i = 1; i < 5; i++) {
      planetEntities[i] = Planet({
        position: [window.width * 0.2 * i, startingHeight],
        world: world,
      });
    }
    return planetEntities;
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
          source={require("../assets/images/cosmos-with-star.jpg")}
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
