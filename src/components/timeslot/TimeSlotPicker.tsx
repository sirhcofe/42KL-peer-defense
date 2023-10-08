"use client";

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
  ToastOptions,
} from "@chakra-ui/react";
import CustomTimeModal from "./CustomTimeModal";
import axios from "axios";
import PickTime from "./PickTime";
import CustomTimeSlots from "./CustomTimeSlots";
import { useUserContext } from "@/hooks/dataProvider/UserDataProvider";
import { useRouter } from "next/navigation";
import CountdownTimer from "../CountdownTimer";

export default function TimeSlotPicker({ student }: { student: string }) {
  const [subscribed, setSubscribed] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [piscineData, setPiscineData] = useState<any>([]);
  const [cadetData, setCadetData] = useState<any>([]);
  const [timeSlots, setTimeSlots] = useState<any>([]);
  const [cadetTimeSlots, setCadetTimeSlots] = useState<any>([]);
  const [cadetCustomSlots, setCadetCustomSlots] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState(-1);
  const [selectedCadetDate, setSelectedCadetDate] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [finalDate, setFinalDate] = useState(null);
  const [mode, setMode] = useState(-1);
  const [reason, setReason] = useState("");

  const { userKind } = useUserContext();

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysUntilMonday = 1 - currentDayOfWeek + 7;
  const nextMonday = new Date(
    currentDate.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000,
  );

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/rush-timeslot?collection=rush-timetables",
        );
        if (res.ok) {
          const jsonData = await res.json();
          setPiscineData(jsonData.data);
          setTimeSlots(jsonData.timeSlots);
          try {
            const res = await fetch(
              "http://localhost:3000/api/rush-timeslot?collection=cadet-slot",
            );
            if (res.ok) {
              const jsonData = await res.json();
              console.log("JSON", jsonData);
              setCadetData(jsonData.data);
              setCadetTimeSlots(jsonData.timeSlots);
              setCadetCustomSlots(jsonData.result);
              onToggle();
            } else {
              console.error("Failed to fetch data");
            }
          } catch (error) {
            console.error("Error fetching data from Firestore:", error);
          }
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

  const onSuccessPost = () => {
    onToggle();
    setSubscribed(true);
    router.push("/");
    toast({
      title: "Date confirmed",
      description:
        userKind === "pisciner"
          ? "Please look out for email/discord dm for slot confirmation."
          : "Subscription done",
      status: "success",
      position: "top-right",
      duration: 5000,
      isClosable: false,
    });
  };

  const errorToast = () => {
    toast({
      title: "Wo mei KKK",
      status: "error",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpload = () => {
    if (userKind === "pisciner") {
      if (selectedCadetDate !== -1 && inputValue === "") {
        toast({
          title: "Wo mei KKK",
          description: "Wai u wan custom timee",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const body = {
          dateTime: finalDate,
          isDefault: Boolean(mode),
          teamId: "someid",
          customReason: reason,
        };
        axios
          .post("/api/rush-timeslot?collection=rush-timetables", body)
          .then(() => {
            console.log("CUSTOM", selectedCadetDate);
            if (selectedCadetDate !== -1) {
              const bookSlot = {
                dateTime: finalDate,
              };
              axios
                .patch(
                  "/api/rush-timeslot?collection=rush-timetables",
                  bookSlot,
                )
                .then(() => {
                  console.log("THEN");
                })
                .catch((error) => {
                  console.log("ERROR");
                });
            }

            onSuccessPost();
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
              errorToast();
            }
          });
      }
    } else if (userKind === "cadet") {
      const body = {
        dateTime: finalDate,
        evaluator: "winna",
        isDefault: Boolean(mode),
      };
      axios
        .post("/api/rush-timeslot?collection=cadet-slot", body)
        .then(() => {
          onSuccessPost();
        })
        .catch((error) => {
          if (error.response) {
            errorToast();
          }
        });
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center mt-20">
        <CountdownTimer
          targetDate={new Date().setDate(
            new Date().getDate() + daysUntilMonday,
          )}
          status="Ongoing"
        />
      </div>
      <Collapse in={isOpen} animateOpacity className="w-full h-full">
        <div className="flex flex-col w-full h-full bg-white items-center justify-center py-8 gap-y-6">
          <h2>Pick a timeslot for your team rush evaluation</h2>
          <div className="flex gap-x-8">
            <div>
              <PickTime
                data={piscineData}
                student={userKind}
                timeSlots={timeSlots}
                cadetTimeSlots={cadetTimeSlots}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setSelectedCadetDate={setSelectedCadetDate}
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
              student={userKind}
              cadetCustomSlots={cadetCustomSlots}
              setFinalDate={setFinalDate}
              setReason={setReason}
              setMode={setMode}
              setSelectedDate={setSelectedDate}
              selectedCadetDate={selectedCadetDate}
              setSelectedCadetDate={setSelectedCadetDate}
              inputValue={inputValue}
              setInputValue={setInputValue}
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
      {subscribed && userKind === "pisciner" && (
        <div className="w-full h-full flex flex-col items-center justify-center mt-40">
          <h2>You have successfully registered for a defense!</h2>
        </div>
      )}
    </div>
  );
}
