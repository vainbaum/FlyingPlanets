import {StyleSheet} from "react-native";

const commonStyles = StyleSheet.create({
  fullscreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    zIndex: -1,
  },
});

export {commonStyles};
