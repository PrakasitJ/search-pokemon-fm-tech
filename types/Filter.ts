export interface FilterState {
  name: string;
  types: string[];
  weaknesses: string[];
  resistant: string[];
  minHeight: string;
  minWeight: string;
  minCP: string;
  minHP: string;
  attackName: string;
  stages: number[]; // 1, 2, 3
}
