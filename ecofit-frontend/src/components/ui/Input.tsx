interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  step?: string;
  className?: string;
}

export function Input({ label, type = 'text', value, onChange, placeholder, required, step, className = '' }: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-semibold text-[#3C5A1A]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        className="px-4 py-2.5 rounded-lg border border-[#D8D4C5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A3B27A] focus:border-transparent text-sm"
      />
    </div>
  );
}
