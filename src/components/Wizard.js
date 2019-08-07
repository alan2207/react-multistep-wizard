import React from 'react'
import { number } from 'prop-types'
export const WizardContext = React.createContext()

export default class Wizard extends React.Component {
  static propTypes = {
    startStep: number
  };

  static defaultProps = {
    startStep: 1
  };
  previous = () => {
    if (this.state.currentStep > 1) {
      this.setState(({ currentStep }) => ({ currentStep: currentStep - 1 }))
    }
  };

  next = () => {
    if (this.state.currentStep < this.state.totalSteps) {
      this.setState(({ currentStep }) => ({ currentStep: currentStep + 1 }))
    }
  };

  jump = position => {
    this.setState({ currentStep: position })
  };

  init = steps => {
    this.setState({ totalSteps: steps })
  };

  state = {
    currentStep: this.props.startStep,
    totalSteps: 0,
    init: this.init,
    previous: this.previous,
    next: this.next,
    jump: this.jump
  };

  render() {
    return (
      <WizardContext.Provider value={this.state}>
        {this.props.children}
      </WizardContext.Provider>
    )
  }
}
