import React, { Suspense } from "react";

const Loadable =
  (Component: React.ComponentType) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
