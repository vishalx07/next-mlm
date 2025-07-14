type Props = {
  error?: string;
};

export const FetchError = ({ error }: Props) => {
  return (
    <>
      <p>Error while fetching data.</p>
      {error && (
        <p>
          <span className="text-danger">Message:</span> {error}
        </p>
      )}
    </>
  );
};
