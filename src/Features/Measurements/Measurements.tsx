import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useSubscription, useQuery } from 'urql';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import LineGraph from '../../components/LineGraph';
import ReadOut from '../../components/ReadOut';

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
    <Grid container>
      <Grid item xs>
        <LineGraph
          measurements={measurements}
          chosenMetrics={chosenMetrics}
          isPaused={isSubscriptionPaused}
          pause={setIsSubscriptionPaused}
        />
      </Grid>
      {chosenMetrics.map(metric => {
        return <ReadOut measurement={measurements[metric][measurements[metric].length - 1]} metricName={metric} />;
      })}
    </Grid>
  );
};
