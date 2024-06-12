import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const CommonSelect = ({
  value,
  placeholder,
  onChange,
  options,
  fullWidth = true,
  disabled = false
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Select
        sx={{ width: "200px" }}
        value={value}
        onChange={onChange}
        displayEmpty
        size="small"
        disabled={disabled}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            -- {placeholder} --
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ width: "200px", fontSize: "14px" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CommonSelect.propTypes = {
  //   label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
};

export default CommonSelect;
