import { Outlet } from "react-router";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underlines">hello World</h1>
      <Outlet />
    </>
  );
}

export default App;
