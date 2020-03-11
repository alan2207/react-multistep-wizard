import React from 'react';
import { WizardContextState } from './types';

export const WizardContext = React.createContext<WizardContextState | null>(
  null,
);
