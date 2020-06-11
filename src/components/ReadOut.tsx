import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import { MeasurementData } from '../Features/Measurements/reducer';

type ReadOutProps = {
  measurement: MeasurementData;
  metricName: string;
};

export default ({ measurement, metricName }: ReadOutProps) => {
  return (
    <Card>
      <CardHeader subheader={metricName} />
      <CardContent>
        <Typography variant="subtitle1">{measurement.value}</Typography>
        <Typography variant="subtitle2">{' [' + measurement.unit + ']'}</Typography>
      </CardContent>
    </Card>
  );
};
