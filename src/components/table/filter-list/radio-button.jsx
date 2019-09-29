import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(.5),
    },
}));

export default function RadioButtonsGroup() {
    const classes = useStyles();
    const buttonFilterList = useSelector( state => state.buttonFilterList);
    const [value, setValue] = useState(buttonFilterList.default);
    const dispatch = useDispatch();

    function handleChange(event) {
        dispatch({type: buttonFilterList.reducer, ...{filterBy: event.target.value, param: ''}});
        setValue(event.target.value);
    }

    return(
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Filtros</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                {buttonFilterList.values.map( (item, index) => <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} /> )}
            </RadioGroup>
        </FormControl>
    )
}
