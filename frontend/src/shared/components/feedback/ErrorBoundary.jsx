import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI Error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center text-black">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-sm text-black/70">Please refresh the page or try again later.</p>
          <button className="mt-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-black" onClick={this.handleReset} type="button">
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
