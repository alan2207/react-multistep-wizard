import React from 'react';
import { WizardContextState, useWizard } from './Wizard';

export const Step: React.FC<{
  children: (ctx: WizardContextState) => React.ReactNode;
}> = props => {
  const { init, ...context } = useWizard();

  return (
    <>
      {typeof props.children === 'function'
        ? props.children(context)
        : props.children}
    </>
  );
};
