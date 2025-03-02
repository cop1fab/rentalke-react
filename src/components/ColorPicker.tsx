import { FC } from "react";
import { FaPalette } from "react-icons/fa";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
      <FaPalette className="text-gray-500 mr-3" />
      <input
        type="color"
        value={color}
        onChange={onChange}
        className="cursor-pointer w-10 h-10 border-none"
      />
      <span className="ml-3 text-gray-800">{label}</span>
    </div>
  );
};

export default ColorPicker;
