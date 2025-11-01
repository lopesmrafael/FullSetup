import styles from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { registrarUsuario } from "../../Firebase/Auth"; // já está correto

function Cadastro() {
  const navigate = useNavigate();

  // Estados para capturar os dados do formulário
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Função executada ao clicar no botão
  const handleCriarConta = async () => {
    // Validação mínima
    if (!email || !login || !senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }
    if (senha.length < 6) {
      setMensagem("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      await registrarUsuario(email, senha, login);
      setMensagem("Conta criada com sucesso!");

      // Limpa os campos
      setEmail("");
      setLogin("");
      setSenha("");

      // Redireciona para login após 2 segundos
      setTimeout(() => navigate("/login"), 2000);
    } catch (erro) {
      // Tratamento de erros comuns do Firebase
      if (erro.code === "auth/email-already-in-use") {
        setMensagem("Esse e-mail já está em uso. Tente outro.");
      } else if (erro.code === "auth/weak-password") {
        setMensagem("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setMensagem("Erro ao criar conta: " + erro.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Criar Conta</h1>

      <div className={styles.conteudo}>
        <p>Seja bem-vindo, vamos criar sua conta:</p>

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
          <p>Digite seu login:</p>
          <input
            type="text"
            className={styles.inputEmail}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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

        <button className={styles.btnCriarConta} onClick={handleCriarConta}>
          Criar Conta
        </button>

        {mensagem && (
          <p style={{ color: mensagem.includes("Erro") ? "red" : "green" }}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default Cadastro;
