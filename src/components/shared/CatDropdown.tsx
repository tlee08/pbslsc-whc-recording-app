import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface CatItem {
  label: string;
  value: string;
}

interface CatDropdownProps {
  title: string;
  data: CatItem[];
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
}

export default function CatDropdown({
  title,
  data,
  value,
  setValue,
  disabled,
}: CatDropdownProps) {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${title.toLowerCase()}-label`}>{title}</InputLabel>
      <Select
        labelId={`${title.toLowerCase()}-label`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={title}
        disabled={disabled}
      >
        {data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
