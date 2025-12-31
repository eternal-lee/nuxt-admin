/**
 * function to generate random number
 * @param min sd
 * @param max sd
 */
export function randomFloor(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}
