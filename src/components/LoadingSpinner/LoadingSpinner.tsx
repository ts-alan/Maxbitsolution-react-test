interface LoadingSpinnerProps {
  loadingText?: string;
}

export function LoadingSpinner({
  loadingText = "Loading...",
}: LoadingSpinnerProps) {
  return <div className="loading-spinner">{loadingText}</div>;
}
