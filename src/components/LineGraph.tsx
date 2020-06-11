import React, { useRef, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dygraph from 'dygraphs';

import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

import { MeasurementData } from '../Features/Measurements/reducer';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    minWidth: '1100px',
    width: '1100px',
  },
}));

type LineGraphProps = {
  measurements: { [metricName: string]: Array<MeasurementData> };
  chosenMetrics: Array<string>;
  isPaused: boolean;
  pause: (b: boolean) => void;
};

const getTraces = (measurements: { [metricName: string]: Array<MeasurementData> }, metrics: Array<string>) => {
  const activeTraces = Object.keys(measurements)
    .filter(metricName => metrics.includes(metricName))
    .sort();

  const formattedData: any[] = [];
  activeTraces.forEach((metric, metricIdx) => {
    let source = measurements[metric];

    source.forEach((dataPoint, idx) => {
      if (metricIdx === 0) {
        formattedData.push([new Date(dataPoint.at), dataPoint.value]);
      } else {
        if (idx < formattedData.length) {
          formattedData[idx].push(dataPoint.value);
        }
      }
    });
  });

  return formattedData;
};

export default ({ measurements, chosenMetrics, isPaused, pause }: LineGraphProps) => {
  const classes = useStyles();
  const [graph, setGraph] = useState<any>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const populateGraph = () => {
      if (null !== graphContainerRef.current) {
        const data = getTraces(measurements, chosenMetrics);

        if (null === graph) {
          // create
          if (data.length > 0) {
            const g = new Dygraph(graphContainerRef.current, data, {
              labels: ['Date', ...chosenMetrics],
            });
            setGraph(g);
          }
        } else {
          //update
          graph.updateOptions({
            file: data,
            labels: ['Date', ...chosenMetrics],
          });
          setGraph(graph);
        }
      }
    };
    if (graphContainerRef.current) {
      populateGraph();
    }
  }, [graphContainerRef, measurements, chosenMetrics, graph]);

  if (chosenMetrics.length === 0 && graph) {
    graph.destroy();
    setGraph(null);
  }
  return (
    <Card>
      <CardHeader title="Metrics" />
      {chosenMetrics.length === 0 ? (
        <LinearProgress />
      ) : (
        <>
          <CardContent>
            <div className={classes.graphContainer} ref={graphContainerRef} />
          </CardContent>
          <CardActions>
            <IconButton color="primary" onClick={() => pause(!isPaused)}>
              {isPaused ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
            </IconButton>
          </CardActions>
        </>
      )}
    </Card>
  );
};
