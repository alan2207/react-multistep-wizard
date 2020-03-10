import React from 'react';
import { WizardContextState } from './types';

export const WizardContext = React.createContext<WizardContextState>({
  currentStep: 1,
  totalSteps: 1,
  previous() {},
  next() {},
  jump() {},
  init() {},
});
