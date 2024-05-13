import { AdicionaProdutoDTO, ProdutoDTO, AdicionaCategoriaDTO, CategoriaDTO } from "../../common/types/produto";

export interface ProdutoDataSourceInterface {
    criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO): Promise<string>
    encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: string): Promise<ProdutoDTO[]>
    encontrarProdutoPorId(produtoId: string): Promise<ProdutoDTO[]>
    atualizarProduto(produtoDTO: ProdutoDTO): Promise<ProdutoDTO>
    removerProduto(produtoId: string): Promise<boolean>
    listarProdutosPorCategoriaId(categoriaId: string): Promise<ProdutoDTO[]>
}

export interface CategoriaDataSourceInterface {
    criarCategoria(adicionaCategoriaDTO: AdicionaCategoriaDTO): Promise<string>
    encontrarCategoriaPorNome(nome: string): Promise<CategoriaDTO[]>
    encontrarCategoriaPorId(categoriaId: string): Promise<CategoriaDTO[]>
    atualizarCategoria(categoriaDTO: CategoriaDTO): Promise<CategoriaDTO>
    removerCategoria(categoriaId: string): Promise<boolean>
}