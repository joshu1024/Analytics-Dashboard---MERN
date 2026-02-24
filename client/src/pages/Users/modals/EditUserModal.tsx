import React, { FC } from "react";
interface EditUserModalProps {
  onClose: () => void;
}
const EditUserModal:FC<EditUserModalProps> = ({ onClose }) => {
  return (
    <div className="fixed bg-black bg-opacity-40 inset-0 items-center justify-center flex">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-2">Edit user</h3>
        <button onClick={onClose} className="text-blue-600 mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
