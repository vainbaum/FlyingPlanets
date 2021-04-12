import React from "react";
import { Text, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import { SetupScreen } from "./screens/SetupScreen";
import GameOverScreen, { IPlace } from "./screens/GameOverScreen";
import HighScoreScreen from "./screens/HighScoreScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();

interface IAppState {
  factor: boolean;
  score: number;
  highScore: IPlace[];
  fontsLoaded: boolean;
}

const fonts = {
  Papyrus: require("./assets/fonts/papyrus.ttf"),
  Major_Mono_Display_Regular400:
    "https://fonts.gstatic.com/s/a/9901077f5681d4ec7e01e0ebe4bd61ba47669c64a7aedea472cd94fe1175751b.ttf",
};

class BestGameEver extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      factor: false,
      score: 0,
      highScore: [],
      fontsLoaded: false,
    };
  }

  componentDidMount() {
    this.readData().then((highScore) =>
      this.setState({ highScore: highScore })
    );
    Font.loadAsync(fonts).then(() => this.setState({ fontsLoaded: true }));
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
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Setup"
          screenOptions={{ headerShown: false, gestureEnabled: false }}
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
