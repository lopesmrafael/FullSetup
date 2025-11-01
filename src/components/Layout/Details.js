import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "../../Firebase/Config";

import styles from "./Details.module.css";

const db = getFirestore(app);

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const produto = location.state;

  if (!produto) {
    navigate("/", { replace: true });
    return null;
  }

  const adicionarAoCarrinho = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Você precisa estar logado para adicionar ao carrinho!");
      navigate("/login");
      return;
    }

    const quantidade = parseInt(e.target.quantity.value, 10) || 1;

    const docRef = doc(db, "carrinhos", user.uid);
    const docSnap = await getDoc(docRef);
    let itens = [];

    if (docSnap.exists()) {
      itens = docSnap.data().itens || [];
    }

    const produtoExistente = itens.find((i) => i.nome === produto.nome);

    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
    } else {
      itens.push({ ...produto, quantidade });
    }

    await setDoc(docRef, { itens });

    navigate("/cart");
  };

  return (
    <div className={styles.container_details}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Detalhes do Produto</h1>
      </div>

      <div className={styles.card}>
        <img src={produto.Image} alt={produto.nome} className={styles.image} />

        <div className={styles.text}>
          <h2 className={styles.nome_details}>{produto.nome}</h2>
          <h3 className={styles.preco_details}>
            {produto.preco ? `R$ ${produto.preco.toFixed(2)}` : "Preço indisponível"}
          </h3>

          <form onSubmit={adicionarAoCarrinho}>
            <input
              type="number"
              name="quantity"
              min="1"
              defaultValue="1"
              className={styles.input_quantidade}
            />
            <button type="submit" className={styles.botao_carrinho}>
              Adicionar ao Carrinho
            </button>
          </form>
        </div>
      </div>

      <div className={styles.descricao_container}>
        <h4 className={styles.descricao_title}>Descrição do produto</h4>
        <p className={styles.descricao}>{produto.descricao}</p>
      </div>
    </div>
  );
}

export default Details;
