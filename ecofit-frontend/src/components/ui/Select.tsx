interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function Select({ label, value, onChange, options, placeholder, required, className = '' }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-semibold text-[#3C5A1A]">{label}</label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-2.5 rounded-lg border border-[#D8D4C5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A3B27A] focus:border-transparent text-sm appearance-none"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
