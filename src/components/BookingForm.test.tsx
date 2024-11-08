import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

const desks = [
  { id: 1, type: 'Individual', isBooked: false },
  { id: 2, type: 'Individual', isBooked: false },
  { id: 3, type: 'Team', isBooked: false },
];

const onBookingComplete = jest.fn();

describe('BookingForm Component', () => {
  beforeEach(() => {
    onBookingComplete.mockClear();
    render(<BookingForm desks={desks} onBookingComplete={onBookingComplete} />);
  });

  test('renders form fields', () => {
    expect(screen.getByLabelText('Membership Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Desk')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration (Hours)')).toBeInTheDocument();
    expect(screen.getByText('Calculate Cost')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
  });

  test('calculates cost correctly without discount', () => {
    fireEvent.change(screen.getByLabelText('Membership Type'), { target: { value: 'Premium' } });
    fireEvent.change(screen.getByLabelText('Duration (Hours)'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Calculate Cost'));

    expect(screen.getByText(/Total Cost: \$30.00/)).toBeInTheDocument();
  });

  test('calculates cost correctly with discount', () => {
    fireEvent.change(screen.getByLabelText('Membership Type'), { target: { value: 'Executive' } });
    fireEvent.change(screen.getByLabelText('Duration (Hours)'), { target: { value: 4 } });
    fireEvent.click(screen.getByText('Calculate Cost'));

    expect(screen.getByText(/Total Cost: \$72.00/)).toBeInTheDocument();
  });

  test('disables book button until cost is calculated', () => {
    const bookButton = screen.getByText('Book');
    expect(bookButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Membership Type'), { target: { value: 'Basic' } });
    fireEvent.change(screen.getByLabelText('Duration (Hours)'), { target: { value: 1 } });
    fireEvent.click(screen.getByText('Calculate Cost'));

    expect(bookButton).not.toBeDisabled();
  });

  test('marks desk as booked after booking', () => {
    fireEvent.change(screen.getByLabelText('Desk'), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText('Membership Type'), { target: { value: 'Premium' } });
    fireEvent.change(screen.getByLabelText('Duration (Hours)'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Calculate Cost'));
    fireEvent.click(screen.getByText('Book'));

    expect(onBookingComplete).toHaveBeenCalledWith(expect.objectContaining({
      deskId: 1,
      cost: 30,
    }));

    render(<BookingForm desks={[...desks, { id: 1, type: 'Individual', isBooked: true }]} onBookingComplete={onBookingComplete} />);
    expect(screen.getByLabelText('Desk').querySelector('option[value="1"]')).toBeDisabled();
  });

  test('prevents double booking', () => {
    const newDesks = [...desks, { id: 1, type: 'Individual', isBooked: true }];
    render(<BookingForm desks={newDesks} onBookingComplete={onBookingComplete} />);

    fireEvent.change(screen.getByLabelText('Desk'), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText('Membership Type'), { target: { value: 'Basic' } });
    fireEvent.change(screen.getByLabelText('Duration (Hours)'), { target: { value: 2 } });
    fireEvent.click(screen.getByText('Calculate Cost'));

    expect(screen.queryByText('Book')).toBeDisabled();
  });
});

