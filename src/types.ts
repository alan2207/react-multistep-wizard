type GeneralProps = {
  isSafe?: boolean;
  onChange?: (state: WizardContextState) => void;
};

type ControlledProps =
  | ({ isControlled: true } & {
      currentStep: number;
      jump: (...args: any[]) => void;
      previous?: (...args: any[]) => void;
      next?: (...args: any[]) => void;
    })
  | {
      isControlled: false;
      currentStep: never;
      jump: never;
      previous: never;
      next: never;
    };

export type WizardProps = GeneralProps & ControlledProps;

export interface WizardContextState {
  currentStep: number;
  totalSteps: number;
  previous: (...args: any[]) => void;
  next: (...args: any[]) => void;
  jump: (...args: any[]) => void;
  setTotalSteps: (total: number) => void;
}
