import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

import { MeasurementData } from '../Features/Measurements/reducer';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    minWidth: '250px',
    width: '250px',
  },
}));

type ReadOutProps = {
  measurement: MeasurementData;
  metricName: string;
};

export default ({ measurement, metricName }: ReadOutProps) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={metricName} />
      <CardContent>{measurement.value}</CardContent>
    </Card>
  );
};
