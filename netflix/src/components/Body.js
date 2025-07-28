import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Login";
import Browser from "./Browse";
const Body = () => {
    const appRouter =createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browser",
            element:<Browser/>
        }
    ])
  return (
	<div> 
        <RouterProvider router={appRouter}/>
	</div>
  );
};

export default Body;
