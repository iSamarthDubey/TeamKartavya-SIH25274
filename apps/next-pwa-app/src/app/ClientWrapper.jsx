"use client";

import dynamic from "next/dynamic";

const InstallPrompt = dynamic(() => import("../components/InstallPrompt"), {
  ssr: false,
});

const ServiceWorkerRegister = dynamic(
  () => import("../service-worker-register"),
  { ssr: false }
);

export default function ClientWrapper({ children }) {
  return (
    <>
      {children}
      <InstallPrompt />
      <ServiceWorkerRegister />
    </>
  );
}
