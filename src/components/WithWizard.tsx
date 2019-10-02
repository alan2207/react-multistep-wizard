import React from 'react';

import { WizardContext, State } from './Wizard';

const WithWizard: React.FC<{
  children: (ctx: State) => React.ReactNode;
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

export default WithWizard;
