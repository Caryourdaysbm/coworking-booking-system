import React from 'react';

interface DeskProps {
  desk: {
    id: number;
    type: "Individual" | "Team";
    isBooked: boolean;
  };
}

const Desk: React.FC<DeskProps> = ({ desk }) => (
  <div
    className={`p-4 border rounded text-center ${
      desk.isBooked ? 'bg-red-200' : 'bg-green-200'
    }`}
  >
    {desk.type} Desk {desk.id} {desk.isBooked ? '(Booked)' : '(Available)'}
  </div>
);

export default Desk;
