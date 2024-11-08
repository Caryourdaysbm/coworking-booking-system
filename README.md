
# Co-working Space Booking System

This is a simple web application that allows users to book desks in a co-working space. The system includes options for different membership tiers and applies discounts for long bookings. Built with **React.js**, **TypeScript**, and **Tailwind CSS**, it provides a dynamic and visually responsive interface for booking desks and viewing real-time availability.

## Features

- **Desk Selection**: Users can choose from 10 individual desks and 5 team desks.
- **Membership Tiers**: Three tiers for individual desks: Basic, Premium, and Executive, each with different pricing.
- **Fixed Team Desk Pricing**: All team desks are priced at $25/hour.
- **Discounts**: A 10% discount is applied automatically for bookings over 3 hours.
- **Real-Time Desk Availability**: Prevents double bookings by marking desks as booked.
- **Dashboard** (Optional): Displays the total revenue collected by membership tier.

## Demo

![Booking System Demo](demo.gif)

## Getting Started

### Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/co-working-booking-system.git
   cd co-working-booking-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or if you're using yarn:

   ```bash
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   or with yarn:

   ```bash
   yarn start
   ```

4. **Open the application:**

   The app will be accessible at `http://localhost:3000` in your browser.

## Usage

1. **Select Membership Type**: Choose your membership tier (Basic, Premium, or Executive) for individual desks. Team desks have a fixed hourly rate.
2. **Choose Desk and Duration**:
   - Select an available desk from the dropdown.
   - Enter the number of hours for the booking.
3. **Calculate Cost**:
   - Click the **"Calculate Cost"** button. The app will calculate the total, applying any discounts for bookings over 3 hours.
4. **Book the Desk**:
   - Once the cost is calculated, click **"Book"** to confirm the booking.
   - The desk will be marked as booked and unavailable for others.
5. **Dashboard (Optional)**:
   - Access the dashboard to view total revenue and breakdown by membership tier.

## Project Structure

- **src/components**
  - `BookingForm.tsx`: Handles the booking form UI, cost calculations, and booking logic.
  - `DeskList.tsx`: Displays desks and their availability status.
  - `Dashboard.tsx`: Optional feature to view revenue statistics.
- **src/hooks**
  - Custom hooks, such as `useBooking`, for managing booking state and availability.
- **src/utils**
  - `costCalculator.ts`: Utility function to handle cost and discount calculations.

## Testing

This project uses **Jest** and **React Testing Library** for testing.

To run tests:

```bash
npm test
```

### Test Coverage

- **Cost Calculations**: Ensures the system applies correct rates and discounts.
- **Desk Availability**: Verifies desks are marked as booked and cannot be double-booked.
- **Button State**: Confirms that the "Book" button only enables after cost calculation.

## Deployment

You can deploy this app on [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static site hosting provider that supports React apps.

1. **Build the app**:

   ```bash
   npm run build
   ```

2. **Deploy**:
   - Follow the deployment instructions for your chosen platform. Upload the contents of the `build` folder to complete the deployment.

## Technologies Used

- **React.js** with **TypeScript**: For building the front-end application.
- **Tailwind CSS**: For responsive, utility-first styling.
- **Jest** and **React Testing Library**: For unit and integration testing.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to run all tests before submitting.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Created by **Oluwakayode Samuel Adeyemi** - [Linkedin](https://www.linkedin.com/in/adeyemioluwakayode) | [GitHub](https://github.com/caryourdaysbm)
```
