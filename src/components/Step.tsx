import React from 'react';
import { WizardContext, State } from './Wizard';

const Step: React.FC<{
  children: (ctx: State) => React.ReactNode;
}> = props => {
  return (
    <WizardContext.Consumer>
      {({ init, ...context }) => {
        if (typeof props.children === 'function') {
          return props.children(context);
        } else {
          console.warn('Step component expects a function as children!');
          return props.children;
        }
      }}
    </WizardContext.Consumer>
  );
};

export default Step;
