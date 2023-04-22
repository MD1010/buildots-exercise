import { useId, useState } from "react";

export interface Filter {
  onChange: (value: string) => void;
  options: string[];
  label: string;
  enabled: boolean;
}

export const Select = ({ options, label, onChange, enabled }: Filter) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <span>{label}</span>
      <select style={{ width: 200, margin: 10 }} value={selectedValue} onChange={handleChange} disabled={!enabled}>
        <option value="" disabled hidden>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const NavigationBar = ({ filters }: { filters: Filter[] }) => {
  return (
    <div style={{ padding: 10, display: "flex", gap: 10 }}>
      {filters.map(({ label, options, onChange, enabled }) => {
        return <Select key={useId()} enabled={enabled} label={label} options={options} onChange={onChange} />;
      })}
    </div>
  );
};
