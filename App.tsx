import React from "react";
import GameScreen from "./screens/GameScreen";
import { SetupScreen } from "./screens/SetupScreen";
import GameOverScreen, { IPlace } from "./screens/GameOverScreen";
import HighScoreScreen from "./screens/HighScoreScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

interface IAppState {
  factor: boolean;
  score: number;
  highScore: IPlace[];
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
    this.setState({ score: score });
  };

  setHighScore = (highScore: IPlace[]): void => {
    AsyncStorage.setItem("@highScore", JSON.stringify(highScore));
    this.setState({ highScore: highScore });
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
          <Stack.Screen name="GameOver">
            {(props) => (
              <GameOverScreen
                {...props}
                onNewHighScore={this.setHighScore}
                highScore={this.state.highScore}
              />
            )}
          </Stack.Screen>
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
