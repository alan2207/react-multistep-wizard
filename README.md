# react-multistep-wizard

> Simple react wizard component

[![NPM](https://img.shields.io/npm/v/react-multistep-wizard.svg)](https://www.npmjs.com/package/react-multistep-wizard)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-multistep-wizard
```

## Usage

```jsx
import React from 'react';

import { Wizard, Steps, Step } from 'react-multistep-wizard';

// simple example:
class Example extends React.Component {
  render() {
    return (
      <Wizard>
        <Steps>
          <Step>
            {ctx => (
              <div>
                Step 1: <button onClick={ctx.next}>Next Step</button>
              </div>
            )}
          </Step>
          <Step>
            {ctx => (
              <div>
                Step 2: <button onClick={ctx.next}>Next Step</button>
              </div>
            )}
          </Step>
        </Steps>
      </Wizard>
    );
  }
}
```

[Live Demo](https://codesandbox.io/s/mystifying-frog-wpdrk)

## API

## Exports:

### Components:

#### `Wizard`

Component that controls the entire state of the component.

##### props:

- `startStep` - choose from which step to start the wizard. Defaults to 1.
- `externalOverrides` - use it for the external control of the component, for
  example if you want the wizard component to be controlled from an external
  source.

```
<Wizard
startStep={1}
externalOverrides={{
  currentStep: externalCurrentStep,
  next: externalNextFn,
  previous: externalPreviousFn,
  jump: externalJumpFn
}}
>{...}</Wizard>
```

#### `Steps`

Component that controls the rendering of the current step. Doesn't accept any
props, and must have the `Step` components as children.

#### `Step`

Component that describes the actual step. By using render prop function, it can
pass the wizard's context to the UI in order to allow user to control it from
within it.

Render prop options from `WizardContext`:

- `currentStep`
- `totalSteps`
- `previous`
- `next`
- `jump`

#### `WithWizard`

Component similar to `Step`. The only difference is that it should not be
rendered from the `Steps` component, that way making sure it is always rendered
regardless of the current step. Convenient for progress indicators.

### TypeScript Types:

#### `WizardProps`

#### `WizardContextState`

For more info check out the example folder or the live demo.

## License

MIT © [alan2207](https://github.com/alan2207)
