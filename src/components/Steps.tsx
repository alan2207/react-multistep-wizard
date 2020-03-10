import React from 'react';
import { useWizard } from './Wizard';

const flatMap = function(lambda: any, array: any) {
  return Array.prototype.concat.apply([], array.map(lambda));
};

export const Steps: React.FC = ({ children }) => {
  const ctx = useWizard();

  React.useEffect(() => {
    if (Array.isArray(children)) {
      ctx.init(children.length ? flatMap((v: any) => v, children).length : 1);
    }
  }, [children, ctx.init]);

  return (
    <>
      {Array.isArray(children)
        ? flatMap((v: any) => v, children)[ctx.currentStep - 1]
        : children}
    </>
  );
};
