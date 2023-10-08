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
  Collapse,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import CustomTimeModal from "./CustomTimeModal";
import axios from "axios";

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

function CustomTimeSlots({
  student,
  setFinalDate,
  setReason,
  setMode,
  setSelectedDate,
}: {
  student: string;
  setFinalDate: Dispatch<SetStateAction<Date>>;
  setReason: Dispatch<SetStateAction<String>>;
  setMode: Dispatch<SetStateAction<number>>;
  setSelectedDate: Dispatch<SetStateAction<number>>;
}) {
  const [isCTOpen, openCTModal, closeCTModal, CTRef] = useModal(false);
  const [isECOpen, openECModal, closeECModal, ECRef] = useModal(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    setReason(inputValue);
  };

  return (
    <div
      className={`flex flex-col w-60 justify-center ${
        student === "pisciner" ? " items-start" : "items-center"
      }`}
    >
      {student === "pisciner" && (
        <>
          <h3>Custom Time Slots</h3>
          <div className="flex items-start justify-center py-1">
            <p className="text-xs">if you have&nbsp;</p>
            <button onClick={() => openECModal()}>
              <p className="text-xs underline">extenuating circumstances</p>
            </button>
          </div>
          <div className="h-[176px] w-full flex item-center my-4">
            <p className="flex items-center">No custom timeslots found :(</p>
          </div>
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="Reason for requiring a custom time slot."
            className="w-full rounded-lg py-1 px-2 outline-none border-2 text-sm"
          />

          {isECOpen && (
            <ExtCircumModal
              isOpen={isECOpen}
              closeModal={closeECModal}
              buttonRef={ECRef}
            />
          )}
        </>
      )}
      {student === "cadet" && (
        <>
          <button
            className="w-40 h-20 rounded-lg border-2 border-[#00B9BB]"
            onClick={() => {
              openCTModal();
              setSelectedDate(-1);
              setFinalDate(null);
            }}
          >
            <p>Custom Time</p>
          </button>
          {isCTOpen && (
            <CustomTimeModal
              setter={setFinalDate}
              setMode={setMode}
              isOpen={isCTOpen}
              closeModal={closeCTModal}
              buttonRef={CTRef}
            />
          )}
        </>
      )}
    </div>
  );
}

function PickTime({
  data,
  student,
  timeSlots,
  selectedDate,
  setSelectedDate,
}: {
  data: any[];
  student: string;
  timeSlots: any[];
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
        {timeSlots.map((slot, i) => {
          const cNames = commonClassNames(i, slot.availability);
          return (
            <button
              key={i}
              className={`flex flex-col w-28 h-20 rounded-lg border-2 items-center justify-center ${
                slot.availability === 0 && "bg-gray-300 border-gray-300"
              } ${cNames.border}`}
              onClick={
                slot.availability !== 0 ? () => setSelectedDate(i) : () => null
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

export default function TimeSlotPicker({ student }: { student: string }) {
  const [subscribed, setSubscribed] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [data, setData] = useState<any>([]);
  const [timeSlots, setTimeSlots] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState(-1);
  const [finalDate, setFinalDate] = useState(null);
  const [mode, setMode] = useState(-1);
  const [reason, setReason] = useState("");

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysUntilMonday = 1 - currentDayOfWeek + 7;
  const nextMonday = new Date(
    currentDate.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000,
  );

  const toast = useToast();

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
          onToggle();
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate !== -1) {
      var convertDate = new Date(nextMonday);
      const convertTime = timeSlots[selectedDate].time.split(" ");
      convertDate.setHours(Number(convertTime[0]));
      convertDate.setMinutes(Number(convertTime[1]));
      convertDate.setSeconds(0);
      convertDate.setMilliseconds(0);
      console.log(convertDate, convertDate.getMonth());
      setFinalDate(convertDate);
      setMode(1);
    }
  }, [selectedDate]);

  const handleUpload = () => {
    if (student === "pisciner") {
      const body = {
        dateTime: finalDate,
        evaluator: "winna",
        isDefault: mode,
        teamId: "",
        customReason: reason,
      };
      axios
        .post("/api/rush-timeslot?collection=rush-timetables", body)
        .then(() => {
          onToggle();
          setSubscribed(true);
          toast({
            title: "Date confirmed",
            description:
              "Please look out for email/discord dm for slot confirmation.",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          if (error.response) {
            toast({
              title: "Wo mei KKK",
              description: error.response,
              status: "error",
              position: "top-right",
              duration: 5000,
              isClosable: true,
            });
          }
        });
    } else if (student === "cadet") {
      console.log("Mode", mode);
    }
  };

  return (
    <>
      <Collapse in={isOpen} animateOpacity className="w-full h-full">
        <div className="flex flex-col w-full h-full bg-white items-center justify-center py-8 gap-y-6">
          <h2>Pick a timeslot for your team rush evaluation</h2>
          <div className="flex gap-x-8">
            <div>
              <PickTime
                data={data}
                student={student}
                timeSlots={timeSlots}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <Box
              position="relative"
              className="flex mx-8 items-center"
              padding="4"
            >
              <Center className="h-full">
                <Divider orientation="vertical" border="1px solid #00B9BB" />
              </Center>
              <AbsoluteCenter bg="white" px="4">
                or
              </AbsoluteCenter>
            </Box>
            <CustomTimeSlots
              student={student}
              setFinalDate={setFinalDate}
              setReason={setReason}
              setMode={setMode}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <Collapse
            in={finalDate !== null}
            animateOpacity
            className="w-[540px]"
          >
            <div className="w-full flex flex-col items-center">
              <Divider orientation="horizontal" border="1px solid #00B9BB" />
              {finalDate !== null && (
                <>
                  <p className="text-gray-500 mt-4">Your selected time</p>
                  <h3 className="text-[#00B9BB] text-xl mb-4">
                    {finalDate?.getDate().toString() +
                      "/" +
                      (finalDate?.getUTCMonth() + 1).toString() +
                      "/" +
                      finalDate?.getUTCFullYear().toString() +
                      " " +
                      finalDate?.getHours().toString() +
                      ":00"}
                  </h3>
                  <button
                    className="w-60 rounded-full bg-[#00B9BB] py-2"
                    onClick={handleUpload}
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          </Collapse>
        </div>
      </Collapse>
      {subscribed && student === "pisciner" && (
        <div className="w-full h-full flex flex-col items-center justify-center mt-40">
          <h2>You have successfully registered for a defense!</h2>
        </div>
      )}
    </>
  );
}
