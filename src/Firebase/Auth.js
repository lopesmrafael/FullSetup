import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "./Config";

const auth = getAuth(app);
const db = getFirestore(app);

export async function registrarUsuario(email, senha, login) {
  try {
    // Cria a conta no Firebase Authentication
    const credenciais = await createUserWithEmailAndPassword(auth, email, senha);

    // Salva dados no Firestore (coleção 'usuarios')
    await setDoc(doc(db, "usuarios", credenciais.user.uid), {
      email: email,
      login: login,
      criadoEm: new Date()
    });

    console.log("Usuário criado com sucesso:", credenciais.user.uid);
    return credenciais.user.uid;
  } catch (erro) {
    console.error("Erro ao registrar:", erro);
    throw erro;
  }
}
export default registrarUsuario;

export async function logarUsuario(email, senha) {
  try {
    const credenciais = await signInWithEmailAndPassword(auth, email, senha);
    console.log("Usuário logado:", credenciais.user.uid);
    return credenciais.user;
  } catch (erro) {
    console.error("Erro ao logar:", erro);
    throw erro;
  }
}
