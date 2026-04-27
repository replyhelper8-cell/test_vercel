import "./globals.css";

export const metadata = {
  title: "Simple Next TS App",
  description: "Todo app with Next.js + TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
