import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Image,
} from "react-native";
import {ScaledStyleSheet} from "../components/scaler";

export interface IPlace {
  score: number;
  name: string;
}

interface IGameOverScreenProps {
  navigation: any;
  route: any;
  onNewHighScore: (score: IPlace[]) => void;
  highScore: IPlace[];
}

const findPlace = (score: number, highScore: IPlace[]): number | null => {
  if (highScore.length == 0) {
    return 0;
  }
  for (let i = 0; i < highScore.length; i++) {
    if (highScore[i].score < score) {
      return i;
    }
  }
  if (highScore.length < 10) {
    return highScore.length;
  }
  return null;
};

const setHighScore = (
  score: number,
  name: string,
  place: number | null,
  highScore: IPlace[]
): IPlace[] => {
  if (place === null) {
    return highScore;
  }
  highScore.splice(place, 0, { score: score, name: name });
  highScore.splice(10);
  return highScore;
};

const GameOverScreen = (props: IGameOverScreenProps) => {
  let { score } = props.route.params;
  let { highScore, onNewHighScore } = props;
  const place = findPlace(score, highScore);
  const [visible, setModalVisible] = useState(place !== null);

  let name: string = "";

  return (
    <View style={styles.gameContainer}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/images/lost-planet.jpg")}
      />
      <View style={{ flex: 3 }}>
        <Modal animationType="fade" visible={visible}>
          <View style={styles.fullScreen}>
            <View style={{ flex: 3 }} />
            {place !== null && (
              <Text
                style={styles.gameOverText}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                Congratulations! You entered place {place + 1} in leaderboard!
              </Text>
            )}
            <TextInput
              onChangeText={(text) => {
                name = text;
              }}
              placeholder="Enter your name"
              placeholderTextColor="snow"
              style={styles.input}
            />
            <Pressable
              style={styles.button}
              onPress={() => {
                let newHighScore = setHighScore(score, name, place, highScore);
                onNewHighScore(newHighScore);
                setModalVisible(false);
              }}
            >
              <Text style={styles.gameOverText}>OK</Text>
            </Pressable>
            <View style={{ flex: 5 }} />
          </View>
        </Modal>
      </View>

      <View style={styles.fullScreenButton}>
        <Text
          style={styles.gameOverText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Game Over
        </Text>
        <Text
          style={styles.gameOverText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Score: {props.route.params.score}
        </Text>
        {place == null && (
          <Text
            style={styles.gameOverText}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            You didn't manage to enter leaderbord. Try harder next time!
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.push("Game", { factor: props.route.params.factor })
        }
      >
        <Text
          style={styles.gameOverText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Restart
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Setup")}
      >
        <Text
          style={styles.backToScreenText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Back to main screen
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 3 }} />
    </View>
  );
};

const styles = ScaledStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
  },
  backToScreenText: {
    color: "white",
  },
  fullScreenButton: {
    flex: 1,
  },
  button: {
    backgroundColor: "midnightblue",
    flex: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: "white",
    fontSize: 30,
    fontStyle: "italic",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
    position: "absolute",
    zIndex: -1,
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  fullScreen: {
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
}, {width: 410, height: 800});

export default GameOverScreen;
