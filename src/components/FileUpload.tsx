import { FC } from "react";
import { FaUpload } from "react-icons/fa";

interface FileUploadProps {
  onUpload: (file: File) => void;
  fileName: string | null;
}

const FileUpload: FC<FileUploadProps> = ({ onUpload, fileName }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0]);
    }
  };

  return (
    <label className="cursor-pointer">
      <div className="flex items-center bg-gray-100 p-3 rounded-lg">
        <FaUpload className="text-gray-500 mr-3" />
        <span className="text-gray-800">{fileName || "Upload your logo"}</span>
      </div>
      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </label>
  );
};

export default FileUpload;
