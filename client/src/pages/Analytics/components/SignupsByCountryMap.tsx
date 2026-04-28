import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { LabelList } from "recharts";
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#893F45",
];
import { useAppSelector} from  "../../../store"
import { SignupByCountry } from "../../../types/analytics";
const SignupsByCountryMap = () => {
 const { data2, loading, error } = useAppSelector((state) => state.analytics);
  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p>Loading signups by country data...</p>;
  const info = data2
    .map((d) => ({ country: d._id, count: d.count }))
    .sort((a, b) => b.count - a.count);
  if (!info.length) return <p className="text-gray-400">No signup data available</p>;
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">Signups by Country</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={info}>
          <XAxis dataKey="country" />
          <YAxis
            allowDecimals={false}
            tickCount={10}
            domain={[0, (dataMax) => dataMax + 1]}
          />

          <Tooltip />
          <Bar dataKey="count" barSize={24}>
            <LabelList dataKey="count" position="top" />
            {info.map((_, index) => (
            <Cell key={info[index].country} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignupsByCountryMap;
