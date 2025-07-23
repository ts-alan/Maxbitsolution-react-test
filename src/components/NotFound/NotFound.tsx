interface NotFoundProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function NotFound({ 
  title = "404", 
  subtitle = "Page Not Found", 
  description = "Sorry, we couldn't find the page you're looking for." 
}: NotFoundProps) {
  return (
    <div className="not-found">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{description}</p>
    </div>
  );
}
