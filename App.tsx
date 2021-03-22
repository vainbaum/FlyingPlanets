import React from "react";
import GameScreen from "./screens/GameScreen";
import { SetupScreen } from "./screens/SetupScreen";
import GameOverScreen from "./screens/GameOverScreen";
import HighScoreScreen from "./screens/HighScoreScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

interface IAppState {
  factor: boolean;
  score: number;
  highScore: number[];
}

class BestGameEver extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      factor: false,
      score: 0,
      highScore: [],
    };
  }

  componentDidMount() {
    this.readData().then((highScore) =>
      this.setState({ highScore: highScore })
    );
  }

  readData = async () => {
    try {
      const highScore = await AsyncStorage.getItem("@highScore");
      if (highScore == null) {
        return [];
      }
      return JSON.parse(highScore);
    } catch (e) {
      return [];
    }
  };

  stopGame = (score: number) => {
    const highScore = this.setHighScore(score);
    AsyncStorage.setItem("@highScore", JSON.stringify(this.state.highScore));
    this.setState({ score: score, highScore: highScore });
  };

  setHighScore = (score: number): number[] => {
    let highScore = this.state.highScore;
    let pushed = false;
    for (let i = 0; i < highScore.length; i++) {
      if (highScore[i] < score) {
        highScore.splice(i, 0, score);
        pushed = true;
        break;
      }
    }
    if (!pushed) {
      highScore.push(score);
    }
    highScore.splice(10);
    return highScore;
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Setup"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Setup" component={SetupScreen} />
          <Stack.Screen name="Game">
            {(props) => <GameScreen {...props} onStop={this.stopGame} />}
          </Stack.Screen>
          <Stack.Screen name="GameOver" component={GameOverScreen} />
          <Stack.Screen
            name="HighScore"
            component={HighScoreScreen}
            initialParams={{ highScore: this.state.highScore }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default BestGameEver;
