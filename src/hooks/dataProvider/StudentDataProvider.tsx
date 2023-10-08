"use client";

import React from "react";
import queriedData from "src/student-data/sample.json";
import { filterArrayObject } from "@/utils/filterObject";

type StudentDataT = {
  fullStudentData: StudentsT[];
  setFullStudentData: (value: StudentsT[]) => void;
  criticalDays: StudentsT[];
  setCriticalDays: (value: StudentsT[]) => void;
  lastSubmission: StudentsT[];
  setLastSubmisison: (value: StudentsT[]) => void;
};

export type StudentsT = Record<string, string | number>;

export const StudentContext = React.createContext({} as StudentDataT);

export const StudentDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fullStudentData, setFullStudentData] = React.useState<StudentsT[]>([]);
  const [criticalDays, setCriticalDays] = React.useState<StudentsT[]>([]);
  const [lastSubmission, setLastSubmisison] = React.useState<StudentsT[]>([]);
  React.useEffect(() => {
    try {
      if (queriedData.length > 0) {
        setFullStudentData(queriedData);
        queriedData.map;
        setCriticalDays(
          filterArrayObject(
            queriedData,
            "intra_id",
            "name",
            "days_till_blockhole",
            "seen",
          ).sort((a, b) => a["days_till_blockhole"] - b["days_till_blockhole"]),
        );
        setLastSubmisison(
          filterArrayObject(
            queriedData,
            "intra_id",
            "name",
            "days_till_blockhole",
            "since_last_submission",
            "seen",
          ).sort((a, b) => a["days_till_blockhole"] - b["days_till_blockhole"]),
        );
      }
    } catch (e) {
      console.log("Error in student data provider.");
    }
  }, []);

  return (
    <StudentContext.Provider
      value={{
        fullStudentData,
        setFullStudentData,
        criticalDays,
        setCriticalDays,
        lastSubmission,
        setLastSubmisison,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const studentData = React.useContext(StudentContext);

  return studentData;
};
