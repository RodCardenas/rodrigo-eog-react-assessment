import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useSubscription, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
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

const getMultipleMeasurements = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

const getMeasurements = (state: IState) => {
  return state.measurements;
};
const getChosenMetrics = (state: IState) => {
  return state.metrics.chosen;
};

const halfAnHourAgo = Date.now() - 30 * 60 * 1000;

export default () => {
  const dispatch = useDispatch();
  const measurements = useSelector(getMeasurements);
  const chosenMetrics = useSelector(getChosenMetrics);
  const [isSubscriptionPaused, setIsSubscriptionPaused] = useState(false);

  const [{ fetching, data, error }] = useSubscription({ query: newMeasurement, pause: isSubscriptionPaused });
  const [multipleMeasurementsResult] = useQuery({
    query: getMultipleMeasurements,
    variables: {
      input: chosenMetrics.map(metricName => {
        return { metricName, after: halfAnHourAgo };
      }),
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.measurementReceived(data.newMeasurement));
  }, [dispatch, data, error]);

  useEffect(() => {
    const { data } = multipleMeasurementsResult;
    if (!data) return;
    dispatch(actions.multipleMeasurementsReceived(data.getMultipleMeasurements));
  }, [dispatch, multipleMeasurementsResult]);

  if (!data && fetching) return <LinearProgress />;
  if (error) {
    console.log(`Oh no! Error: ${error}`);
  }

  return (
    <LineGraph
      measurements={measurements}
      chosenMetrics={chosenMetrics}
      isPaused={isSubscriptionPaused}
      pause={setIsSubscriptionPaused}
    />
  );
};
