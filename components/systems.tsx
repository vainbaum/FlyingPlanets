import { TouchEvent } from "react-native-game-engine";
import Matter from "matter-js";
import { Dimensions } from "react-native";
import { scaleHeight } from "../components/scaler";
import {IPlanet} from "../entities/Planet";
import {IPhysics} from "../entities/"
import {IScoreBoard} from "../components/renderers";

export interface IScoreBoardEntity {
  scoreBoard: IScoreBoard & {renderer: any};
}

export interface IPlanets {
 [key: string]: IPlanet;
}

export type GameEntities = IPlanets & IScoreBoardEntity & IPhysics;

const Move = (entities: GameEntities, { touches, time }) : GameEntities => {
  const factor = entities.scoreBoard.factor;
  touches
    .filter((t: TouchEvent) => t.type === "move")
    .forEach((t: TouchEvent) => {
      let planet= entities[t.id+1];
      if (planet) {
        planet.body.position.x += t.delta.pageX * 0.1 * factor;
        planet.body.position.y += t.delta.pageY * 0.1 * factor;
      }
    });

  if (entities.scoreBoard.mutable) {
    entities.scoreBoard.factor += time.delta / 1000.0;
  }
  return entities;
};

const Press = (entities: GameEntities, { touches }) : GameEntities => {
  for (let i = 0; i < 4; i++) {
    touches
      .filter((t: TouchEvent) => t.id === i)
      .forEach((t) => {
        let planet = entities[i + 1];
        if (!planet) {
          return;
        }
        if (t.type === "end") {
          planet.pressed = false;
        } else {
          planet.pressed = true;
        }
      });
  }
  return entities;
};

const Physics = (entities: GameEntities, { time }) : GameEntities => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

const GameBorders = (entities: GameEntities, { time, dispatch }) : GameEntities => {
  const score =
    Math.round((entities.scoreBoard.score + Number.EPSILON) * 100) / 100;
  for (let i = 0; i < 4; i++) {
    const planet= entities[i+1];
    if (!planet) {
      continue;
    }
    if (isOutOfBorders(planet.body.position)) {
      dispatch({ type: "game-over", score: score });
      return entities;
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
