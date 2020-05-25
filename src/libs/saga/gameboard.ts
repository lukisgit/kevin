import {fork, takeLatest} from "@redux-saga/core/effects";

function* watchSetRegister() {
    yield takeLatest('SET_REGISTER', () => {
    });
}

const GameBoardSaga = [
    fork(watchSetRegister),
];

export default GameBoardSaga;