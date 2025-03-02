import { FC } from "react";

interface TextInputProps {
  icon: JSX.Element;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const TextInput: FC<TextInputProps> = ({ icon, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500">
      <span className="text-gray-500">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 ml-3 text-base"
      />
    </div>
  );
};

export default TextInput;
