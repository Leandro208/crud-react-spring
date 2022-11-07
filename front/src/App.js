
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

  //cadastrar
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objProduto),
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      } else {
        setProdutos([...produtos, retorno_convertido]);
        alert("Produto cadastrado!");
        limparFormulario();
      }
    })
  }


  //deletar
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo,{
      method:'delete',
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert(retorno_convertido.mensagem);
      //copia vetor produtos

      let vetortemp = [...produtos];

      let indice = vetortemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo;
      });

      // remover produto do vetor temp
      vetortemp.splice(indice, 1);

      setProdutos(vetortemp);

      //limpar form
      limparFormulario();

    })
  }


  //alterar
  const alterar = () => {
    fetch('http://localhost:8080/editar',{
      method:'put',
      body:JSON.stringify(objProduto),
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      } else {
        
        alert("Produto alterado!");

        //copia vetor produtos

        let vetortemp = [...produtos];

        let indice = vetortemp.findIndex((p) =>{
          return p.codigo === objProduto.codigo;
        });

        // alterar produto do vetor temp
        vetortemp[indice] = objProduto;

        setProdutos(vetortemp);


        limparFormulario();
      }
    })
  }

  //limpar formulario
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //selecionar produto

  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>

      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} 
      cadastrar={cadastrar} obj={objProduto} cancelar = {limparFormulario}
      remover = {remover} alterar = {alterar}/>
      <Tabela vetor={produtos} selecionar = {selecionarProduto}/>
    </div>
  );
}

export default App;
