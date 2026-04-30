import { useEffect, useState } from "react";
import {  useAppSelector } from "../../../store";
import { fetchEvents } from "../../../store/slices/analyticsSlice";
import { useAppDispatch } from "../../../store/hooks";
const EventTrackingTable = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.analytics ?? []);

  useEffect(() => {
    dispatch(fetchEvents({ page, limit: 10 }));
  }, [page]); 

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
        {events.map((event) => (
          <tr key={event._id} className="border-b">
            <td className="py-2">{event.type.replaceAll("_", " ")}</td>
            <td>{event.user?.fullName || "System"}</td>
            <td>{new Date(event.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 bg-gray-100 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventTrackingTable;
