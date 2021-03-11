import React, { PureComponent } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { GameEngine } from "react-native-game-engine";
import { AppRegistry } from "react-native";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Finger } from "./components/renderers";
import {
  MoveFinger,
  StartFinger,
  Physics,
  GameBorders,
} from "./components/systems";
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
  onEvent = (e) => {
    if (e.type === "game-over") {
      Alert.alert("Game Over");
      this.setState({
        running: false,
      });
    }
  };

  reset = () => {
    this.setState({ running: true });
  };

  render() {
    let entity = Entities(null);
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => {
            this.state.gameEngine = ref;
          }}
          style={styles.gameContainer}
          systems={[MoveFinger, Physics, StartFinger, GameBorders]}
          onEvent={this.onEvent}
          entities={Object.assign({}, entity, {
            1: Ring({ position: [40, 200], world: entity.physics.world }),
            2: Ring({ position: [100, 200], world: entity.physics.world }),
            3: Ring({ position: [160, 200], world: entity.physics.world }),
            4: Ring({ position: [220, 200], world: entity.physics.world }),
            //5: Ring({ position: [280, 200], world: entity.physics.world }),
            rnGameEngine: this.state.gameEngine,
          })}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        {!this.state.running && (
          <TouchableOpacity
            style={styles.fullScreenButton}
            onPress={this.reset}
          >
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    gameOverText: {
        color: 'white',
        fontSize: 48
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    }
});

export default BestGameEver;
