export type Job = {
  id: string;
  companyId: string;
  title: string;
  city: string;
  postedDate: string;
  salaryLow: number;
  salaryHigh: number;
  yrsXPExpected: number;
  active: boolean;
  remote: boolean;
  description: string;
  skills: string[];
};
