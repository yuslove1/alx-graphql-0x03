import { ErrorInfo, ReactNode } from "react";
import React from "react";
import * as Sentry from '@sentry/nextjs'

// Interface defining the component's state
interface State {
  hasError: boolean;
}

// Interface defining the component's props
interface ErrorBoundaryProps {
  children: ReactNode;
}

// ErrorBoundary component - catches and handles errors in its children
class ErrorBoudary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize state with hasError set to false
    this.state = { hasError: false };
  }

  // Static method to update state based on caught errors
  static getDerivedStateFromError(error: Error): State {
    // Update state to indicate an error occurred
    return { hasError: true };
  }

  // Lifecycle method called after an error has been caught
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // passed the error to sentry
    Sentry.captureException(error, { extra: errorInfo });  
    // console.error("Caught an error:", { error, errorInfo });  
  }

  render() {
    // Render fallback UI if an error has occurred
    if (this.state.hasError) {
      return (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-red-500">Oops, there is an error!</h2>
          <p className="mt-4 text-gray-600">Something went wrong. Please try again later.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again?
          </button>
        </div>
      );
    }

    // Render children if no error has occurred
    return this.props.children;
  }
}

export default ErrorBoudary;