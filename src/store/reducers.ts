import { reducer as measurementsReducer } from '../Features/Measurements/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/reducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';

export default {
  measurements: measurementsReducer,
  metrics: metricsReducer,
  weather: weatherReducer,
};
