package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.service.ProdutoService;

@RestController
public class ProdutoController {
	
	@Autowired
	private ProdutoService ps;
	
	@GetMapping("/listar")
	public Iterable<ProdutoModelo> lstar() {
		return ps.listar();
	}
	
	@PostMapping("/cadastrar")
	public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm){
		return ps.cadastrar(pm);
	}
	
	@GetMapping("/")
	public String rota() {
		return "API funcionando";
	}
}
