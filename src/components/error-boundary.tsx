/**
 * ErrorBoundary component
 */
import React from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
/*
 * React.Component<P, S>:
 * P: props
 * S: state
 * */
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  /*
  * This lifecycle is invoked after an error has been thrown by a descendant component.
  * It receives the error that was thrown as a parameter and should return a value to update state.
  * https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror
  * */
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
