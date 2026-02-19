import React from "react";
interface  StatCardProps 
{
  title:string,
  value:number
}
const StatCards:React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm to-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatCards;
