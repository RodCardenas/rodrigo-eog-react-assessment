import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type MeasurementData = (Date | number)[];

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

      if (state[metric].length >= chartingLimit) {
        state[metric].shift();
      }
      state[metric].push([new Date(at), value]);
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
