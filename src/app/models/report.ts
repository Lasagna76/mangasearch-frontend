export type ReportType = 'BUG' | 'DATA';

export interface ReportRequest {
  type: ReportType;
  description: string;
}