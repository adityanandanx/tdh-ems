import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const EventPageLayout = ({ children }: Props) => {
  return (
    <section className="px-5">
      <div className="relative max-w-screen-xl mx-auto py-10">{children}</div>
    </section>
  );
};

export default EventPageLayout;
