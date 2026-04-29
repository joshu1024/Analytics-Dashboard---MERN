import { useAppSelector } from "../../../store";
import { useAppDispatch } from "../../../store/hooks";
import { GenerateApiKeySettings } from "../../../store/slices/settingsSlice";

const APIKeysManager = () => {
  const dispatch = useAppDispatch();
  const { settings, loading } = useAppSelector((state) => state.settings);
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-semibold mb-2">API Keys</h3>
      <button
        onClick={() => dispatch(GenerateApiKeySettings())}
        disabled={loading}
        className="bg-slate-900 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Key"}
      </button>
      
    </div>
  );
};

export default APIKeysManager;
