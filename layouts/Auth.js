import React from "react";

export default function Auth({ children }) {
  return (
    <>
     
      <main>
        <section className="relative w-full h-full py-40 min-h-screen" style={{minHeight: '100vh'}}>
          <div
            className="absolute top-0 w-full h-full"
            style={{
              backgroundImage: "url('/img/login_page_background.jpg')",
            }}
          ></div>
          {children}
         
        </section>
      </main>
    </>
  );
}
