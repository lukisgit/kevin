import { PLAYER_TYPE, POSSIBLE_LINES } from './constants';

// if null then no winner (priority controlled by redux)
export function determineWinner(cells: any[]): PLAYER_TYPE | null {
  if (cells.length !== 9) {
    return null;
  }

  let type: PLAYER_TYPE | null = null;
  for (let i = 0; i < POSSIBLE_LINES.length; i++) {
    const path = POSSIBLE_LINES[i];
    const isNull = path.every((item) => cells[item] === PLAYER_TYPE.NULL);
    if (isNull) {
      type = PLAYER_TYPE.NULL;
      break;
    }
    const isCross = path.every((item) => cells[item] === PLAYER_TYPE.CROSS);
    if (isCross) {
      type = PLAYER_TYPE.CROSS;
      break;
    }
  }

  return type;
}

export function isEmptyCell(cells: any[]): boolean {
  return cells.findIndex((item) => item === null) === -1;
}
