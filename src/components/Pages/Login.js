import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { logarUsuario } from "../../Firebase/Auth"; // função que criaremos já abaixo

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async () => {
    try {
      await logarUsuario(email, senha);
      setMensagem("Login realizado com sucesso!");
      setEmail("");
      setSenha("");

      // Redireciona para o dashboard ou página principal
      setTimeout(() => navigate("/home"), 1500);
    } catch (erro) {
      setMensagem("Erro ao entrar: " + erro.message);
    }
  };

  const irParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Entre na sua conta</h1>

      <div className={styles.conteudo}>
        <p>Seja bem-vindo novamente, vamos começar:</p>

        <div className={styles.characters}>
          <p>Digite seu email:</p>
          <input
            type="email"
            className={styles.inputEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.characters}>
          <p>Digite sua senha:</p>
          <input
            type="password"
            className={styles.inputEmail}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className={styles.btnLogin} onClick={handleLogin}>
          Entrar
        </button>

        <p style={{ marginTop: "10px" }}>
          Ainda não tem conta?{" "}
          <span
            onClick={irParaCadastro}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            Criar conta
          </span>
        </p>

        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default Login;
