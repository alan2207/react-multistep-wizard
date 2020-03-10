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
  const [currentStep, setCurrentStep] = React.useState(
    externalOverrides.currentStep || startStep,
  );
  const [totalSteps, setTotalSteps] = React.useState(1);

  React.useEffect(() => {
    if (externalOverrides.currentStep !== undefined) {
      setCurrentStep(externalOverrides.currentStep);
    }
  }, [externalOverrides.currentStep]);

  const previous = React.useCallback(
    (...args: any[]) => {
      if (safe && currentStep <= 1) {
        return;
      }

      if (externalOverrides.previous) {
        externalOverrides.previous(...args);
      } else {
        setCurrentStep(s => s - 1);
      }
    },
    [currentStep, externalOverrides.previous, safe, setCurrentStep],
  );

  const next = React.useCallback(
    (...args: any[]) => {
      if (safe && currentStep >= totalSteps) {
        return;
      }

      if (externalOverrides.next) {
        externalOverrides.next(...args);
      } else {
        setCurrentStep(s => s + 1);
      }
    },
    [currentStep, externalOverrides.next, totalSteps, safe, setCurrentStep],
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
    [currentStep, externalOverrides.jump, totalSteps, safe, setCurrentStep],
  );

  const init = React.useCallback((stepsLength: number) => {
    setTotalSteps(stepsLength);
  }, []);

  const value: WizardContextState = React.useMemo(() => {
    return {
      currentStep,
      totalSteps,
      init,
      previous,
      next,
      jump,
    };
  }, [currentStep, totalSteps, init, previous, next, jump]);

  React.useEffect(() => {
    if (mounted.current) {
      onChange(value);
    } else {
      mounted.current = true;
    }
  }, [currentStep]);

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};
