import React, { Component } from 'react';
import type { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
   children: React.ReactNode;
   fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
   hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
   constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(): ErrorBoundaryState {
      // Update state so the next render shows the fallback UI
      return { hasError: true };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      // Log the error to an error reporting service
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         // fallback UI
         return this.props.fallback || <div>Something went wrong.</div>;
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
