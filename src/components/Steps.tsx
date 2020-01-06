import React from 'react';

import { WizardContext } from './Wizard';

const flatMap = function(lambda: any, array: any) {
  return Array.prototype.concat.apply([], array.map(lambda));
};

export class Steps extends React.Component {
  static contextType = WizardContext;

  componentDidMount() {
    if (Array.isArray(this.props.children)) {
      this.context.init(
        this.props.children.length
          ? flatMap((v: any) => v, this.props.children).length
          : 1,
      );
    }
  }

  shouldComponentUpdate(nextProps: Steps['props']) {
    return this.props.children !== nextProps.children;
  }

  render() {
    if (Array.isArray(this.props.children)) {
      return flatMap((v: any) => v, this.props.children)[
        this.context.currentStep - 1
      ];
    } else {
      return this.props.children;
    }
  }
}
