import React, { useState } from 'react';

interface ScheduleSlot {
  day: string;
  time: string;
}

interface JadwalWawancaraProps {
  category: "Himakom" | "OmahTI";
}

const JadwalWawancara: React.FC<JadwalWawancaraProps> = ({ category }) => {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);

  const schedule: { [key: string]: string[] } = {
    "Senin": [
      "10.15 - 10.45", "11.00 - 11.30", "13.30 - 14.00", 
      "14.15 - 14.45", "15.00 - 15.30", "15.45 - 16.15"
    ],
    "Selasa": [
      "10.15 - 10.45", "11.00 - 11.30", "13.30 - 14.00", 
      "14.15 - 14.45", "15.00 - 15.30", "15.45 - 16.15"
    ],
    "Rabu": ["18.30 - 19.00", "19.15 - 19.45", "20.00 - 20.30"],
    "Kamis": ["18.30 - 19.00", "19.15 - 19.45", "20.00 - 20.30"],
    "Jum'at": ["18.30 - 19.00", "19.15 - 19.45", "20.00 - 20.30"]
  };

  const dateMapping: { [key: string]: string } = {
    "Senin": "11 Nov",
    "Selasa": "12 Nov",
    "Rabu": "13 Nov",
    "Kamis": "14 Nov",
    "Jum'at": "15 Nov"
  };

  const handleSlotClick = (day: string, time: string) => {
    setSelectedSlot({ day, time });
  };

  return (
    <div className="w-full h-auto bg-white p-4 rounded-md">
      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto">
        {Object.keys(schedule).map((day) => (
          <div key={day}>
            <h3 
              className={`text-center text-base font-semibold mb-2 ${
                category === "Himakom" ? 'text-custom-blue' : 'text-custom-orange'
              }`}
            >
              {day}
            </h3>
            <h3 
              className={`text-center text-xl font-semibold mb-2 ${
                category === "Himakom" ? 'text-custom-blue' : 'text-custom-orange'
              }`}
            >
              {dateMapping[day]}
            </h3>
            {schedule[day].map((time) => (  
              <button 
                key={time}
                onClick={() => handleSlotClick(day, time)}
                className={`w-full py-2 mb-2 rounded ${
                  selectedSlot?.day === day && selectedSlot?.time === time
                    ? (category === "Himakom" ? 'bg-custom-blue text-white' : 'bg-custom-orange text-white')
                    : 'bg-gray-200 text-gray-800'
                }`}                  
              >
                {time}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JadwalWawancara;
