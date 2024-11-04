import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProviderWrapper>
      <div>
        <Navbar />
        {children}
      </div>
    </SessionProviderWrapper>
  );
};

export default layout;
