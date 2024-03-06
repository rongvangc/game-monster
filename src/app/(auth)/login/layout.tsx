import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="en" suppressHydrationWarning>
      {children}
    </section>
  );
}
