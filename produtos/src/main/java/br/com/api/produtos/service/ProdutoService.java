package br.com.api.produtos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository pr;
	
	@Autowired
	private RespostaModelo rm;
	
	public Iterable<ProdutoModelo> listar(){
		return pr.findAll();
	}
	
	// Metodo que cadastra e altera 
	public ResponseEntity<?> cadastrarEditar(ProdutoModelo pm, String acao){
		
		if(pm.getNome().equals("")) {
			rm.setMensagem("o nome do produto é obrigatorio!");
			return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
		} else if(pm.getMarca().equals("")) {
			rm.setMensagem("O nome da marca é obrigatorio!");
			return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
		} else {
			if(acao.equals("cadastrar")) {
				return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
			}
		}
	}
}
