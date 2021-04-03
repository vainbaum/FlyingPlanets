import { TouchEvent } from "react-native-game-engine";
import Matter from "matter-js";
import { Dimensions } from "react-native";
import { scaleHeight } from "../components/scaler";

const Move = (entities, { touches, time }) => {
  const factor = entities.scoreBoard.factor;
  touches
    .filter((t: TouchEvent) => t.type === "move")
    .forEach((t: TouchEvent) => {
      let finger = entities[t.id + 1];
      if (finger) {
        finger.body.position.x += t.delta.pageX * 0.1 * factor;
        finger.body.position.y += t.delta.pageY * 0.1 * factor;
      }
    });

  if (entities.scoreBoard.mutable) {
    entities.scoreBoard.factor += time.delta / 1000.0;
  }
  return entities;
};

const Press = (entities, { touches }) => {
  for (let i = 1; i < 6; i++) {
    const touchId = i - 1;
    touches
      .filter((t: TouchEvent) => t.id === touchId)
      .forEach((t) => {
        let finger = entities[i];
        if (!finger) {
          return;
        }
        if (t.type === "end") {
          finger.pressed = false;
        } else {
          finger.pressed = true;
        }
      });
  }
  return entities;
};

const Physics = (entities, { time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

const GameBorders = (entities, { time, dispatch }) => {
  const score =
    Math.round((entities.scoreBoard.score + Number.EPSILON) * 100) / 100;
  for (let i = 1; i < 5; i++) {
    const finger = entities[i];
    if (!finger) {
      continue;
    }
    if (isOutOfBorders(finger.body.position)) {
      dispatch({ type: "game-over", score: score });
      return;
    }
  }
  entities.scoreBoard.score +=
    (time.delta * entities.scoreBoard.factor) / 100.0;
  return entities;
};

function isOutOfBorders(position: { x: number; y: number }): boolean {
  const window = Dimensions.get("window");
  const borderWidth = scaleHeight(25, 800);
  if (position.x < -borderWidth || position.y < -borderWidth) {
    return true;
  }
  if (
    position.x > window.width + borderWidth ||
    position.y > window.height + borderWidth
  ) {
    return true;
  }
  return false;
}

export { Move, Press, Physics, GameBorders };
