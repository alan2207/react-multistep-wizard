import React from 'react'

import { WizardContext } from './Wizard'

export default function WithWizard(props) {
  return (
    <WizardContext.Consumer>
      {({ init, ...context }) =>
        typeof props.children === 'function'
          ? props.children(context)
          : props.children
      }
    </WizardContext.Consumer>
  )
}
