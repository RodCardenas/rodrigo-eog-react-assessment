import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type SelectProps = {
  options: Array<string>;
  label: string;
};

export default ({ options, label }: SelectProps) => {
  const [chosen, setChosen] = React.useState([]);

  // TODO: event: React.ChangeEvent<HTMLInputSelect> not supported by MUI https://github.com/mui-org/material-ui/issues/15400
  const handleChange = (event: any) => {
    setChosen(event.target.value);
  };
  return (
    <FormControl>
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
