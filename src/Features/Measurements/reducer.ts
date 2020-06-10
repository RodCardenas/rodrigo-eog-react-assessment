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

export type ApiErrorAction = {
  error: string;
};

const initialState: { [metric: string]: MeasurementData[] } = {};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementReceived: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit } = action.payload;
      state[metric] = state[metric] || [];
      state[metric].push({ at, value, unit });
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
