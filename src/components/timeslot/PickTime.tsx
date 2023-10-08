import { Dispatch, SetStateAction } from "react";

export default function PickTime({
  data,
  student,
  timeSlots,
  cadetTimeSlots,
  selectedDate,
  setSelectedDate,
}: {
  data: any[];
  student: string;
  timeSlots: any[];
  cadetTimeSlots: any[];
  selectedDate: number;
  setSelectedDate: Dispatch<SetStateAction<number>>;
}) {
  const commonClassNames = (i: number, avail: number) => ({
    border: i === selectedDate ? "border-[#00B9BB]" : "",
    text:
      (i === selectedDate && "text-[#00B9BB]") ||
      (avail === 0 && "text-gray-500"),
  });

  return (
    <div className="flex h-full items-center justify-center">
      <div className={`grid grid-cols-2 gap-4`}>
        {student === "pisciner" &&
          timeSlots.map((slot, i) => {
            const cNames = commonClassNames(i, slot.availability);
            return (
              <button
                key={i}
                className={`flex flex-col w-28 h-20 rounded-lg border-2 items-center justify-center ${
                  slot.availability === 0 && "bg-gray-300 border-gray-300"
                } ${cNames.border}`}
                onClick={
                  slot.availability !== 0
                    ? () => setSelectedDate(i)
                    : () => null
                }
              >
                <h3 className={`${cNames.text}`}>{slot.time}</h3>
                <p className={`text-xs ${cNames.text}`}>
                  Availability: {slot.availability}
                </p>
              </button>
            );
          })}
        {student === "cadet" &&
          cadetTimeSlots.map((slot, i) => {
            const cNames = commonClassNames(i, slot.availability);
            return (
              <button
                key={i}
                className={`flex flex-col w-28 h-20 rounded-lg border-2 items-center justify-center ${
                  slot.availability === 0 && "bg-gray-300 border-gray-300"
                } ${cNames.border}`}
                onClick={
                  slot.availability !== 0
                    ? () => setSelectedDate(i)
                    : () => null
                }
              >
                <h3 className={`${cNames.text}`}>{slot.time}</h3>
                <p className={`text-xs ${cNames.text}`}>
                  Availability: {slot.availability}
                </p>
              </button>
            );
          })}
      </div>
    </div>
  );
}
