import { PLAYER_TYPE } from './constants';
import { determineWinner } from './utils';

describe('determineWinner', () => {
  it('should return the player type if the path is filled with identical characters', () => {
    const testGameBoard = [
      [PLAYER_TYPE.CROSS, null, PLAYER_TYPE.NULL, null, null, PLAYER_TYPE.NULL, null, null, PLAYER_TYPE.NULL],
      [
        PLAYER_TYPE.CROSS,
        PLAYER_TYPE.CROSS,
        PLAYER_TYPE.CROSS,
        null,
        null,
        PLAYER_TYPE.NULL,
        null,
        null,
        PLAYER_TYPE.NULL,
      ],
      [null, null, PLAYER_TYPE.NULL, PLAYER_TYPE.NULL, null, PLAYER_TYPE.NULL, null, null, null],
    ];
    const expectedResults = [PLAYER_TYPE.NULL, PLAYER_TYPE.CROSS, null];
    const winners = testGameBoard.map((cells) => {
      return determineWinner(cells);
    });
    // Test calculated values with in 1km range of expected value
    expect(winners.map((winner) => winner)).toEqual(expectedResults.map((winner) => winner));
  });
});
