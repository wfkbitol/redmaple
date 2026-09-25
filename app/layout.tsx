import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider defaultTheme="system" enableSystem>{children}</ThemeProvider>
      </body>
    </html>
  );
}
