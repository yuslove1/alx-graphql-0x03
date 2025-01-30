# ReactGuard: Mastering Error Handling (alx-graphql-0x03)

This project enhances the ["alx-rick-and-morty-app](https://github.com/yuslove1/alx-graphql-0x02/tree/main/alx-rick-and-morty-app) with robust error handling using a TypeScript `ErrorBoundary` component and Sentry integration for comprehensive error monitoring and a better user experience.

## Getting Started

1. **Clone:** `git clone https://github.com/yuslove1/alx-graphql-0x03.git`
2. **Navigate:** `cd alx-graphql-0x03`
3. **Install:** `npm install` (or `yarn install`)
4. **Sentry Setup (Important):**  Create a Sentry project, obtain your DSN (Data Source Name), and add it to your environment variables (e.g., `.env.local`, `.env`).  Refer to Sentry's documentation for detailed Next.js integration instructions.
5. **Run:** `npm run dev`


## Error Handling Implementation

### ErrorBoundary (TypeScript)

The `ErrorBoundary` is a TypeScript class component that catches JavaScript errors occurring within its child components.  It displays a fallback UI to the user and logs the error details to Sentry.

```typescript
import React, { Component } from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: null,
  };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo }); // Log to Sentry
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.errorMessage}</p>
          {/* Optionally, add a retry button or link to another page */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

```

### Next.js Integration

Integrate the `ErrorBoundary` in `_app.tsx` to wrap your main application component:

```typescript
// _app.tsx
import type { AppProps } from 'next/app';
// ... other imports
import ErrorBoundary from '../components/ErrorBoundary'; // Import the component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
```


### Error Simulation (for Testing)

The `ErrorSimulator` component is used to intentionally throw an error to test the `ErrorBoundary`:

```typescript
import React from 'react';

const ErrorSimulator: React.FC = () => {
  const handleClick = () => {
    throw new Error('This is a simulated error!');
  };

  return (
    <button onClick={handleClick}>Simulate Error</button>
  );
};

export default ErrorSimulator;

```


## Key Improvements

* **Robust Error Handling:** The `ErrorBoundary` provides a safety net for catching and handling unexpected JavaScript errors.
* **Improved User Experience:**  Users see a more informative error message instead of a broken application.
* **Error Monitoring and Debugging:** Sentry integration provides valuable error logs for debugging and analysis.


## Future Enhancements

* Implement more specific error handling logic based on different error types.
* Add a retry mechanism within the `ErrorBoundary` to allow users to recover from errors.
* Consider more sophisticated UI feedback in the error state.


```
