export interface Hotspot {
  issue: string;
  impact: 'High' | 'Medium' | 'Low';
  suggestion: string;
}

export interface AnalysisResult {
  carbon_score: number;
  energy_estimate: string;
  co2_emissions: string;
  hotspots: Hotspot[];
  optimized_code: string;
  carbon_reduction_estimate: string;
  explanation: string;
}

export enum Language {
  Python = 'Python',
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  Java = 'Java',
  CPP = 'C++',
  Go = 'Go',
  Rust = 'Rust',
  PHP = 'PHP'
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}
