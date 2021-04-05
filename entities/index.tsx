import Matter from "matter-js";
import {Engine, World} from "matter-js";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

interface IPhysics {
  physics: {
    engine: Engine;
    world: World;
  };
}

export default (restart: {physics: any} | null) : IPhysics => {
  if (restart) {
    Matter.Engine.clear(restart.physics.engine);
  }

  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  world.gravity.y = 0.05;
  const boxSize = 50;

  return {
    physics: { engine: engine, world: world },
  };
};

export {IPhysics};