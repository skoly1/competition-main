import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import CharactersPage from "./characters";
import { Layout, Navbar } from "../components";
import ComicsPage from "./comics";
import EventsPage from "./events";
import HomePage from "./home";
import SeriesPage from "./series";
import ErrorPage from "./error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/characters" replace />,
          },
          { index: true, element: <HomePage /> },
          {
            path: "/characters",
            element: <CharactersPage />,
          },
          { path: "/comics", element: <ComicsPage /> },
          { path: "/events", element: <EventsPage /> },
          { path: "/series", element: <SeriesPage /> },
        ],
      },
    ],
  },
]);

//******************************** */
// return <RouterProvider router={router} />;
// return (
//   <Routes>
//     <Route path="/" element={<HomePage />}>
//       <Route index element={<HomePage />} />
//       <Route path="characters" element={<CharactersPage />} />
//       <Route path="comics" element={<ComicsPage />} />
//       <Route path="creators" element={<CreatorsPage />} />
//       <Route path="events" element={<EventsPage />} />
//       <Route path="series" element={<SeriesPage />} />
//       <Route path="stories" element={<StoriesPage />} />
//       <Route path="*" element={<CharactersPage />} />
//     </Route>
//   </Routes>
// );
//
// };

// export default Main;
