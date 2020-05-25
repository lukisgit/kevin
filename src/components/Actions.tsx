import React from 'react';
import styled from 'styled-components';
import { PLAYER_TYPE } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 20px auto;
`;

const ActionsComponent: React.FunctionComponent<{
  turn: PLAYER_TYPE | null;
  winner: PLAYER_TYPE | null;
  draw: boolean;
}> = ({ turn, winner, draw }) => {
  return (
    <Wrapper>
      {draw && <span>Lygiosios!</span>}
      {!!winner && (
        <React.Fragment>
          {winner === PLAYER_TYPE.NULL && <span>O laimėjo!</span>}
          {winner === PLAYER_TYPE.CROSS && <span>X laimėjo!</span>}
        </React.Fragment>
      )}
      {!draw && !winner && (
        <React.Fragment>
          {!turn && <span>Pasirinkite žaidėją</span>}
          {turn === PLAYER_TYPE.NULL && <span>O žaidėjo eilė</span>}
          {turn === PLAYER_TYPE.CROSS && <span>X žaidėjo eilė</span>}
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default ActionsComponent;
