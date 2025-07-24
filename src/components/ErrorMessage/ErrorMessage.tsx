import "./ErrorMessage.scss";

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <h1>⚠️</h1>
      <h2>Something went wrong</h2>
      <p>{message || "Failed to load data. Please try again later."}</p>
    </div>
  );
}
