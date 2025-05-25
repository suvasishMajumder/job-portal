import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
const Onboarding = lazy(()=>import("./pages/Onboarding"));
const JobListing = lazy(()=>import('./pages/JobListing'));
const PostJob = lazy(()=>import('./pages/PostJob'))
const SavedJob = lazy(()=>import('./pages/SavedJob'));
const MyJobs = lazy(()=>import("./pages/MyJobs"))
import { ThemeProvider } from "./components/theme-provider";
const JobPage = lazy(()=>import('./pages/JobPage'));
import "./App.css";
import ProtectedRoute from "./components/ui/protectedRoute";
import toast, { Toaster } from "react-hot-toast";
const ErrorPage = lazy(()=>import("./ErrorPage"));


const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  useEffect(() => {
    window.addEventListener("error", handleError);

    return () => window.removeEventListener("error", handleError);
  }, []);

  return error ? (
    <div className="text-red-600 text-lg">Error Loaidng Component</div>
  ) : (
    children
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: (
            <ErrorBoundary>
              <Suspense
                fallback={<div className="italic font-bold text-center">Loading...</div>}
              >
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              </Suspense>
            </ErrorBoundary>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ErrorBoundary>
              <Suspense
                fallback={<div className="italic text-center font-bold">Loading...</div>}
              >
              <ProtectedRoute>
                <JobListing />
              </ProtectedRoute>
              </Suspense>
            </ErrorBoundary>
          ),
        },
        {
          path: "/job/:id",
          element: (
              <ErrorBoundary>
              <Suspense
                fallback={<div className="italic text-center font-bold">Loading...</div>}
              >
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
            </Suspense>
            </ErrorBoundary>
          ),
        },
        {
          path: "/post-job",
          element: (
             <ErrorBoundary>
              <Suspense
                fallback={<div className="italic text-center font-bold">Loading...</div>}
              >
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
            </Suspense>
            </ErrorBoundary>
          ),
        },
        {
          path: "/saved-jobs",
          element: (
            <ErrorBoundary>
              <Suspense
                fallback={<div className="italic text-center font-bold">Loading...</div>}
              >
            <ProtectedRoute>
              <SavedJob />
              
            </ProtectedRoute>
            </Suspense>
            </ErrorBoundary>
          ),
        },
        {
          path: "/my-jobs",
          element: (
             <ErrorBoundary>
              <Suspense
                fallback={<div className="italic text-center font-bold">Loading...</div>}
              >
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
            </Suspense>
            </ErrorBoundary>
          ),
        },
        {path:'*',
          element:(

           
            <ErrorPage />
         

          )
        }
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;

