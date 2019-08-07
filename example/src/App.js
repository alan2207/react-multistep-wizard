import React, { Component } from 'react';

import { Wizard, Steps, Step } from 'react-multistep-wizard';

export default class App extends Component {
  render() {
    return (
      <div>
        <Wizard>
          <Steps>
            <Step>{ctx => <button onClick={ctx.next}>1</button>}</Step>
            <Step>{ctx => <button onClick={ctx.next}>2</button>}</Step>
            <Step>{ctx => <button onClick={ctx.next}>3</button>}</Step>
            {[4, 5, 6].map(n => (
              <Step key={n}>
                {ctx => <button onClick={ctx.next}>{n}</button>}
              </Step>
            ))}
          </Steps>
        </Wizard>
      </div>
    );
  }
}
