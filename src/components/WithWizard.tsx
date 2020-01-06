import React from 'react';

import { WizardContext, WizardContextState } from './Wizard';

export const WithWizard: React.FC<{
  children: (ctx: WizardContextState) => React.ReactNode;
}> = props => {
  return (
    <WizardContext.Consumer>
      {({ init, ...context }) => {
        if (typeof props.children === 'function') {
          return props.children(context);
        } else {
          console.warn('WithWizard component expects a function as children!');
          return props.children;
        }
      }}
    </WizardContext.Consumer>
  );
};
