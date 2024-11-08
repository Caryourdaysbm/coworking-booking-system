import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import Dashboard from './components/Dashboard';
import DesksLayout from './components/DesksLayout';

interface Desk {
  id: number;
  type: "Individual" | "Team";
  isBooked: boolean;
}

interface Booking {
  membershipType: "Basic" | "Premium" | "Executive";
  cost: number;
  deskId: number;
}

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [desks, setDesks] = useState<Desk[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      type: i < 10 ? "Individual" : "Team",
      isBooked: false,
    }))
  );

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings((prevBookings) => [...prevBookings, newBooking]);
    setDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === newBooking.deskId ? { ...desk, isBooked: true } : desk
      )
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Co-working Space Booking System</h1>
      <DesksLayout desks={desks} />
      <BookingForm desks={desks} onBookingComplete={handleBookingComplete} />
      <Dashboard bookings={bookings} />
    </div>
  );
};

export default App;
