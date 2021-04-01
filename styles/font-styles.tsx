import { StyleSheet } from "react-native";
import { actuatedNormalize } from "../components/font-scaler";


const fontStyles = StyleSheet.create({
  gameButtonText: {
    color: "snow",
    fontSize: actuatedNormalize(20),
    fontFamily: "Major_Mono_Display_Regular400",
    textAlign: "center",
  },
  settingsText: {
    color: "snow",
    fontSize: actuatedNormalize(25),
    flex: 1,
    marginRight: 5,
    textAlign: "center",
    fontFamily: "Papyrus",
  },
  helpText: {
    color: "snow",
    fontSize: actuatedNormalize(16),
    fontFamily: "Papyrus",
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  gameOverText: {
    color: "white",
    fontSize: actuatedNormalize(48),
    textAlign: "center",
  },
});

export default fontStyles;
