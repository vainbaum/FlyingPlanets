import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { GameEngine } from "react-native-game-engine";
import { AppRegistry, StyleSheet } from "react-native";
import { Finger } from "./components/renderers";
import { MoveFinger, StartFinger, Physics } from "./components/systems";
import { registerRootComponent } from "expo";
import Entities from "./entities";
import { Ring } from "./entities/Ring";

class BestGameEver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
      score: 0,
      gameEngine: null,
    };
  }

  render() {
    let entity = Entities(null);
    return (
      <GameEngine
        ref={(ref) => {
          this.state.gameEngine = ref;
        }}
        style={styles.container}
        systems={[MoveFinger, Physics, StartFinger]}
        entities={Object.assign({}, entity, {
          1: Ring({ position: [40, 200],  world: entity.physics.world }),
          2: Ring({ position: [100, 200], world: entity.physics.world }),
          3: Ring({ position: [160, 200], world: entity.physics.world }),
          4: Ring({ position: [220, 200], world: entity.physics.world }),
          //5: Ring({ position: [280, 200], world: entity.physics.world }),
        })}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default BestGameEver;
