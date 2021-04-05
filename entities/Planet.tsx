import React from "react";
import Matter from "matter-js";
import { IProps, PlanetRenderer} from "../components/renderers";
import {scaleHeight} from "../components/scaler";

const RADIUS = scaleHeight(20, 800);

interface IPlanet {
  body: any;
  position: [number, number];
  pressed: boolean;
  renderer: any;
}

const Planet = (props: IProps & { world: any }) : IPlanet => {
  const ring = Matter.Bodies.circle(
    props.position[0],
    props.position[1],
    RADIUS
  );
  Matter.World.add(props.world, [ring]);
  const obj = {
    body: ring,
    position: props.position,
    pressed: false,
    renderer: <PlanetRenderer position={props.position} pressed={false} />,
  };
  return obj;
};

export { Planet, IPlanet };
