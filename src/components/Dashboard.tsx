import React from 'react';

interface Booking {
  membershipType: "Basic" | "Premium" | "Executive";
  cost: number;
}

interface DashboardProps {
  bookings: Booking[];
}

const Dashboard: React.FC<DashboardProps> = ({ bookings }) => {
  const revenueByTier = bookings.reduce((acc, booking) => {
    acc[booking.membershipType] = (acc[booking.membershipType] || 0) + booking.cost;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">Revenue Dashboard</h2>
      {Object.entries(revenueByTier).map(([tier, revenue]) => (
        <div key={tier} className="flex justify-between my-2">
          <span>{tier} Membership:</span>
          <span>${revenue.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
