import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state to indicate that an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any fallback UI
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;