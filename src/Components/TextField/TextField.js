// CustomTextField.js
import React from 'react';
import { TextField, FormHelperText, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

const CustomTextField = ({
    control,
    name,
    label,
    rules,
    defaultValue = "",
    variant = "filled",
    error,
    helperText,
    required = false,
    placeholder = "",
    type = "text",
    options = [],
    isMulti = false,
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState }) => (
                <div>
                    {type === 'reactSelect' ? (
                        <ReactSelect
                            {...field}
                            options={options}
                            isMulti={isMulti}
                            placeholder={placeholder}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={(selectedOptions) => field.onChange(selectedOptions)}
                            allowSelectAll={true}
                            styles={props.styles}
                        />
                    ) : type === 'select' ? (
                        <TextField
                            select
                            {...field}
                            label={label}
                            variant={variant}
                            error={fieldState.error}
                            fullWidth
                            placeholder={placeholder}
                            required={required}
                            helperText={fieldState.error?.message}
                            {...props}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    ) : type === 'date' ? (
                        <TextField
                            {...field}
                            type="date"
                            label={label}
                            variant={variant}
                            error={fieldState.error}
                            fullWidth
                            placeholder={placeholder}
                            required={required}
                            InputLabelProps={{ shrink: true }}
                            helperText={fieldState.error?.message}
                            {...props}
                        />
                    ) : (
                        <TextField
                            {...field}
                            label={label}
                            variant={variant}
                            error={fieldState.error}
                            fullWidth
                            placeholder={placeholder}
                            type={type}
                            required={required}
                            helperText={fieldState.error?.message}
                            {...props}
                        />
                    )}
                </div>
            )}
        />
    );
};

export default CustomTextField;