import React from "react";
import Header from "./Header";
import Footer from "./Footer";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>
      {children}
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
