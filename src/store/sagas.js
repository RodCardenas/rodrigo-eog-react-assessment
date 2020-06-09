import { spawn } from 'redux-saga/effects';
import metricsSaga from '../Features/Metrics/saga';
import weatherSaga from '../Features/Weather/saga';

export default function* root() {
  yield spawn(metricsSaga);
  yield spawn(weatherSaga);
}
