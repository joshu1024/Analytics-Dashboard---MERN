const EventTrackingTable = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-4">Event Tracking</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Event</th>
            <th className="text-left py-2">User</th>
            <th className="text-left py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">Login</td>
            <td>Joe</td>
            <td>2026-01-10</td>
          </tr>
          <tr>
            <td className="py-2">Company Created</td>
            <td>Admin</td>
            <td>2026-01-09</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventTrackingTable;
