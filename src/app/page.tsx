import React from "react";
// import ReactForm from "@/components/form/form";
import ZodForm from "@/components/form/zodForm";

const Home = () => {
  return (
    <main>
      <h1 className="wi-full mx-auto h-20 py-6 text-center text-xl font-bold uppercase">
        Zod + React-hook-form
      </h1>
      <ZodForm />
    </main>
  );
};

export default Home;
