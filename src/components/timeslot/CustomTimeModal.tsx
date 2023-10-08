import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Collapse, Divider, useToast } from "@chakra-ui/react";

const time = [
  { time: "09 00" },
  { time: "10 00" },
  { time: "11 00" },
  { time: "12 00" },
  { time: "13 00" },
  { time: "14 00" },
  { time: "15 00" },
  { time: "16 00" },
  { time: "17 00" },
  { time: "18 00" },
  { time: "19 00" },
  { time: "20 00" },
  { time: "21 00" },
  { time: "22 00" },
  { time: "23 00" },
];

function TimePick({
  selectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate: number;
  selectedTime: number;
  setSelectedTime: Dispatch<SetStateAction<number>>;
}) {
  const commonClassNames = (i: number) => ({
    border: i === selectedTime ? "border-[#00B9BB]" : "",
    text: i === selectedTime ? "text-[#00B9BB]" : "",
  });

  return (
    <div>
      <h2 className="text-gray-500 mx-2">Time</h2>
      <div className="w-full grid grid-cols-3 gap-2">
        {time.map((time, i) => {
          const cNames = commonClassNames(i);
          return (
            <button
              key={i}
              className={`flex flex-col w-28 h-10 rounded-lg border-2 items-center justify-center ${
                cNames.border
              } ${
                selectedDate === 0 &&
                ((i >= 1 && i <= 2) || (i >= 5 && i <= 8)) &&
                "hidden"
              }`}
              onClick={() => setSelectedTime(i)}
            >
              <p className={`${cNames.text}`}>{time.time}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DatePick({
  nextMondayDate,
  selectedDate,
  setSelectedDate,
}: {
  nextMondayDate: number;
  selectedDate: number;
  setSelectedDate: Dispatch<SetStateAction<number>>;
}) {
  const getColor = (index) => {
    return `${selectedDate === index ? "text-[#00B9BB] border-[#00B9BB]" : ""}`;
  };

  return (
    <div>
      <h2 className="text-gray-500 mx-2">Date</h2>
      <div className="flex gap-x-4 my-3 w-full">
        <button
          className={`h-20 w-28 rounded-xl border-2 flex flex-col items-center justify-center shadow-md ${getColor(
            0,
          )}`}
          onClick={() => setSelectedDate(0)}
        >
          <p className={`text-sm ${getColor(0)}`}>Mon</p>
          <h3 className={`text-xl ${getColor(0)}`}>{nextMondayDate}</h3>
        </button>
        <button
          className={`h-20 w-28 rounded-xl border-2 flex flex-col items-center justify-center shadow-md ${getColor(
            1,
          )}`}
          onClick={() => setSelectedDate(1)}
        >
          <p className={`text-sm ${getColor(1)}`}>Tue</p>
          <h3 className={`text-xl ${getColor(1)}`}>{nextMondayDate + 1}</h3>
        </button>
      </div>
    </div>
  );
}

interface CustomTimeModalProps {
  setter: Dispatch<SetStateAction<Date>>;
  setMode: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  closeModal: () => void;
  buttonRef: RefObject<HTMLDivElement>;
}

export default function CustomTimeModal({
  setter,
  setMode,
  isOpen,
  closeModal,
  buttonRef,
}: CustomTimeModalProps) {
  const [selectedDate, setSelectedDate] = useState(-1);
  const [selectedTime, setSelectedTime] = useState(-1);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);

  const toast = useToast();

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysUntilMonday = 1 - currentDayOfWeek + 7;
  const nextMonday = new Date(
    currentDate.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000,
  );
  const nextMondayDate = nextMonday.getDate();

  const handleSetTime = () => {
    var finalDate = new Date(nextMonday);
    finalDate.setDate(finalDate.getDate() + selectedDate);
    const finalTime = time[selectedTime].time.split(" ");
    finalDate.setHours(Number(finalTime[0]));
    finalDate.setMinutes(Number(finalTime[1]));
    finalDate.setSeconds(0);
    finalDate.setMilliseconds(0);
    setter(finalDate);
    setMode(0);
    toast({
      title: "Set time successful",
      description: "burubiu burubiu",
      status: "success",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
    closeModal();
  };

  useEffect(() => {
    if (selectedDate !== -1) {
      setIsTimeOpen(true);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime !== -1) {
      setIsReasonOpen(true);
    }
  }, [selectedTime]);

  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen flex items-center justify-center bg-black/75 absolute top-0 left-0">
          <div
            className="flex flex-col bg-white rounded-3xl py-6 px-12 gap-y-4 gap-x-8 items-center"
            ref={buttonRef}
          >
            <DatePick
              nextMondayDate={nextMondayDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <Collapse in={isTimeOpen} animateOpacity>
              <TimePick
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            </Collapse>
            <Collapse in={isReasonOpen} animateOpacity className="w-[350px]">
              <div className="w-full flex flex-col items-center gap-y-4">
                <Divider orientation="horizontal" border="1px solid #00B9BB" />
                <button
                  className="w-60 rounded-full bg-[#00B9BB] py-2"
                  onClick={() => handleSetTime()}
                >
                  <p>Set custom time</p>
                </button>
              </div>
            </Collapse>
          </div>
        </div>
      )}
    </>
  );
}

//w-3/4 md:w-1/2 lg:w-1/3
