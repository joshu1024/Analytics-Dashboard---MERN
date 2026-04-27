import {  useAppSelector } from "../../../store";

const timeAgo = (date:string | undefined):string => {
    const now = new Date();
    const past = new Date(date ?? Date.now());

    if (isNaN(past.getTime())) return "just now";

    let diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 0) diff = Math.abs(diff);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (diff < 60) return `${diff}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  };
const RecentActivityFeed = () => {
const { recentActivity, loading, error } = useAppSelector((state) => ({
  recentActivity: state.dashboard.kpis?.recentActivity ?? [],
  loading: state.dashboard.loading,
  error: state.dashboard.error,
}));

if (loading) return <p>Loading...</p>;
if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-2 text-sm">
        {recentActivity.length === 0 ? (
      <p className="text-gray-400 text-sm">No recent activity</p>
           ) : (
      recentActivity.map((a, index) => (
             <li key={`${a.type}-${a.time}-${index}`} className="flex justify-between">
              <span>{a.type === "transaction" ? "💳" : "👤"}</span>
                <span>{a.message}</span>
                <span className="text-gray-400 text-xs">{timeAgo(a.time)}</span>
              </li>
            ))
         )}
       
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
