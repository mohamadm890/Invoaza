import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Invoaza | Free Freelancer Invoice Generator",
  description: "Create and download professional freelancer invoices easily. No signup required, fast PDF generation.",
  metadataBase: new URL("https://www.invoaza.com/"),
  
  // This adds the <link rel="canonical" href="https://www.invoaza.com/" />
  alternates: {
    canonical: "/", 
  },

  verification: {
    google: "2EbNjbYEb6ktamlPXNIa-r2B-XDi8H4rYUTMUoJglC8",
  },

  // Recommended: Social media preview (OpenGraph)
  openGraph: {
    title: "Invoaza | Free Freelancer Invoice Generator",
    description: "The simplest way for freelancers to bill clients professionally.",
    url: "https://www.invoaza.com",
    siteName: "Invoaza",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
