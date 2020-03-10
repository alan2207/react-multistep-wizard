export interface WizardProps {
  startStep: number;
  externalOverrides: Partial<WizardContextState>;
  safe: boolean;
  onChange: (state: WizardContextState) => void;
}

export interface WizardContextState {
  currentStep: number;
  totalSteps: number;
  previous: (...args: any[]) => void;
  next: (...args: any[]) => void;
  jump: (...args: any[]) => void;
  init: (...args: any[]) => void;
}
