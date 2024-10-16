import React from "react";
import PropTypes from "prop-types";
import { default as ReactSelect } from "react-select";

const MySelect = ({ allowSelectAll, allOption, options, onChange, ...props }) => {
  const handleChange = (selected, event) => {
    if (selected !== null && selected.length > 0) {
      if (selected[selected.length - 1].value === allOption.value) {
        return onChange([allOption, ...options]);
      }
      let result = [];
      if (selected.length === options.length) {
        if (selected.includes(allOption)) {
          result = selected.filter(option => option.value !== allOption.value);
        } else if (event.action === "select-option") {
          result = [allOption, ...options];
        }
        return onChange(result);
      }
    }
    return onChange(selected);
  };

  return (
    <ReactSelect
      {...props}
      options={allowSelectAll ? [allOption, ...options] : options}
      onChange={allowSelectAll ? handleChange : onChange}
    />
  );
};

MySelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};

export default MySelect;
