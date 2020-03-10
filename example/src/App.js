import React from 'react';

import { Wizard, Steps, useWizard } from 'react-multistep-wizard';

const Step = () => {
  const ctx = useWizard();

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{ctx.currentStep}</h1>
    </div>
  );
};

const Controls = ({ steps }) => {
  const ctx = useWizard();

  return (
    <div>
      {steps.map(step => (
        <button
          style={{
            width: '40px',
            fontSize: '25px',
            background: step === ctx.currentStep ? 'lightgreen' : 'white',
          }}
          key={step}
          onClick={() => ctx.jump(step)}>
          {step}
        </button>
      ))}
      <div style={{ textAlign: 'center' }}>
        <button onClick={ctx.previous}>Previous Step</button>
        <button onClick={ctx.next}>Next Step</button>
      </div>
    </div>
  );
};

const App = () => {
  const [steps] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const [step, setStep] = React.useState(1);

  return (
    <div
      style={{
        margin: '20px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Wizard
        externalOverrides={{
          currentStep: step,
          next: () => setStep(s => s + 1),
          previous: () => setStep(s => s - 1),
          jump: setStep,
        }}
        safe={true}
        onChange={console.log}>
        <Controls steps={steps} />
        <Steps>
          {steps.map(step => (
            <Step key={step} />
          ))}
        </Steps>
      </Wizard>
    </div>
  );
};

export default App;
