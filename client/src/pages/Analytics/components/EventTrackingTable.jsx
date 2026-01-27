import { useSelector } from "react-redux";
const EventTrackingTable = () => {
  const { events } = useSelector((state) => state.analytics);
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-4">Event Tracking</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Event</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-b">
              <td className="py-2">{event.type.replace("_", " ")}</td>
              <td>{event.user?.fullName || "System"}</td>
              <td>{new Date(event.createdAt).toISOString().slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTrackingTable;
