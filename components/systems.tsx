import { TouchEvent } from "react-native-game-engine";
import { Finger } from "./renderers";
import Matter from "matter-js";

const MoveFinger = (entities, { touches }) => {
  touches
    .filter((t: TouchEvent) => t.type === "move")
    .forEach((t: TouchEvent) => {
      let finger = entities[t.id + 1];
      if (finger)  {
          finger.body.position.x += t.delta.pageX * 0.1;
          finger.body.position.y += t.delta.pageY * 0.1;
      }
    });

  return entities;
};

let id = 5;
const StartFinger = (entities, { touches }) => {
  console.log(touches);
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

const GameBorders = (entities, { time }) => {
  let engine = entities.physics.engine;
  for (let i = 1; i < 5; i++) {
    const finger = entity[i];
    if (finger.position[0] < 0 || finger.position[1] < 0) {
      engine.dispatch({ type: "game-over" });
    }
  }
};

export { MoveFinger, StartFinger, Physics, GameBorders };
