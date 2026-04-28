import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAppSelector} from "../../../store"
 const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#893F45",
  ];
const UserDemographicsChart = () => {
  const { demographics, loading, error } = useAppSelector((state) => state.analytics);

  if (!demographics.length) return <p className="text-gray-400">No demographics data available</p>;
  if (loading) return <p>Loading demographics data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">User Demographics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={demographics} dataKey="value" nameKey="name" label>
            {demographics.map((entry, index) => (
              <Cell key={entry.value} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDemographicsChart;
