import { Suspense } from "react";

import { FullScreenSpinner } from "@shared/components/feedback/FullScreenSpinner.jsx";
import { ErrorBoundary } from "@shared/components/feedback/ErrorBoundary.jsx";

export const AppProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FullScreenSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
