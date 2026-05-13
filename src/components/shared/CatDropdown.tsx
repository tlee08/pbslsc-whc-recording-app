import { Select } from "@mantine/core";

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
    <Select
      label={title}
      data={data}
      value={value || null}
      onChange={(val) => setValue(val ?? "")}
      disabled={disabled}
    />
  );
}
