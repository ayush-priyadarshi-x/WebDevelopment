import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="root flex flex-col min-h-screen">
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
