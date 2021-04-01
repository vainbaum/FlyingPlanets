import { ScaledStyleSheet} from "../components/scaler";


const fontStyles = ScaledStyleSheet({
  gameButtonText: {
    color: "snow",
    fontSize: 20,
    fontFamily: "Major_Mono_Display_Regular400",
    textAlign: "center",
  },
  settingsText: {
    color: "snow",
    fontSize: 25,
    flex: 1,
    marginRight: 5,
    textAlign: "center",
    fontFamily: "Papyrus",
  },
  helpText: {
    color: "snow",
    fontSize: 16,
    fontFamily: "Papyrus",
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
  },
}, {width: 410, height: 800});

export default fontStyles;
