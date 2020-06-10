import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from '../../components/Select';
import { IState } from '../../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;

const getMetrics = (state: IState) => {
  const { available } = state.metrics;
  return {
    available,
  };
};

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
  const dispatch = useDispatch();
  const { available } = useSelector(getMetrics);

  const chosenMetricsChanged = (chosenMetrics: string[]) => {
    dispatch(actions.metricsChosen({ chosenMetrics }));
  };

  const [result] = useQuery({
    query,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricsRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <Select options={available} label="Tracked Metrics" onChosenChange={chosenMetricsChanged} />;
};
