import { getUser } from "@/lib/userActions";
import React, { Suspense } from "react";
import QRCode from "react-qr-code";

type Props = {
  value: string;
};

const QR = async ({ value }: Props) => {
  const user = await getUser();
  if (!user) return null;
  return (
    <div className="w-full aspect-square p-5 bg-white rounded-2xl">
      <QRCode className="w-full h-full" value={value} bgColor="transparent" />
    </div>
  );
};

const QRwithFallback = (props: Props) => {
  return (
    <Suspense>
      <QR {...props} />
    </Suspense>
  );
};

export { QRwithFallback as QR };
