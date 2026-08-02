export const metadata = {
  title: "COIC — Construction Opportunity Institute of Cleveland",
  description:
    "Prepare for a high-paying union apprenticeship through the Construction Opportunity Institute of Cleveland. A free, hands-on pre-apprenticeship program.",
  metadataBase: new URL("https://www.coic.com"),
  openGraph: {
    title: "COIC — Construction Opportunity Institute of Cleveland",
    description:
      "Build your future in the construction trades. Tuition-free 6–8 week pre-apprenticeship program in Cleveland, OH.",
    url: "https://www.coic.com",
    siteName: "COIC",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
