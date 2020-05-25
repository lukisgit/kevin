import React, { useEffect } from 'react';
import HeaderComponent from './components/Header';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './libs/styled-components/theme';
import GameBoardComponent from './components/GameBoard';
import { makeStore, sagaMiddleware } from './store';
import rootSaga from './libs/saga';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const store = makeStore();

const persistor = persistStore(store);

const AppWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`;

function App() {
  useEffect(() => {
    sagaMiddleware.run(rootSaga);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper>
          <ThemeProvider theme={theme}>
            <HeaderComponent />
            <GameBoardComponent />
          </ThemeProvider>
        </AppWrapper>
      </PersistGate>
    </Provider>
  );
}

export default App;
