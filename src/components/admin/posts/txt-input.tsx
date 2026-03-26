export default function TxtInput({
  label,
  name,
  rows,
  placeholder,
  value,
  onChange,
  Icon,
}: {
  label: string;
  name: string;
  rows: number;
  placeholder: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  Icon?: React.ElementType;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <textarea
            id={name}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={onChange}
            className="peer block w-full rounded-md border py-2 pl-10 text-sm font-mono outline-2 placeholder:text-gray-300 bg-black border-gray-500"
          />
          {Icon && (
            <Icon className="pointer-events-none absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-300" />
          )}
        </div>
      </div>
    </div>
  );
}