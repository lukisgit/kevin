import { PLAYER_TYPE } from '../../constants';
import { ACTIONS } from './actions';
import { determineWinner, isEmptyCell } from '../../utils';

export interface InitialState {
  cells: any[];
  turn: PLAYER_TYPE | null;
  winner: PLAYER_TYPE | null;
  draw: boolean;
  nullScore: { win: number; lose: number };
  crossScore: { win: number; lose: number };
}

const defaultValues: InitialState = {
  cells: Array(9).fill(null),
  turn: null,
  winner: null,
  draw: false,
  nullScore: {
    win: 0,
    lose: 0,
  },
  crossScore: {
    win: 0,
    lose: 0,
  },
};

const initialState: InitialState = { ...defaultValues };

function reducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case ACTIONS.SET_CELL: {
      if (!!state.winner || state.draw) {
        return state;
      }
      const cellsCopy = [...state.cells];
      cellsCopy[action.payload.index] = state.turn;
      const winner = determineWinner(cellsCopy);
      let nextTurn = state.turn === PLAYER_TYPE.NULL ? PLAYER_TYPE.CROSS : PLAYER_TYPE.NULL;
      let nullScore = state.nullScore;
      let crossScore = state.crossScore;
      if (!!winner) {
        if (winner === PLAYER_TYPE.NULL) {
          nullScore = { ...nullScore, win: nullScore.win + 1 };
          crossScore = { ...crossScore, lose: crossScore.lose + 1 };
        } else if (winner === PLAYER_TYPE.CROSS) {
          nullScore = { ...nullScore, lose: nullScore.lose + 1 };
          crossScore = { ...crossScore, win: crossScore.win + 1 };
        }
        nextTurn = winner;
      }
      const isDraw = isEmptyCell(cellsCopy) && !winner;
      return { ...state, turn: nextTurn, cells: cellsCopy, nullScore, crossScore, winner, draw: isDraw };
    }
    case ACTIONS.SET_TURN: {
      return { ...state, turn: action.payload.turn };
    }
    case ACTIONS.REFRESH: {
      return { ...defaultValues };
    }
    case ACTIONS.PREPARE_GAME: {
      return { ...state, winner: null, draw: false, cells: Array(9).fill(null) };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
