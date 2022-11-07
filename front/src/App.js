
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  //obj produt
  const produto = {
    codigo : 0,
    nome: '',
    marca: ''
  }

  //useState
  const [ btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //useEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  //pegando dados do formulario
  const aoDigitar = (e) => {
      setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar}/>
      <Tabela vetor={produtos}/>
    </div>
  );
}

export default App;
