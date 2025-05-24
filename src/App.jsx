import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
// import Onboarding from "./pages/Onboarding";
const Onboarding = lazy(()=>import("./pages/Onboarding"));
// import JobListing from "./pages/JobListing";
const JobListing = lazy(()=>import('./pages/JobListing'));
// import PostJob from "./pages/PostJob";
const PostJob = lazy(()=>import('./pages/PostJob'))
// import SavedJob from "./pages/SavedJob";
const SavedJob = lazy(()=>import('./pages/SavedJob'));
// import MyJobs from "./pages/MyJobs";
const MyJobs = lazy(()=>import("./pages/MyJobs"))
import { ThemeProvider } from "./components/theme-provider";
// import JobPage from "./pages/JobPage";
const JobPage = lazy(()=>import('./pages/JobPage'));
import "./App.css";
import ProtectedRoute from "./components/ui/protectedRoute";
import toast, { Toaster } from "react-hot-toast";
// import ErrorPage from "./ErrorPage";
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

/**
 * The <ProtectedRoute> component acts as a wrapper to protect specific routes. Here's how it works:

Wrapped Component: When you wrap a route's element (e.g., <Onboarding />) with <ProtectedRoute>, 
the children prop of <ProtectedRoute> becomes the wrapped component.

Authentication Check: Inside <ProtectedRoute>, it checks if the user is authenticated (isSignedIn) and the
 authentication state is loaded (isLoaded).

Redirect if Not Signed In: If the user is not signed in (!isSignedIn), it redirects them to the sign-in page 
using <Navigate to='/?sign-in=true' />.

Render Protected Content: If the user is signed in, it renders the children (the wrapped component, e.g., <Onboarding />).
 * 
 */
