import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';
import { useSubscription } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Measurement } from './reducer';

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

const subscriptionHandler = (measurements: Measurement[] = [], response: { newMeasurement: Measurement }) => {
  return [response.newMeasurement, ...measurements];
};

export default () => {
  const dispatch = useDispatch();
  const [{ fetching, data, error }] = useSubscription({ query: newMeasurement }, subscriptionHandler);

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.measurementReceived(data[0]));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  if (error) {
    console.log(`Oh no! Error: ${error}`);
  }
  return null;
};
