import { ProdutoDTO, AdicionaProdutoDTO } from "../../common/types/produto"
import { ProdutoDataSourceInterface } from "../../common/interfaces/datasource"

export default class InMemoryProduto implements ProdutoDataSourceInterface {
    
    private produtos: ProdutoDTO[] = [
        { id: '1', nome: 'X Salada', valor: 22.90, categoriaId: '1' },
        { id: '2', nome: 'Coca-cola', valor: 7.5, categoriaId: '2' }
    ]

    async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: string): Promise<ProdutoDTO[]> {
        return this.produtos.filter(produto => produto.nome === nome && produto.categoriaId === categoriaId)
    }

    async criarProduto(adcionaProdutoDTO: AdicionaProdutoDTO): Promise<string> {
        const tempProdutos: ProdutoDTO[] = [...this.produtos]
        if ( tempProdutos.length > 1 ) {
            tempProdutos.sort((a: ProdutoDTO, b: ProdutoDTO): any => {
                if ( a.id && b.id ) {
                    return parseInt(a.id) - parseInt(b.id)
                } else {
                    return false
                }
            })
            tempProdutos.reverse()
        }

        let ultimoId: string|undefined = tempProdutos[0] ? String(tempProdutos[0].id) : '0'
        let produtoId = ultimoId ? parseInt(ultimoId) + 1 : 1

        const produto = {id: String(produtoId), ...adcionaProdutoDTO}
        this.produtos.push(produto)
        
        return String(produtoId)
    }

    async encontrarProdutoPorId(produtoId: string): Promise<ProdutoDTO[]> {
        return this.produtos.filter(produto => produto.id === produtoId)
    }

    async atualizarProduto(produto: ProdutoDTO): Promise<ProdutoDTO> {
        this.produtos.forEach(item => {
            if ( item.id === produto.id ) {
                item.nome = produto.nome
                item.categoriaId = produto.categoriaId
            }
        })

        return this.produtos.filter(item => item.id === produto.id)[0]
    }

    async removerProduto(produtoId: string): Promise<boolean> {
        const posicaoProduto = this.produtos.map(item => item.id).indexOf(produtoId)
        this.produtos.splice(posicaoProduto, 1)

        return true
    }

    async listarProdutosPorCategoriaId(categoriaId: string): Promise<ProdutoDTO[]> {
        return this.produtos.filter(item => item.categoriaId === categoriaId)
    }

}