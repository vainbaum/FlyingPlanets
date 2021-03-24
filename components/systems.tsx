import { TouchEvent } from "react-native-game-engine";
import Matter from "matter-js";
import {Dimensions} from "react-native";

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
  for (let i = 1; i < 5; i++) {
    const finger = entities[i];
    if (!finger) {
      continue;
    }
    const score = Math.round((entities.scoreBoard.score + Number.EPSILON) * 100) / 100;
    const window = Dimensions.get("window");
    if (finger.body.position.x < -25 || finger.body.position.y < -25) {
      dispatch({ type: "game-over", score: score });
    }
    if (finger.body.position.x > window.width + 25 || finger.body.position.y > window.height + 25) {
      dispatch({ type: "game-over", score: score });
    }
  }
  entities.scoreBoard.score +=
    (time.delta * entities.scoreBoard.factor) / 100.0;
  return entities;
};

export { Move, Press, Physics, GameBorders };
