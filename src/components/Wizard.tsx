import React from 'react';

export interface WizardProps {
  startStep: number;
  externalOverrides: Partial<WizardContextState>;
  safe: boolean;
  onChange: (info: {
    state: WizardContextState;
    method: 'jump' | 'previous' | 'next';
    args: any;
  }) => void;
}

export interface WizardContextState {
  currentStep: number;
  totalSteps: number;
  previous: Wizard['previous'];
  next: Wizard['next'];
  jump: Wizard['jump'];
}

export const WizardContext = React.createContext<
  WizardContextState & { init: Wizard['init'] }
>({
  currentStep: 1,
  totalSteps: 1,
  previous() {},
  next() {},
  jump() {},
  init() {},
});

export class Wizard extends React.Component<WizardProps, WizardContextState> {
  static defaultProps = {
    startStep: 1,
    externalOverrides: {},
    safe: true,
    onChange: () => {},
  };

  static getDerivedStateFromProps(
    props: WizardProps,
    state: WizardContextState,
  ) {
    return {
      ...state,
      currentStep: props.externalOverrides.currentStep || state.currentStep,
    };
  }

  previous = (...args: any[]) => {
    const { safe, externalOverrides, onChange } = this.props;

    if (safe && this.state.currentStep <= 1) {
      return;
    }

    if (externalOverrides.previous) {
      externalOverrides.previous(...args);
    } else {
      this.setState(({ currentStep }) => ({ currentStep: currentStep - 1 }));
    }

    onChange({ method: 'previous', state: this.state, args });
  };

  next = (...args: any[]) => {
    const { safe, externalOverrides, onChange } = this.props;

    if (safe && this.state.currentStep >= this.state.totalSteps) {
      return;
    }

    if (externalOverrides.next) {
      externalOverrides.next(...args);
    } else {
      this.setState(({ currentStep }) => ({ currentStep: currentStep + 1 }));
    }
    onChange({ method: 'next', state: this.state, args });
  };

  jump = (position: number, ...args: any[]) => {
    const { safe, externalOverrides, onChange } = this.props;

    if (safe && position > this.state.totalSteps) {
      return;
    }

    if (externalOverrides.jump) {
      externalOverrides.jump(position);
    } else {
      this.setState({ currentStep: position });
    }

    onChange({ method: 'jump', state: this.state, args: [position, ...args] });
  };

  init = (steps: number) => {
    this.setState({ totalSteps: steps });
  };

  state = {
    currentStep:
      this.props.externalOverrides.currentStep || this.props.startStep,
    totalSteps: 1,
    init: this.init,
    previous: this.previous,
    next: this.next,
    jump: this.jump,
  };

  render() {
    return (
      <WizardContext.Provider value={this.state}>
        {this.props.children}
      </WizardContext.Provider>
    );
  }
}

export const useWizard = () => {
  const ctx = React.useContext(WizardContext);

  if (!ctx) {
    throw new Error('Out of context!');
  }

  return ctx;
};
