'use client';

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h2>{`Oops error: ${error.message}`} </h2>;
}
