import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit?: string;
};

export type MeasurementData = {
  at: number;
  value: number;
};

export type MeasurementsGroup = [{ measurements: MeasurementData[]; metric: string }];

export type ApiErrorAction = {
  error: string;
};

const initialState: { [metric: string]: MeasurementData[] } = {};

const chartingLimit = (5 * 60) / 1.3;

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementReceived: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit } = action.payload;
      state[metric] = state[metric] || [];

      if (state[metric].length >= chartingLimit) {
        state[metric].shift();
      }
      state[metric].push({ at, value });
    },
    multipleMeasurementsReceived: (state, action: PayloadAction<MeasurementsGroup>) => {
      const measurements = action.payload;
      console.log(measurements);

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
