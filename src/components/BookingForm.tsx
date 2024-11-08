import React, { useState } from 'react';

interface BookingDetails {
  membershipType: "Basic" | "Premium" | "Executive";
  duration: number;
  deskId: number;
}

interface Booking {
  membershipType: "Basic" | "Premium" | "Executive";
  cost: number;
  deskId: number;
}

interface Desk {
  id: number;
  type: "Individual" | "Team";
  isBooked: boolean;
}

interface BookingFormProps {
  desks: Desk[];
  onBookingComplete: (booking: Booking) => void;
}

const membershipRates = {
  Basic: 10,
  Premium: 15,
  Executive: 20,
};

const teamRate = 25;

const BookingForm: React.FC<BookingFormProps> = ({ desks, onBookingComplete }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    membershipType: "Basic",
    duration: 1,
    deskId: desks.find(d => !d.isBooked && d.type === "Individual")?.id || 0,
  });
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "duration" || name === "deskId" ? Number(value) : value,
    }));
  };

  const calculateBookingCost = () => {
    const desk = desks.find(d => d.id === bookingDetails.deskId);
    if (!desk || desk.isBooked) return;

    const hourlyRate = desk.type === "Individual"
      ? membershipRates[bookingDetails.membershipType]
      : teamRate;

    let total = hourlyRate * bookingDetails.duration;
    if (bookingDetails.duration > 3) {
      total *= 0.9; // Apply 10% discount
    }

    setTotalCost(total);
  };

  const handleBook = () => {
    if (totalCost === null) return;

    const newBooking: Booking = {
      membershipType: bookingDetails.membershipType,
      cost: totalCost,
      deskId: bookingDetails.deskId,
    };

    onBookingComplete(newBooking);

    // Reset form after booking
    setBookingDetails({
      membershipType: "Basic",
      duration: 1,
      deskId: desks.find(d => !d.isBooked && d.type === "Individual")?.id || 0,
    });
    setTotalCost(null);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Book a Desk</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium">Membership Type</label>
          <select
            name="membershipType"
            value={bookingDetails.membershipType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Basic">Basic - $10/hr</option>
            <option value="Premium">Premium - $15/hr</option>
            <option value="Executive">Executive - $20/hr</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Desk</label>
          <select
            name="deskId"
            value={bookingDetails.deskId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            {desks
              .filter(d => !d.isBooked)
              .map(desk => (
                <option key={desk.id} value={desk.id}>
                  {desk.type} Desk {desk.id}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Duration (Hours)</label>
          <input
            type="number"
            name="duration"
            value={bookingDetails.duration}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min={1}
          />
        </div>

        <button
          type="button"
          onClick={calculateBookingCost}
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
        >
          Calculate Cost
        </button>
      </form>

      {totalCost !== null && (
        <div className="mt-4 text-lg font-semibold">
          Total Cost: ${totalCost.toFixed(2)}
        </div>
      )}

      <button
        type="button"
        onClick={handleBook}
        className={`w-full bg-green-500 text-white p-2 rounded mt-2 ${totalCost === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={totalCost === null}
      >
        Book
      </button>
    </div>
  );
};

export default BookingForm;
