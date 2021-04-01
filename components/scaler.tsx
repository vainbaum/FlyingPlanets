import { Dimensions, Platform, PixelRatio, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const scaledProperties = [
  "fontSize",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "top",
  "bottom",
  "left",
  "right",
  "height",
  "width",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "borderRadius",
];

interface StyleDict {
    [key: string]: any;
}

export function ScaledStyleSheet(
  styleObject: { [key: string]: StyleDict},
  originalDimensions: { height: number; width: number }
) {
  const heightScale = SCREEN_HEIGHT / originalDimensions.height;
  const widthScale = SCREEN_WIDTH / originalDimensions.width;
  let scaledStyle: { [key: string]: StyleDict} = {};
  Object.keys(styleObject).forEach((element: string) => {
    scaledStyle[element] = {};
    const styleDict = styleObject[element];
    Object.keys(styleDict).forEach((property: string) => {
      if (!(scaledProperties.includes(property))) {
        scaledStyle[element][property] = styleDict[property];
      } else if (property.match(/left|right/i) && typeof(styleDict[property]) === "number") { 
        scaledStyle[element][property] = Math.ceil(styleDict[property] * widthScale);
      } else if (typeof(styleDict[property]) === "number") {
        scaledStyle[element][property] = Math.ceil(styleDict[property] * heightScale);
      } else {
        scaledStyle[element][property] = styleDict[property];
      }
    });
  });
  return StyleSheet.create(scaledStyle);
}

export function scaleHeight(property: number, originalHeight: number){
  const heightScale = SCREEN_HEIGHT / originalHeight;
  return Math.ceil(property * heightScale);
}