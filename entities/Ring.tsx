import React from "react";
import Matter from "matter-js";
import { IProps, Finger } from "../components/renderers";

let id = 1;

const RADIUS = 20;

const Ring = (props: IProps & { world: any }) => {
  const ring = Matter.Bodies.circle(
    props.position[0],
    props.position[1],
    RADIUS
  );
  Matter.World.add(props.world, [ring]);
  const obj = {
    body: ring,
    position: props.position,
    text: id,
    pressed: false,
    renderer: <Finger position={props.position} pressed={false} text={id} />,
  };
  id++;
  return obj;
};

export { Ring };