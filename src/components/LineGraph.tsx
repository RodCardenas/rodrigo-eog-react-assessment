import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dygraph from 'dygraphs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    minWidth: '600px',
  },
}));

export default (props: any) => {
  const classes = useStyles();
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const graphLegendRef = useRef<HTMLDivElement>(null);
  let graph: any = null;

  const populateGraph = () => {
    if (null !== graphContainerRef.current && null !== graphLegendRef.current) {
      if (graph) {
        //update
        graph.updateOptions({
          file: props.measurements.oilTemp,
        });
      } else {
        // create
        graph = new Dygraph(graphContainerRef.current, props.measurements.oilTemp, {
          legend: 'always',
          title: 'Measurements',
          labelsDiv: graphLegendRef.current,
        });
      }
    }
  };

  React.useEffect(() => {
    if (graphContainerRef.current) {
      populateGraph();
    }
  }, [graphContainerRef, props.measurements]);

  return (
    <Card>
      <CardHeader title="Metrics" />
      <CardContent>
        <div className={classes.graphContainer} ref={graphContainerRef} />
      </CardContent>
      <CardContent ref={graphLegendRef} />
    </Card>
  );
};
