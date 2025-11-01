import { Link } from "react-router-dom";

import styles from "./navbar.module.css";

import Logo from "../img/logotipo.png";

function Navbar() {
  return (
    <nav className={styles.navbar_container}>
      <Link to="/" className={styles.logo_container}>
        <img src={Logo} alt="FullSetup" className={styles.logo} />
      </Link>

      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/">Home</Link> |{" "}
        </li>
        <li className={styles.item}>
          <Link to="/account">Account</Link> |{" "}
        </li>
        <li className={styles.item}>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
