import React from 'react';
import { WizardContextState } from './types';
import { useWizard } from './useWizard';

export const Step: React.FC<{
  children: (ctx: WizardContextState) => React.ReactNode;
}> = props => {
  const context = useWizard();

  return (
    <>
      {typeof props.children === 'function'
        ? props.children(context)
        : props.children}
    </>
  );
};
