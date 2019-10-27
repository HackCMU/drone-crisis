export enum Depth {
  /** Front-most objects, such as the drone and the wall */
  FRONT = 2,
  /** Particle back */
  WHITE = 3,
  /** First parallax layer */
  BUILDING_1 = 5,
  /** Second parallax layer */
  BUILDING_2 = 6,
  /** Last parallax layer */
  SKY = 7,
}

export function getDepthTranslatingFactor(depth: Depth) {
  switch (depth) {
    // case Depth.PARTICLE_FRONT: return 0.5;
    case Depth.FRONT: return 1;
    case Depth.WHITE: return 0;
    // case Depth.FRONT_WALL: return 1;
    case Depth.BUILDING_1: return 0.7;
    case Depth.BUILDING_2: return 0.45;
    case Depth.SKY: return 0.2;
  }
}
