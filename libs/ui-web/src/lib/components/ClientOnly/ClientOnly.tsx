import { useEffect, useState } from 'react';
export const ClientOnly = ({
  children,
}: {
  children?: JSX.Element | unknown;
}): JSX.Element => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (hasMounted) return <>{children}</>;
  return <></>;
};
