import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import api from "../../../api/api";

const SignupsByCountryMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/analytics/signup-bycountry")
      .then((res) =>
        setData(res.data.map((d) => ({ country: d._id, count: d.count })))
      );
  }, []);
  /*   useEffect(() => {
    api.get("/analytics/signup-bycountry").then((res) => {
      console.log(res.data);
    });
  }, []); */

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">Signups by Country</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignupsByCountryMap;
