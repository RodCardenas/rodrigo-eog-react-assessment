import { reducer as metricsReducer } from '../Features/Metrics/reducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';

export default {
  metrics: metricsReducer,
  weather: weatherReducer,
};
