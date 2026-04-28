import { FC } from "react";

interface Props {
  onClose: () => void;
}
const UpgradePlanModal: FC<Props> =({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-semibold mb-3">Upgrade Plan</h3>
        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Upgrade
        </button>
        <button onClick={onClose} className="ml-3 text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpgradePlanModal;
