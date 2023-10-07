"use client";

import useModal from "@/hooks/useModal";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Divider,
  AbsoluteCenter,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import CustomTimeModal from "./CustomTimeModal";

interface ExtCircumModalProps {
  isOpen: boolean;
  closeModal: () => void;
  buttonRef: RefObject<HTMLDivElement>;
}

function ExtCircumModal({
  isOpen,
  closeModal,
  buttonRef,
}: ExtCircumModalProps) {
  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen flex items-center justify-center bg-black/75 absolute top-0 left-0">
          <div
            className="flex flex-col w-5/6 md:w-3/4 lg:w-1/2 bg-white rounded-3xl py-4 px-10 gap-y-3"
            ref={buttonRef}
          >
            <h2>Sample extenuating circumstances</h2>
            <p className="text-xs text-gray-500">
              Extenuating circumstances are only recognized and considered when
              they meet predetermined criteria. Such criteria may include but
              are not limited to:
            </p>
            <p>1. Let us win plis</p>
          </div>
        </div>
      )}
    </>
  );
}

function CustomTimeButton({
  setSelectedDate,
}: {
  setSelectedDate: Dispatch<SetStateAction<number>>;
}) {
  const [isCTOpen, openCTModal, closeCTModal, CTRef] = useModal(false);
  const [isECOpen, openECModal, closeECModal, ECRef] = useModal(false);

  return (
    <div className="flex flex-col w-60 items-start justify-center">
      <button
        className="w-40 h-20 rounded-lg border-2 border-[#00B9BB]"
        onClick={() => {
          openCTModal();
          setSelectedDate(-1);
        }}
      >
        <p>Custom Time</p>
      </button>
      <div className="flex flex-col items-center justify-center py-1">
        <p className="text-xs">if you have&nbsp;</p>
        <button onClick={() => openECModal()}>
          <p className="text-xs underline">extenuating circumstances</p>
        </button>
      </div>
      {isCTOpen && (
        <CustomTimeModal
          setter={() => setSelectedDate}
          isOpen={isCTOpen}
          closeModal={closeCTModal}
          buttonRef={CTRef}
        />
      )}
      {isECOpen && (
        <ExtCircumModal
          isOpen={isECOpen}
          closeModal={closeECModal}
          buttonRef={ECRef}
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
    <div className="flex h-full items-center justify-center gap-x-8">
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
      <Box position="relative" padding="16">
        <Center height={"240px"}>
          <Divider orientation="vertical" border="1px solid #00B9BB" />
        </Center>
        <AbsoluteCenter bg="white" px="4">
          or
        </AbsoluteCenter>
      </Box>
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
      <p className="h-8 items-center justify-center">
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
