export type LogEntryDTO = {
  level: string;
  message: string;
  context: string;
  timestamp: number;
  source: string;
  ip: string;
};
