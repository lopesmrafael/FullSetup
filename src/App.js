import { Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home";
import Account from "./components/Pages/Account";
import Cart from "./components/Pages/Cart";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Container from "./components/Layout/Container";

import Details from "./components/Layout/Details";
import Cadastro from "./components/Pages/Cadastro";
import Login from "./components/Pages/Login";
import CloseCart from "./components/Pages/CloseCart";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<Details />} /> 
          <Route path="/cadastro" element={<Cadastro />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="closecart" element={<CloseCart />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
