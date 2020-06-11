import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type MeasurementData = {
  at: number;
  value: number;
  unit: string;
};

export type MeasurementsGroup = [{ measurements: MeasurementData[]; metric: string }];

export type ApiErrorAction = {
  error: string;
};

const initialState: { [metric: string]: MeasurementData[] } = {};

const chartingLimit = (30 * 60) / 1.3;

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementReceived: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit } = action.payload;
      state[metric] = state[metric] || [];
      const dataPoints = state[metric].length;
      const dataPointsToLimit = chartingLimit - dataPoints;
      if (dataPointsToLimit < 0) {
        state[metric] = state[metric].slice(dataPoints - chartingLimit);
      } else if (dataPointsToLimit >= 0) {
        state[metric].shift();
      }
      state[metric].push({ at, value, unit });
    },
    multipleMeasurementsReceived: (state, action: PayloadAction<MeasurementsGroup>) => {
      const measurements = action.payload;
      for (let i = 0; i < measurements.length; i++) {
        let group = measurements[i];
        state[group.metric] = group.measurements;
      }
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
