import React from 'react';

import { Wizard, Steps, useWizard } from 'react-multistep-wizard';

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Step = ({ step }) => {
  const ctx = useWizard();

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{step}</h1>
      <button onClick={ctx.previous}>Previous Step</button>
      <button onClick={ctx.next}>Next Step</button>
    </div>
  );
};

const Controls = () => {
  const ctx = useWizard();

  return (
    <div>
      {steps.map(step => (
        <button
          style={{ width: '40px', fontSize: '25px' }}
          key={step}
          onClick={() => ctx.jump(step)}>
          {step}
        </button>
      ))}
    </div>
  );
};

const App = () => {
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
      <Wizard safe={true} onChange={console.log}>
        <Controls />
        <Steps>
          {steps.map(step => (
            <Step key={step} step={step} />
          ))}
        </Steps>
      </Wizard>
    </div>
  );
};

export default App;
