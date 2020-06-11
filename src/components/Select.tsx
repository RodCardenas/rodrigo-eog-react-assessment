import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
  const [chosen, setChosen] = React.useState([]);

  // TODO: event: React.ChangeEvent<HTMLInputSelect> not supported by MUI https://github.com/mui-org/material-ui/issues/15400
  const handleChange = (event: any) => {
    setChosen(event.target.value);
    if (onChosenChange) {
      onChosenChange(event.target.value);
    }
  };

  return (
    <FormControl className={classes.select}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select labelId={label} id={label + 'select'} multiple value={chosen} onChange={handleChange} input={<Input />}>
        {options.map(option => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
