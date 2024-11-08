import React from 'react';
import Desk from './Desk';

interface Desk {
  id: number;
  type: "Individual" | "Team";
  isBooked: boolean;
}

interface DesksLayoutProps {
  desks: Desk[];
}

const DesksLayout: React.FC<DesksLayoutProps> = ({ desks }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {desks.map((desk) => (
        <Desk key={desk.id} desk={desk} />
      ))}
    </div>
  );
};

export default DesksLayout;
