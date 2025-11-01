import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "../../Firebase/Config";
import styles from "./CloseCard.module.css";

const db = getFirestore(app);

function CloseCart() {
  const { user } = useAuth();
  const [itens, setItens] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagamento, setPagamento] = useState("credito");
  const [cartao, setCartao] = useState({
    nome: "",
    numero: "",
    validade: "",
    cvv: "",
  });

  // Cria carrinho automaticamente se não existir e carrega itens
  useEffect(() => {
    if (!user) return;

    const carregarCarrinho = async () => {
      const docRef = doc(db, "carrinhos", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Cria carrinho vazio
        await setDoc(docRef, { itens: [] });
        setItens([]);
        setSubtotal(0);
      } else {
        const data = docSnap.data().itens || [];
        setItens(data);

        const total = data.reduce(
          (acc, item) => acc + (item.preco || 0) * (item.quantidade || 1),
          0
        );
        setSubtotal(total);
      }

      setLoading(false);
    };

    carregarCarrinho();
  }, [user]);

  // Confirma compra
  const confirmarCompra = async () => {
    if (!user) {
      alert("Você precisa estar logado para finalizar a compra.");
      return;
    }

    if (itens.length === 0) return;

    // Salva pedido no Firestore
    await setDoc(doc(db, "pedidos", `${user.uid}_${Date.now()}`), {
      usuario: user.uid,
      itens,
      subtotal,
      pagamento,
      data: new Date().toISOString(),
      status: "pendente",
    });

    // Limpa carrinho
    await setDoc(doc(db, "carrinhos", user.uid), { itens: [] });
    setItens([]);
    setSubtotal(0);

    alert(`Pedido confirmado com sucesso!\nForma de pagamento: ${pagamento}`);
  };

  // Renderiza forma de pagamento
  const renderPagamento = () => {
    switch (pagamento) {
      case "credito":
      case "debito":
        return (
          <div className={styles.cartaoForm}>
            <h4>Dados do Cartão</h4>
            <input
              type="text"
              placeholder="Nome impresso no cartão"
              value={cartao.nome}
              maxLength={50}
              onChange={(e) => setCartao({ ...cartao, nome: e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '') })}
            />
            <input
              type="text"
              placeholder="Número do cartão"
              value={cartao.numero}
              maxLength={19}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                setCartao({ ...cartao, numero: valor });
              }}
            />
            <div className={styles.cardRow}>
              <input
                type="text"
                placeholder="Validade (MM/AA)"
                value={cartao.validade}
                maxLength={5}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/');
                  setCartao({ ...cartao, validade: valor });
                }}
              />
              <input
                type="text"
                placeholder="CVV"
                value={cartao.cvv}
                maxLength={4}
                onChange={(e) => setCartao({ ...cartao, cvv: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          </div>
        );

      case "pix":
        return (
          <div className={styles.pixContainer}>
            <h4>Pagamento via PIX</h4>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pagamento_pix_demo"
              alt="QR Code PIX"
              className={styles.qrCode}
            />
            <p>Escaneie o QR Code acima para realizar o pagamento.</p>
          </div>
        );

      case "boleto":
        return (
          <div className={styles.boletoContainer}>
            <h4>Pagamento via Boleto</h4>
            <button
              className={styles.btnBoleto}
              onClick={() => alert("Boleto gerado! (simulação)")}
            >
              Baixar Boleto
            </button>
          </div>
        );

      default:
        return <p>Selecione uma forma de pagamento.</p>;
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Finalizar Compra</h1>

      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className={styles.listaItens}>
            {itens.map((item, index) => (
              <li key={index} className={styles.item}>
                <img
                  src={item.Image || "https://via.placeholder.com/100?text=Sem+Imagem"}
                  alt={item.nome}
                  className={styles.imageProduct}
                />
                <div>
                  <strong>{item.nome}</strong>
                  <p>
                    {item.quantidade}x R$ {item.preco.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className={styles.subtotal}>Subtotal: R$ {subtotal.toFixed(2)}</h3>

          <div className={styles.pagamentoContainer}>
            <h3>Forma de Pagamento</h3>
            <select
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
              className={styles.selectPagamento}
            >
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto Bancário</option>
            </select>
          </div>

          <div className={styles.pagamentoDetalhe}>{renderPagamento()}</div>

          <button onClick={confirmarCompra} className={styles.buttonConfirm}>
            Confirmar Pedido
          </button>
        </>
      )}
    </div>
  );
}

export default CloseCart;
