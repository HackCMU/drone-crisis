export enum Depth {
  /** Front-most objects, such as the drone and the wall */
  FRONT = 1,
  /** The background wall */
  FRONT_WALL = 2,
  /** First parallax layer */
  BUILDING_1 = 3,
  /** Second parallax layer */
  BUILDING_2 = 4,
  /** Last parallax layer */
  SKY = 5,
}
