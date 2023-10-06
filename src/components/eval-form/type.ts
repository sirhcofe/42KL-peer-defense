export type Member = {
  name: string;
  intra: string;
  notes?: string;
};

export type FormValue = {
  evaluator: string;
  teamName: string;
  members: Member[];
  time: string;
  notes: string;
};
