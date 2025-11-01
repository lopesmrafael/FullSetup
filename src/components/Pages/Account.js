import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../../Firebase/Config";
import styles from "./Account.module.css";

const db = getFirestore(app);

function Account() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loginUsuario, setLoginUsuario] = useState("");

  useEffect(() => {
    if (user) {
      const pegarLogin = async () => {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLoginUsuario(docSnap.data().login);
        }
      };
      pegarLogin();
    }
  }, [user]);

  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.titulo}>Minha Conta</h1>
        <div className={styles.conteudo}>
          <p>Bem-vindo! Faça login ou crie uma conta para acessar sua área.</p>
          <button className={styles.btnEntrar} onClick={() => navigate("/login")}>
            Entrar
          </button>
          <button className={styles.btnCriarConta} onClick={() => navigate("/cadastro")}>
            Criar Conta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Minha Conta</h1>
      <div className={styles.conteudo}>
        <p>Bem-vindo, {loginUsuario || user.email}!</p>
        <p>Aqui você pode gerenciar seus dados e pedidos.</p>
        <button className={styles.btnCriarConta} onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Account;
