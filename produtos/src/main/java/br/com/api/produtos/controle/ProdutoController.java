package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.service.ProdutoService;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {
	
	@Autowired
	private ProdutoService ps;
	
	@GetMapping("/listar")
	public Iterable<ProdutoModelo> lstar() {
		return ps.listar();
	}
	
	@PostMapping("/cadastrar")
	public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm){
		return ps.cadastrarEditar(pm, "cadastrar");
	}
	
	@PutMapping("/editar")
	public ResponseEntity<?> editar(@RequestBody ProdutoModelo pm){
		return ps.cadastrarEditar(pm, "editar");
	}
	
	@DeleteMapping("/remover/{codigo}")
	public ResponseEntity<RespostaModelo> remover(@PathVariable Long codigo){
		return ps.remove(codigo);
	}
	
	@GetMapping("/")
	public String rota() {
		return "API funcionando";
	}
}
