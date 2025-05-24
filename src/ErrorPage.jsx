import React from "react";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="max-w-screen overflow-x-hidden h-screen  space-y-5 bg-zinc-200 flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold text-zinc-900">404</h1>
      <p className="text-xl text-zinc-900">
        Oops! The page you’re looking for can’t be found. It might have been
        moved, deleted, or never existed. Please check the URL or return to the
        homepage to continue exploring.
      </p>
      <Button variant={'blue'}><Link to={`/`}>Go To Home Page</Link></Button>
    </div>
  );
};

export default ErrorPage;
