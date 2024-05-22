import PropTypes from "prop-types";
import { FormControl, Select, MenuItem } from "@mui/material";

const CommonSelect = ({
  value,
  onChange,
  options,
  fullWidth = true,
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Select sx={{width:"200px"}} size="small" value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
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
