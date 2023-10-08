import { Dispatch, RefObject, SetStateAction, useState } from "react";
import useModal from "@/hooks/useModal";
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

export default function CustomTimeSlots({
  student,
  cadetCustomSlots,
  setFinalDate,
  setReason,
  setMode,
  setSelectedDate,
  selectedCadetDate,
  setSelectedCadetDate,
  inputValue,
  setInputValue,
}: {
  student: string;
  cadetCustomSlots: any;
  setFinalDate: Dispatch<SetStateAction<Date>>;
  setReason: Dispatch<SetStateAction<String>>;
  setMode: Dispatch<SetStateAction<number>>;
  setSelectedDate: Dispatch<SetStateAction<number>>;
  selectedCadetDate: number;
  setSelectedCadetDate: Dispatch<SetStateAction<number>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}) {
  const [isCTOpen, openCTModal, closeCTModal, CTRef] = useModal(false);
  const [isECOpen, openECModal, closeECModal, ECRef] = useModal(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    setReason(inputValue);
  };

  const commonClassNames = (i: number, avail: number) => ({
    border: i === selectedCadetDate ? "border-[#00B9BB]" : "",
    text:
      (i === selectedCadetDate && "text-[#00B9BB]") ||
      (avail === 0 && "text-gray-500"),
  });

  return (
    <div className={`flex flex-col w-60 justify-center items-start`}>
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
            {cadetCustomSlots.length !== 0 ? (
              <div className="flex flex-col w-full gap-y-4 overflow-y-scroll">
                {cadetCustomSlots.map((time, i) => {
                  const cNames = commonClassNames(i, time.availability);
                  const datee = new Date(time.dateTime * 1000);
                  console.log("DATE", datee);
                  return (
                    <button
                      className={`w-full min-h-[80px] border-2 rounded-md flex flex-col items-start justify-center py-1 px-3 ${cNames.border}`}
                      key={i}
                      onClick={() => {
                        setSelectedCadetDate(i);
                        setFinalDate(datee);
                        setSelectedDate(-1);
                        setMode(0);
                      }}
                    >
                      <div className="flex items-end gap-x-1">
                        <h2 className={cNames.text}>
                          {datee.toLocaleString("default", {
                            weekday: "short",
                          })}
                        </h2>
                        <h2 className={cNames.text}>{datee.getDate()}</h2>
                        <h3 className={cNames.text}>
                          {datee.toLocaleString("default", { month: "short" })}
                        </h3>
                      </div>
                      <div className="flex w-full">
                        <h2 className={cNames.text}>
                          {datee.toLocaleString("default", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hourCycle: "h24",
                          })}
                        </h2>
                        <p
                          className={`text-sm flex items-end justify-end w-full ${cNames.text}`}
                        >
                          Avail: {time.count}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="flex items-center">No custom timeslots found :(</p>
            )}
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
