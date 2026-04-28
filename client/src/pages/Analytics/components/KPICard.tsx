interface KPICardProps {
  title:string,
  value:number | string
}

export const KPICard = ({ title, value }:KPICardProps) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);