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
  Switch,
  Button,
} from "react-native";
import { ScoreBoard } from "./components/renderers";
import GameScreen from "./components/GameScreen";

class BestGameEver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setupScreen: true,
      running: false,
    };
  }

  stopGame = () => {
    this.setState({ running: false });
  };

  startGame = () => {
    this.setState({ running: true });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.running && (
          <GameScreen onStart={this.startGame} onStop={this.stopGame}/>
        )}
        {!this.state.running && (
          <TouchableOpacity
            style={styles.fullScreenButton}
            onPress={this.startGame}
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
    backgroundColor: "#fff",
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
});

export default BestGameEver;
