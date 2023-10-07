"use client";

import useModal from "@/hooks/useModal";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// const timeSlots = [
//   {
//     time: "10 00",
//     availability: 4,
//   },
//   {
//     time: "11 00",
//     availability: 4,
//   },
//   {
//     time: "14 00",
//     availability: 4,
//   },
//   {
//     time: "15 00",
//     availability: 4,
//   },
//   {
//     time: "16 00",
//     availability: 4,
//   },
//   {
//     time: "17 00",
//     availability: 4,
//   },
// ];

interface CustomTimeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  buttonRef: RefObject<HTMLDivElement>;
}

function CustomTimeModal({
  isOpen,
  closeModal,
  buttonRef,
}: CustomTimeModalProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/75 absolute top-0 left-0">
      <div className="w-1/3 bg-white rounded-3xl" ref={buttonRef}></div>
    </div>
  );
}

function CustomTimeButton({
  setSelectedDate,
}: {
  setSelectedDate: Dispatch<SetStateAction<number>>;
}) {
  const [isButtonOpen, openButtonModal, closeButtonModal, buttonRef] =
    useModal(false);
  return (
    <div className="flex flex-col w-60 items-start justify-center">
      <button
        className="w-40 h-20 rounded-lg border-2 border-[#00B9BB]"
        onClick={() => {
          openButtonModal();
          setSelectedDate(-1);
        }}
      >
        <p>Custom Time</p>
      </button>
      <div className="flex flex-col items-center justify-center py-1">
        <p className="text-xs">if you have&nbsp;</p>
        <button>
          <p className="text-xs underline">extenuating circumstances</p>
        </button>
      </div>
      {isButtonOpen && (
        <CustomTimeModal
          isOpen={isButtonOpen}
          closeModal={closeButtonModal}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}

function PickTime({
  data,
  timeSlots,
  selectedDate,
  setSelectedDate,
}: {
  data: any[];
  timeSlots: any[];
  selectedDate: number;
  setSelectedDate: Dispatch<SetStateAction<number>>;
}) {
  const commonClassNames = (i: number) => ({
    border: i === selectedDate ? "border-[#00B9BB]" : "",
    text: i === selectedDate ? "text-[#00B9BB]" : "",
  });

  return (
    <div className="flex items-center justify-center gap-x-8">
      <div className="grid grid-cols-2 gap-4">
        {timeSlots.map((slot, i) => {
          const cNames = commonClassNames(i);
          return (
            <button
              key={i}
              className={`flex flex-col w-28 h-20 rounded-lg border-2 items-center justify-center ${cNames.border}`}
              onClick={() => setSelectedDate(i)}
            >
              <h3 className={`${cNames.text}`}>{slot.time}</h3>
              <p className={`text-xs ${cNames.text}`}>
                Availability: {slot.availability}
              </p>
            </button>
          );
        })}
      </div>
      <div className="w-[2px] h-60 mx-10 rounded-full bg-gray-400" />
      <CustomTimeButton setSelectedDate={setSelectedDate} />
    </div>
  );
}

export default function TimeSlotPicker() {
  const [data, setData] = useState<any>([]);
  const [timeSlots, setTimeSlots] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/rush-timeslot?collection=rush-timetables",
        );
        if (res.ok) {
          const jsonData = await res.json();
          setData(jsonData.data);
          setTimeSlots(jsonData.timeSlots);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-white items-center justify-center py-8 gap-y-6">
      <h2>Pick a timeslot for your team rush evaluation</h2>
      <PickTime
        data={data}
        timeSlots={timeSlots}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <p>
        {selectedDate != -1
          ? "Selected DateTime: " + timeSlots[selectedDate].time
          : ""}
      </p>
      <button className="w-60 rounded-full bg-[#00B9BB] py-2">
        <p>Confirm</p>
      </button>
    </div>
  );
}
