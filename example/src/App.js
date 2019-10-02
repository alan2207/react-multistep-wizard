import React, { Component } from 'react';

import { Wizard, Steps, Step, WithWizard } from 'react-multistep-wizard';

const steps = [{ step: 1 }, { step: 2 }, { step: 3 }];

const StepComponent = ({ ctx, step }) => {
  React.useEffect(() => {
    console.log(step);
  }, []);
  return <button onClick={ctx.next}>{step.step}</button>;
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Wizard>
          <WithWizard>{ctx => ctx.currentStep}</WithWizard>
          <Steps>
            {/* <Step>{ctx => <StepComponent ctx={ctx}>1</StepComponent>}</Step>
            <Step>{ctx => <StepComponent ctx={ctx}>2</StepComponent>}</Step>
            <Step>{ctx => <StepComponent ctx={ctx}>3</StepComponent>}</Step>
            <Step>{ctx => <StepComponent ctx={ctx}>4</StepComponent>}</Step> */}
            {steps.map(step => (
              <Step key={step.step}>
                {ctx => (
                  <div>
                    <StepComponent ctx={ctx} step={step} />
                  </div>
                )}
              </Step>
            ))}
          </Steps>
        </Wizard>
      </div>
    );
  }
}
