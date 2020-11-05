import React from 'react';
import { WizardContextState, WizardProps } from './types';
import { WizardContext } from './WizardContext';

export const Wizard: React.FC<WizardProps> = ({
  externalOverrides = {},
  startStep = 1,
  safe = true,
  onChange = () => {},
  children,
}) => {
  const mounted = React.useRef(false);
  const [currentStep, setCurrentStep] = React.useState(startStep);
  const [totalSteps, setTotalSteps] = React.useState(1);

  const step = externalOverrides.currentStep || currentStep;

  const previous = React.useCallback(
    (...args: any[]) => {
      if (safe && step <= 1) {
        return;
      }

      if (externalOverrides.previous) {
        externalOverrides.previous(...args);
      } else {
        setCurrentStep(s => s - 1);
      }
    },
    [step, externalOverrides.previous, safe, setCurrentStep],
  );

  const next = React.useCallback(
    (...args: any[]) => {
      if (safe && step >= totalSteps) {
        return;
      }

      if (externalOverrides.next) {
        externalOverrides.next(...args);
      } else {
        setCurrentStep(s => s + 1);
      }
    },
    [step, externalOverrides.next, totalSteps, safe, setCurrentStep],
  );

  const jump = React.useCallback(
    (position: number, ...args: any[]) => {
      if (safe && position > totalSteps) {
        return;
      }

      if (externalOverrides.jump) {
        externalOverrides.jump(position, ...args);
      } else {
        setCurrentStep(position);
      }
    },
    [ externalOverrides.jump, totalSteps, safe, setCurrentStep],
  );

  const init = React.useCallback((stepsLength: number) => {
    setTotalSteps(stepsLength);
  }, []);

  const value: WizardContextState = React.useMemo(() => {
    return {
      currentStep: step,
      totalSteps,
      init,
      previous,
      next,
      jump,
    };
  }, [step, totalSteps, init, previous, next, jump]);

  React.useEffect(() => {
    if (mounted.current) {
      onChange(value);
    } else {
      mounted.current = true;
    }
  }, [step]);

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};
