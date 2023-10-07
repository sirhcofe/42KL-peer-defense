import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Collapse, Center, Divider } from "@chakra-ui/react";

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
  selectedTime,
  setSelectedTime,
  setCustomTime,
}: {
  selectedTime: number;
  setSelectedTime: Dispatch<SetStateAction<number>>;
  setCustomTime: Dispatch<SetStateAction<string>>;
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
              className={`flex flex-col w-28 h-10 rounded-lg border-2 items-center justify-center ${cNames.border}`}
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
  selectedDate,
  setSelectedDate,
  setCustomDate,
}: {
  selectedDate: number;
  setSelectedDate: Dispatch<SetStateAction<number>>;
  setCustomDate: Dispatch<SetStateAction<string>>;
}) {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysUntilMonday = 1 - currentDayOfWeek + 7;
  const nextMonday = new Date(
    currentDate.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000,
  ).getDate();

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
          <h3 className={`text-xl ${getColor(0)}`}>{nextMonday}</h3>
        </button>
        <button
          className={`h-20 w-28 rounded-xl border-2 flex flex-col items-center justify-center shadow-md ${getColor(
            1,
          )}`}
          onClick={() => setSelectedDate(1)}
        >
          <p className={`text-sm ${getColor(1)}`}>Tue</p>
          <h3 className={`text-xl ${getColor(1)}`}>{nextMonday + 1}</h3>
        </button>
      </div>
    </div>
  );
}

interface CustomTimeModalProps {
  setter: () => void;
  isOpen: boolean;
  closeModal: () => void;
  buttonRef: RefObject<HTMLDivElement>;
}

export default function CustomTimeModal({
  setter,
  isOpen,
  closeModal,
  buttonRef,
}: CustomTimeModalProps) {
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(-1);
  const [selectedTime, setSelectedTime] = useState(-1);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
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
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setCustomDate={setCustomDate}
            />
            <Collapse in={isTimeOpen} animateOpacity>
              <TimePick
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                setCustomTime={setCustomTime}
              />
            </Collapse>
            <Collapse in={isReasonOpen} animateOpacity className="w-[350px]">
              <div className="w-full flex flex-col items-center gap-y-4">
                <Divider orientation="horizontal" border="1px solid #00B9BB" />
                <textarea
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Reason for requiring a custom time slot."
                  className="w-full rounded-xl py-2 px-4 outline-none border-2"
                />
                <button className="w-60 rounded-full bg-[#00B9BB] py-2">
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
