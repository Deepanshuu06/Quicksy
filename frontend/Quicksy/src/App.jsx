import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import  { Toaster } from 'react-hot-toast';



function App() {


  return (
    <div className="App">

      <Navbar />
      <Outlet />
      <Toaster />
    </div>
     
  );
}

export default App;
