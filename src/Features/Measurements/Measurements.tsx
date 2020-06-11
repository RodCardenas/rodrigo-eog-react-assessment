import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useSubscription } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Measurement } from './reducer';
import { IState } from '../../store';
import LineGraph from '../../components/LineGraph';

const newMeasurement = `
subscription {
  newMeasurement {
    metric,
    at,
    value,
    unit
  }
}
`;

const getMeasurements = (state: IState) => {
  return state.measurements;
};
const getChosenMetrics = (state: IState) => {
  return state.metrics.chosen;
};

export default () => {
  const dispatch = useDispatch();
  const measurements = useSelector(getMeasurements);
  const chosenMetrics = useSelector(getChosenMetrics);

  const [{ fetching, data, error }] = useSubscription({ query: newMeasurement });

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.measurementReceived(data.newMeasurement));
  }, [dispatch, data, error]);

  if (!data && fetching) return <LinearProgress />;
  if (error) {
    console.log(`Oh no! Error: ${error}`);
  }

  return <LineGraph measurements={measurements} chosenMetrics={chosenMetrics} />;
};
