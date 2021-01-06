import React from 'react';
import { WizardContextState, WizardProps } from './types';
import { WizardContext } from './WizardContext';

export const Wizard = ({
  isSafe = true,
  onChange = () => {},
  children,
  isControlled = false,
  ...controlledProps
}: { children: React.ReactNode } & WizardProps) => {
  const isMounted = React.useRef(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [totalSteps, setTotalSteps] = React.useState(1);

  const step = isControlled ? controlledProps.currentStep : currentStep;

  const previous = React.useCallback(
    (...args: any[]) => {
      if (isSafe && step <= 1) {
        return;
      }

      if (controlledProps.previous) {
        controlledProps.previous(...args);
      } else {
        setCurrentStep(s => s - 1);
      }
    },
    [step, controlledProps.previous, isSafe, setCurrentStep],
  );

  const next = React.useCallback(
    (...args: any[]) => {
      if (isSafe && step >= totalSteps) {
        return;
      }

      if (controlledProps.next) {
        controlledProps.next(...args);
      } else {
        setCurrentStep(s => s + 1);
      }
    },
    [step, controlledProps.next, totalSteps, isSafe, setCurrentStep],
  );

  const jump = React.useCallback(
    (position: number, ...args: any[]) => {
      if (isSafe && position > totalSteps) {
        return;
      }

      if (controlledProps.jump) {
        controlledProps.jump(position, ...args);
      } else {
        setCurrentStep(position);
      }
    },
    [controlledProps.jump, totalSteps, isSafe, setCurrentStep],
  );

  const value: WizardContextState = React.useMemo(() => {
    return {
      currentStep: step,
      totalSteps,
      setTotalSteps,
      previous,
      next,
      jump,
    };
  }, [step, totalSteps, setTotalSteps, previous, next, jump]);

  React.useEffect(() => {
    if (isMounted.current) {
      onChange(value);
    } else {
      isMounted.current = true;
    }
  }, [step]);

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};
