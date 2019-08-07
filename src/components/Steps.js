import React from 'react'

import { WizardContext } from './Wizard'

export default class Steps extends React.Component {
  static contextType = WizardContext;

  componentDidMount() {
    this.context.init(
      this.props.children.length
        ? this.props.children.flatMap(v => v).length
        : 1
    )
  }

  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children
  }

  render() {
    return this.props.children.length > 1
      ? this.props.children.flatMap(v => v)[this.context.currentStep - 1]
      : this.props.children
  }
}
