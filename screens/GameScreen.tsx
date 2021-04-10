import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import { World } from "matter-js";
import {
  Move,
  Press,
  Physics,
  GameBorders,
  GameEntities,
  IPlanets,
} from "../components/systems";
import Entities from "../entities";
import { Planet } from "../entities/Planet";
import { StyleSheet, StatusBar, BackHandler, Dimensions } from "react-native";
import { ScoreBoard } from "../components/renderers";
import { Image, View } from "react-native";
import { commonStyles } from "../styles/common";

interface IGameScreenState {
  score: number;
  factor: boolean;
  gameEngine: any;
  onStop: (score: number) => void;
  entities: GameEntities | {};
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
      entities: this.setupWorld(props.route.params.factor),
      navigation: props.navigation,
    };
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
      this.state.gameEngine.stop();
      this.state.onStop(e.score);
      this.state.navigation.push("GameOver", {
        score: e.score,
        factor: this.state.factor,
      });
    }
  };

  setupWorld = (factor: boolean): GameEntities => {
    let entity = Entities(null);
    return Object.assign({}, entity, this.createPlanets(entity.physics.world), {
      scoreBoard: {
        factor: 1,
        score: 0,
        mutable: factor,
        renderer: <ScoreBoard score={0} factor={1} mutable={factor} />,
      },
    });
  };

  createPlanets = (world: World): IPlanets => {
    const window = Dimensions.get("window");
    const startingHeight = window.height * 0.1;
    let planetEntities: IPlanets = {};
    let i = 1;
    while (i <= 4) {
      planetEntities[i] = Planet({
        position: [window.width * 0.2 * i, startingHeight],
        world: world,
      });
      i++;
    }
    return planetEntities;
  };

  render() {
    return (
      <View style={[commonStyles.fullscreen, {justifyContent: "center"}]}>
        <GameEngine
          ref={(ref) => {
            this.state.gameEngine = ref;
          }}
          systems={[Move, Physics, Press, GameBorders]}
          onEvent={this.onEvent}
          entities={this.state.entities}
        >
          <Image
            style={commonStyles.backgroundImage}
            source={require("../assets/images/cosmos-with-star.jpg")}
          />
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}
