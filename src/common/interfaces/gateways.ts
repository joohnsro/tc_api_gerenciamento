import { AdicionaProdutoDTO, ProdutoDTO, AdicionaCategoriaDTO, CategoriaDTO } from "../../common/types/produto";
import { Produto } from "../../core/entities/produto";
import { Categoria } from "../../core/entities/categoria";

export interface ProdutoGatewayInterface {
    criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO): Promise<Produto>
    atualizarProduto(produtoDTO: ProdutoDTO): Promise<Produto>
    removerProduto(produtoId: string): Promise<boolean>
    encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: string): Promise<Produto | null>
    encontrarProdutoPorId(produtoId: string): Promise<Produto | null>
    listarProdutosPorCategoriaId(categoriaId: string): Promise<Produto[] | null>
}

export interface CategoriaGatewayInterface {
    criarCategoria(adicionaCategoriaDTO: AdicionaCategoriaDTO): Promise<Categoria>
    atualizarCategoria(categoriaDTO: CategoriaDTO): Promise<Categoria>
    removerCategoria(categoriaId: string): Promise<boolean>
    encontrarCategoriaPorNome(nome: string): Promise<Categoria | null>
    encontrarCategoriaPorId(categoriaId: string): Promise<Categoria | null>
}