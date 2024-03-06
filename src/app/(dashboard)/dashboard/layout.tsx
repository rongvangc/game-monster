import { DashBoard } from "@/components/admin/dash-board";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import Template from "./template";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="en" suppressHydrationWarning>
      <DashBoard navCollapsedSize={0}>
        <Toaster />
        <Template>{children}</Template>
      </DashBoard>
    </section>
  );
}
