import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SimpleSelect = ({dataManager,handleClickSubmitTeam}) => {

  const classes = useStyles();
  const [formValues,setFormValues] = useState([null,null,null,null]);
 
  const handleChange = (event,index) => {
    let next_form_values = [...formValues];
    const value = event.target.value;
    if (value) {
      next_form_values[index] = value;
    } else {
      next_form_values[index] = null;
    };
    setFormValues(next_form_values);
  };
  

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Driver 1</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues[0]}
          onChange={(e) => handleChange(e,0)}
        >
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataManager.getPossibleTeamMates([null,formValues[1],formValues[2],formValues[3]]).sort().map(driver => <MenuItem value={driver}>{driver}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Driver 2</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues[1]}
          onChange={(e) => handleChange(e,1)}
        >
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataManager.getPossibleTeamMates([formValues[0],null,formValues[2],formValues[3]]).sort().map(driver => <MenuItem value={driver}>{driver}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Driver 3</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues[2]}
          onChange={(e) => handleChange(e,2)}
        >
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataManager.getPossibleTeamMates([formValues[0],formValues[1],null,formValues[3]]).sort().map(driver => <MenuItem value={driver}>{driver}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Driver 4</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues[3]}
          onChange={(e) => handleChange(e,3)}
        >
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataManager.getPossibleTeamMates([formValues[0],formValues[1],formValues[2],null]).sort().map(driver => <MenuItem value={driver}>{driver}</MenuItem>)}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" id='submit_button' 
      onClick={() => {
        const team_id = dataManager.findTeam(formValues[0],formValues[1],formValues[2],formValues[3]);
        handleClickSubmitTeam(team_id);
      }}>
          Select Team
      </Button>
    </div>
  );
}

export default SimpleSelect;