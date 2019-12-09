import React from "react";

import { Wizard, Steps, Step, WithWizard } from "react-multistep-wizard";

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  const [step, setStep] = React.useState(1);
  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Wizard
        externalOverrides={{
          currentStep: step,
          jump: p => setStep(p),
          previous: () => setStep(step => step - 1),
          next: () => setStep(step => step + 1)
        }}
      >
        <div>
          <WithWizard>
            {ctx =>
              steps.map(step => (
                <button
                  style={{ width: "40px", fontSize: "25px" }}
                  key={step}
                  onClick={() => ctx.jump(step)}
                >
                  {step}
                </button>
              ))
            }
          </WithWizard>
        </div>
        <Steps>
          {steps.map(step => (
            <Step key={step}>
              {ctx => (
                <div>
                  <h1 style={{ textAlign: "center" }}>{step}</h1>
                  <button onClick={ctx.previous}>Previous Step</button>
                  <button onClick={ctx.next}>Next Step</button>
                </div>
              )}
            </Step>
          ))}
        </Steps>
      </Wizard>
    </div>
  );
};

export default App;
