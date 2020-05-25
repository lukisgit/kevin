import React from 'react';
import styled, { css } from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { PLAYER_TYPE } from '../constants';
import { useSelector } from 'react-redux';
import { InitialState } from '../store';

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 50px 100px;
  justify-content: center;
`;

const HeaderWrapper__Player = styled.div<{ modifiers?: PLAYER_TYPE }>`
  display: flex;
  flex-basis: 15%;
  height: 100px;
  background: white;
  border-radius: 15px;
  margin: 0 1.5%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-content: space-between;
  font-size: 21px;
  padding: 0 40px;
  box-sizing: border-box;
`;

const Separator = styled.span`
  color: rgba(0, 0, 0, 0.15);
  margin: 0 10px;
`;

const Player = styled.div<{ modifiers?: PLAYER_TYPE }>`
  color: rgba(0, 0, 0, 0.15);
  margin: 0 10px;
  font-weight: bold;
  font-size: 40px;

  ${applyStyleModifiers({
    [PLAYER_TYPE.CROSS]: ({ theme }) => `
      color: ${theme.red};
    `,
    [PLAYER_TYPE.NULL]: ({ theme }) => `
      color: ${theme.green};
    `,
  })}
`;

const HeaderComponent: React.FunctionComponent = () => {
  const nullScore = useSelector((state: InitialState) => state.game.nullScore);
  const crossScore = useSelector((state: InitialState) => state.game.crossScore);

  return (
    <HeaderWrapper>
      <HeaderWrapper__Player modifiers={PLAYER_TYPE.CROSS}>
        <Player modifiers={PLAYER_TYPE.CROSS}>X</Player>
        <div>
          <span>L</span>
          <span>{crossScore.win}</span>
          <Separator>/</Separator>
          <span>P</span>
          <span>{crossScore.lose}</span>
        </div>
      </HeaderWrapper__Player>
      <HeaderWrapper__Player modifiers={PLAYER_TYPE.NULL}>
        <Player modifiers={PLAYER_TYPE.NULL}>O</Player>
        <div>
          <span>L</span>
          <span>{nullScore.win}</span>
          <Separator>/</Separator>
          <span>P</span>
          <span>{nullScore.lose}</span>
        </div>
      </HeaderWrapper__Player>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
