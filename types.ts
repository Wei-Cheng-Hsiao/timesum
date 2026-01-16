
export interface TimeState {
  hours: number;
  minutes: number;
}

// Added missing AiCalculationResponse interface for Gemini AI responses
export interface AiCalculationResponse {
  resultingTime: string;
  explanation: string;
}