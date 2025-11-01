import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import styles from "./Cart.module.css";

import { IoTrashBinOutline } from "react-icons/io5";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "../../Firebase/Config";

import mascote from "../../img/mascote.png";

const db = getFirestore(app);

function Cart() {
  const [carrinho, setCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const pegarCarrinho = async () => {
      const docRef = doc(db, "carrinhos", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCarrinho(docSnap.data().itens || []);
      } else {
        setCarrinho([]);
      }
    };

    pegarCarrinho();
  }, [user]);

  useEffect(() => {
    const total = carrinho.reduce(
      (acc, item) => acc + (item.preco || 0) * (item.quantidade || 1),
      0
    );
    setSubtotal(total);
  }, [carrinho]);

  const atualizarCarrinho = async (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    if (!user) return;
    await setDoc(doc(db, "carrinhos", user.uid), { itens: novoCarrinho });
  };

  const removerItem = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    atualizarCarrinho(novoCarrinho);
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) return;
    //atualizarCarrinho([]);
    //setSubtotal(0);
    navigate("/closecart");
  };

  const CarrinhoVazio = () => (
    <div className={styles.vazioContainer}>
      <p className={styles.vazio}>Seu carrinho está vazio.</p>
      <img src={mascote} alt="Mascote da loja" className={styles.mascote}/>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>🛒 Carrinho de Compras</h1>

      {carrinho.length === 0 ? (
        <CarrinhoVazio />
      ) : (
        <>
          <ul className={styles.lista}>
            {carrinho.map((item, index) =>
              item ? (
                <li key={index} className={styles.item}>
                  {item.Image && (
                    <img
                      src={item.Image}
                      alt={item.nome || "Produto"}
                      className={styles.imagem}
                    />
                  )}
                  <div className={styles.info}>
                    <span className={styles.nome}>{item.nome}</span>
                    <span className={styles.preco}>
                      {item.quantidade}x R$ {item.preco?.toFixed(2) || "0,00"}
                    </span>
                  </div>
                  <button
                    className={styles.button_delete}
                    onClick={() => removerItem(index)}
                  >
                    <IoTrashBinOutline />
                  </button>
                </li>
              ) : null
            )}
          </ul>

          <div className={styles.subtotal_container}>
            <strong>Subtotal:</strong> R$ {subtotal.toFixed(2)}
            <button className={styles.btnFinalizar} onClick={finalizarCompra}>
              Pagamento
            </button>
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              className={styles.btnContinuar}
              onClick={() => navigate("/")}
            >
              Continuar Comprando
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
