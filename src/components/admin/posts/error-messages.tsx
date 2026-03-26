interface ErrorMessagesProps {
  id: string;
  errors: string[] | undefined;
}

export default function ErrorMessages({ id, errors }: ErrorMessagesProps) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" className="mb-5">
      {errors &&
        errors.map((error: string, index) => (
          <p className="mt-2 text-sm text-red-500" key={index}>
            {error}
          </p>
        ))}
    </div>
  )
}