import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/ProductPage";

function App() {

   return (
      <BrowserRouter>
         <Routes>
            <Route path={"/"} element={<HomePage></HomePage>}></Route>
            <Route path={"/cart"} element={<CartPage></CartPage>}></Route>
            <Route path={"/invoices"} element={<InvoicePage></InvoicePage>}></Route>
            <Route path={"/customers"} element={<CustomerPage></CustomerPage>}></Route>
            <Route path={"/statistics"} element={<StatisticPage></StatisticPage>}></Route>
            <Route path={"/register"} element={<RegisterPage></RegisterPage>}></Route>
            <Route path={"/login"} element={<LoginPage></LoginPage>}></Route>
            <Route path={"/products"} element={<ProductPage></ProductPage>}></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
//format document = Ctrl+Alt+L

/*export const RouteControl = ({children}) => { //bu uygulamada güvenliğe önem vermiyoruz. bu yüzden böyle bir giriş sistemi yapılmıştır
   if(localStorage.getItem("user")){
      return children;
   }else{
      return <Navigate to={"/login"}></Navigate>
   }
}*/
/*
<RouteControl>
   <HomePage></HomePage>
</RouteControl>>
*/
