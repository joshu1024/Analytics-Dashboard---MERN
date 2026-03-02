import {FC} from "react";
interface ResetPasswordModalProps {
  onClose: () => void;
}
const ResetPasswordModal:FC<ResetPasswordModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded shadow w-96 p-6">
        <h3 className="font-semibold mb-4">Reset User Password</h3>
        <input type="text" className="border w-full py-2 rounded mb-4" />
        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Reset
        </button>
        <button onClick={onClose} className="ml-3 text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
