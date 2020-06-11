import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dygraph from 'dygraphs';

export default (props: any) => {
  console.log(props);

  return (
    <Card>
      <CardHeader title="Metrics" />
      <CardContent>Graph</CardContent>
    </Card>
  );
};
