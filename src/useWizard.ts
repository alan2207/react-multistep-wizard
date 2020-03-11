import { useContext } from 'react';
import { WizardContext } from './WizardContext';

export const useWizard = () => {
  const ctx = useContext(WizardContext);

  if (!ctx) {
    throw new Error(
      'Out of context! Please make sure you are using the useContext hook within a Wizard component.',
    );
  }

  return ctx;
};
