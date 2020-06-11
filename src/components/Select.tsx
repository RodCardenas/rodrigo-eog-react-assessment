import React from 'react';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  select: {
    minWidth: '300px',
  },
}));

type OnChangeCallBack = (event: any) => void;

type SelectProps = {
  options: Array<string>;
  label: string;
  onChosenChange: OnChangeCallBack;
};

export default ({ options, label, onChosenChange }: SelectProps) => {
  const classes = useStyles();
  const [chosen, setChosen] = React.useState<ValueType<OptionTypeBase>>([]);

  const handleChange = (selected: any) => {
    if (selected) {
      setChosen(selected);
      if (onChosenChange) {
        const newChosenOptions = selected.map((option: any) => {
          return option.label;
        });
        onChosenChange(newChosenOptions);
      }
    }
  };

  const selectOptions = options.map(option => {
    return { label: option, value: option };
  });

  return <Select className={classes.select} isMulti value={chosen} onChange={handleChange} options={selectOptions} />;
};
