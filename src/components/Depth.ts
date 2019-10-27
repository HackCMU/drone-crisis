export enum Depth {
  /** Particle front */
  PARTICLE_FRONT = 1,
  /** Front-most objects, such as the drone and the wall */
  FRONT = 2,
  /** Particle back */
  PARTICLE_BACK = 3,
  /** The background wall */
  FRONT_WALL = 4,
  /** First parallax layer */
  BUILDING_1 = 5,
  /** Second parallax layer */
  BUILDING_2 = 6,
  /** Last parallax layer */
  SKY = 7,
}
