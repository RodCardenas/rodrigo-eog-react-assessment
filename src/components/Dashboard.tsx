import React from 'react';
import Grid from '@material-ui/core/Grid';
import Metrics from '../Features/Metrics/Metrics';
import Measurements from '../Features/Measurements/Measurements';

export default () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs>
        Dashboard
      </Grid>

      <Grid item xs>
        Metrics
        <Metrics />
      </Grid>

      <Grid item xs>
        Measurements
        <Measurements />
      </Grid>
    </Grid>
  );
};
