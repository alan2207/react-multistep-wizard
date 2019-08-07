# react-multistep-wizard

> Simple react wizard component

[![NPM](https://img.shields.io/npm/v/react-multistep-wizard.svg)](https://www.npmjs.com/package/react-multistep-wizard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-multistep-wizard
```

## Usage

```jsx
import React from 'react'

import { Wizard, Steps, Step } from 'react-multistep-wizard';

class Example extends React.Component {
  render () {
    return (
      <Wizard>
          <Steps>
            <Step>{ctx => <button onClick={ctx.next}>1</button>}</Step>
            <Step>{ctx => <button onClick={ctx.next}>2</button>}</Step>
            <Step>{ctx => <button onClick={ctx.next}>3</button>}</Step>
          </Steps>
        </Wizard>
    )
  }
}
```

## License

MIT © [alan2207](https://github.com/alan2207)
