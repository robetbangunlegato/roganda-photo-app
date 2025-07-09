import "./globals.css";
import "./poppins.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Poppins-Regular' }}>
        {children}
      </body>
    </html>
  );
}
