import React from 'react'
import { number, object } from 'prop-types'

export const WizardContext = React.createContext()

export default class Wizard extends React.Component {
  static propTypes = {
    startStep: number,
    externalOverrides: object
  };

  static defaultProps = {
    startStep: 1,
    externalOverrides: {}
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      currentStep: props.externalOverrides.currentStep || state.currentStep
    }
  }

  previous = (...args) => {
    if (this.state.currentStep > 1) {
      if (this.props.externalOverrides.previous) {
        this.props.externalOverrides.previous(...args)
      } else {
        this.setState(({ currentStep }) => ({ currentStep: currentStep - 1 }))
      }
    }
  };

  next = (...args) => {
    if (this.state.currentStep < this.state.totalSteps) {
      if (this.props.externalOverrides.next) {
        this.props.externalOverrides.next(...args)
      } else {
        this.setState(({ currentStep }) => ({ currentStep: currentStep + 1 }))
      }
    }
  };

  jump = position => {
    if (position <= this.totalSteps) {
      if (this.props.externalOverrides.jump) {
        this.props.externalOverrides.jump(position)
      } else {
        this.setState({ currentStep: position })
      }
    }
  };

  init = steps => {
    this.setState({ totalSteps: steps })
  };

  state = {
    currentStep:
      this.props.externalOverrides.currentStep || this.props.startStep,
    totalSteps: 1,
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
