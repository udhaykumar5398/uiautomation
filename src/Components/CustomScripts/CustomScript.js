import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import 'react-flags-select/scss/react-flags-select.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

export function CustomFieldTemplate(props) {
  const { id, classNames, label, help, required, description, errors, children } = props;
  return (
    <div className={classNames + ' customWrapper'}>
      <label htmlFor={id} className={classNames + ' customLabel'}>{label}{required ? "*" : null}</label>
      {children}
      {description}
      {errors}
      {help}
    </div>
  );
}

export const autocomplete = (props) => {
  const { onChange } = props;
  console.log("autocomplete options", props.options.enumOptions);
  const cars = props.options.enumOptions;

  const options = cars.map((option) => {
    const firstLetter = option.value[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleAutocompleteChange = (event, value) => {
    console.log("handleAutocompleteChange", value);
  };

  return (
    <FormControl variant="outlined">
      <Autocomplete
        labelId={props.id}
        id={props.id}
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        freeSolo={true}
        getOptionLabel={(option) => option.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant="outlined"
          />
        )}
        onChange={handleAutocompleteChange}
      />
    </FormControl>
  );
}

export const select = (props) => {
  const { onChange } = props;
  console.log("Select props value", props.label + " ------- " + props.value);

  let selectValue = props.value !== undefined ? props.value : '';

  return (
    <FormControl variant="filled">
      <InputLabel id={props.id}>{props.label} {props.required ? '*' : ''} </InputLabel>
      <Select
        labelId={props.id}
        id={props.id}
        value={selectValue}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {props.options.enumOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const text = (props) => {
  const { onChange } = props;
  console.log("text props value", props.label + " ------- " + props.value);

  return (
    <FormControl variant="filled">
      <TextField
        labelId={props.id}
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
        label={props.label}
        variant="filled"
        
      />
    </FormControl>
  );
}

export const SelectGroup = (props) => {
  const { onChange } = props;
  console.log("Select props value", props.label + " ------- " + props.value);

  let selectValue = props.value !== undefined ? props.value : '';

  return (
    <FormControl variant="filled">
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select
        labelId={props.id}
        id={props.id}
        value={selectValue}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      >
        <ListSubheader>Category 1</ListSubheader>
        {props.options.enumOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const country = (props) => {
  const { onChange } = props;

  const onSelectFlag = (countryCode) => {
    console.log(countryCode);
    onChange(countryCode);
  }

  return (
    <ReactFlagsSelect
      labelId={props.id}
      id={props.id}
      value={props.value}
      required={props.required}
      defaultCountry="IN"
      searchable={true}
      onSelect={onSelectFlag}
    />
  );
}

export const date = (props) => {
  const { onChange } = props;
  let selectedDateNew = props.value !== undefined ? moment(props.value).format('MM-DD-YYYY') : null;
  const handleDateChange = (value) => {
    console.log(new Date(value))
    const dateChangeFormat = moment(value).format('MM-DD-YYYY').toString();
    onChange(dateChangeFormat)
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDateNew}
        onChange={handleDateChange}
        keyboard
        placeholder="MM-DD-YYYY"
        format={"MM-DD-YYYY"}
        disableOpenOnEnter
        animateYearScrolling={false}
        autoOk={true}
        clearable
        variant="filled"
      />
    </MuiPickersUtilsProvider>
  );
}

export const widgets = {
  select: select,
  text: text,
  date: date,
  country: country,
  autocomplete: autocomplete

}


export const customStyles = {
  content: {
    left: '50%',
    bottom: 'auto',
    transform: 'translate(-50%, 0%)',
    width: '1000px',
    zIndex: '10000',
    yOverflow: 'scroll',
    xOverflow: 'hidden'
  }
};

export const customStylesauto = {
  content: {
    left: '50%',
    bottom: 'auto',
    transform: 'translate(-50%, 0%)',
    width: '800px',
    zIndex: '10000',
  }
};

export const customStylesauto1 = {
  content: {
    left: '50%',
    bottom: 'auto',
    transform: 'translate(-50%, 0%)',
    width: '500px',
    zIndex: '10000',
  }
};

export const customStylesSmall = {
  content: {
    left: '50%',
    bottom: 'auto',
    transform: 'translate(-50%, 0%)',
    width: '600px',
    zIndex: '10000',
    height: 'auto',
    yOverflow: 'scroll',
    xOverflow: 'hidden'
  }
};

export function ObjectFieldTemplate(props) {
  return (
    <div className="row" id="initialsetupform">
      {props.title ? (
        <div className="col-md-12 col-sm-12">
          <h5 className="MuiTypography-root MuiTypography-h5">{props.title}</h5>
        </div>
      ) : null}

      {props.description ? (
        <div className="col-md-12 col-sm-12 text-left">
          <p>{props.description}</p>
        </div>
      ) : null}

      {props.properties.map((element) => (
        <div className={element.name + " col-md-3 col-sm-12 mb-3 " + element.id} id={element.id} key={element.id}>
          <React.Fragment>
            {element.content}
          </React.Fragment>
        </div>
      ))}
    </div>
  );
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#048c88',
      light: '#064e4a',
      dark: '#064e4a'
    },
    secondary: {
      main: '#49ae46',
      light: '#d5f2f0',
      dark: '#2e9a2b'
    }
  },
  props: {
    MuiButton: {
      size: 'medium',
    },
    MuiFilledInput: {},
    MuiFormControl: {},
    MuiFormHelperText: {},
    MuiIconButton: {
      size: 'medium',
    },
    MuiInputBase: {},
    MuiInputLabel: {},
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {},
    MuiFab: {
      size: 'medium',
    },
    MuiTable: {
      size: 'medium',
    },
    MuiTextField: {
      variant: "filled",
      size: "medium",
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },
  overrides: {},
});
