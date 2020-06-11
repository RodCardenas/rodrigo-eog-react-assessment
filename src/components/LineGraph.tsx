import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dygraph from 'dygraphs';
import { makeStyles } from '@material-ui/core/styles';
import { MeasurementData } from '../Features/Measurements/reducer';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    minWidth: '600px',
  },
}));

type LineGraphProps = {
  measurements: { [metricName: string]: Array<MeasurementData> };
  chosenMetrics: Array<string>;
};

const getTraces = (measurements: { [metricName: string]: Array<MeasurementData> }, metrics: Array<string>) => {
  const activeTraces = Object.keys(measurements).filter(metricName => metrics.includes(metricName));

  const formattedData: any[] = [];
  activeTraces.forEach((metric, metricIdx) => {
    let source = measurements[metric];
    source.forEach((dataPoint, idx) => {
      if (metricIdx === 0) {
        formattedData.push([new Date(dataPoint.at), dataPoint.value]);
      }
      // else {
      //   formattedData[idx].push(dataPoint.value);
      // }
    });
  });
  return formattedData;
};

export default ({ measurements, chosenMetrics }: LineGraphProps) => {
  const classes = useStyles();
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const graphLegendRef = useRef<HTMLDivElement>(null);
  let graph: Dygraph;

  React.useEffect(() => {
    const populateGraph = () => {
      if (null !== graphContainerRef.current && null !== graphLegendRef.current) {
        let data = getTraces(measurements, chosenMetrics);
        if (graph) {
          //update
          graph.updateOptions({
            file: data,
          });
        } else {
          // create
          if (data.length > 0) {
            graph = new Dygraph(graphContainerRef.current, data, {
              legend: 'always',
              title: 'Measurements',
              labelsDiv: graphLegendRef.current,
              labels: ['Date', ...chosenMetrics],
            });
          }
        }
      }
    };
    if (graphContainerRef.current) {
      populateGraph();
    }
  }, [graphContainerRef, measurements]);

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
