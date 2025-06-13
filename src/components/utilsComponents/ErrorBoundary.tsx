"use client";

import { Hint, STATUS } from "gpdesign";
import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

type Props = {
  children: ReactNode;
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <Hint status={STATUS.DANGER}>Something went wrong: {error.message}</Hint>
);

const ErrorBoundary = ({ children }: Props) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
