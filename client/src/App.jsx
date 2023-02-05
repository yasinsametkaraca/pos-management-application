import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";


function App() {


   return (
      <BrowserRouter>
         <Routes>
            <Route path={"/"} element={<HomePage></HomePage>}></Route>
            <Route path={"/cart"} element={<CartPage></CartPage>}></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
//format document = Ctrl+Alt+L