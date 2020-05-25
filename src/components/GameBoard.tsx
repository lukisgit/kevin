import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../store';
import { ACTIONS } from '../containers/game/actions';
import { PLAYER_TYPE } from '../constants';
import ActionsComponent from './Actions';
import { applyStyleModifiers } from 'styled-components-modifiers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const GameBoardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin: 0 auto 50px auto;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Cell = styled.div`
  display: block;
  position: relative;
  width: 31%;
  padding-top: 31%;
  background: white;
  margin-top: 3.5%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Cell__Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 21px;
`;

const Button = styled.button`
  background: white;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 20px;
  padding: 0 20px;
  cursor: pointer;

  svg {
    color: grey;
    margin-right: 10px;
    transition: all 0.25s;
  }

  &:hover {
    svg {
      transform: rotate(90deg);
    }
  }
`;

const Player = styled.div<{ modifiers?: PLAYER_TYPE }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  font-size: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  ${applyStyleModifiers({
    [PLAYER_TYPE.CROSS]: ({ theme }) => `
      color: ${theme.red};
    `,
    [PLAYER_TYPE.NULL]: ({ theme }) => `
      color: ${theme.green};
    `,
  })}
`;

const PlayerChooseWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ${Player} {
    margin: 10px;
  }
`;

const GameBoardComponent: React.FunctionComponent = () => {
  const cells = useSelector((state: InitialState) => state.game.cells);
  const turn = useSelector((state: InitialState) => state.game.turn);
  const winner = useSelector((state: InitialState) => state.game.winner);
  const draw = useSelector((state: InitialState) => state.game.draw);
  const dispatch = useDispatch();

  const onMove = (index: number) => {
    dispatch({ type: ACTIONS.SET_CELL, payload: { index } });
  };

  const onChoosePlayer = (turn: PLAYER_TYPE) => {
    dispatch({ type: ACTIONS.SET_TURN, payload: { turn } });
  };

  const onRefresh = () => {
    dispatch({ type: ACTIONS.REFRESH });
  };

  useEffect(() => {
    if (!!winner) {
      setTimeout(() => {
        dispatch({ type: ACTIONS.PREPARE_GAME });
      }, 2000);
    }
  }, [winner]);

  useEffect(() => {
    if (draw) {
      setTimeout(() => {
        dispatch({ type: ACTIONS.PREPARE_GAME });
      }, 2000);
    }
  }, [draw]);

  return (
    <Wrapper>
      {!!turn && (
        <GameBoardWrapper>
          {cells.map((item, index) => (
            <Cell key={index} onClick={() => onMove(index)}>
              <Cell__Inner>
                {item === PLAYER_TYPE.NULL && <span>O</span>}
                {item === PLAYER_TYPE.CROSS && <span>X</span>}
              </Cell__Inner>
            </Cell>
          ))}
        </GameBoardWrapper>
      )}
      {!turn && (
        <PlayerChooseWrapper>
          <Player modifiers={PLAYER_TYPE.NULL} onClick={() => onChoosePlayer(PLAYER_TYPE.NULL)}>
            O
          </Player>
          <Player modifiers={PLAYER_TYPE.CROSS} onClick={() => onChoosePlayer(PLAYER_TYPE.CROSS)}>
            X
          </Player>
        </PlayerChooseWrapper>
      )}
      <ActionsComponent turn={turn} winner={winner} draw={draw} />
      <Button onClick={onRefresh}>
        <FontAwesomeIcon icon={faSync} />
        Perkrauti
      </Button>
    </Wrapper>
  );
};

export default GameBoardComponent;
