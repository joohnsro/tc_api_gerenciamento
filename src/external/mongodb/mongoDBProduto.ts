import { ProdutoDTO, AdicionaProdutoDTO } from "../../common/types/produto";
import { ProdutoDataSourceInterface } from "../../common/interfaces/datasource";
import Produto from "./model/produto"
import { ObjectId } from "mongodb";

export default class MongoDBProduto implements ProdutoDataSourceInterface {

    async criarProduto(produto: AdicionaProdutoDTO): Promise<string> {
        const novoProduto = new Produto({ 
            categoriaId: produto.categoriaId, nome: produto.nome, valor: produto.valor
        })
        return await novoProduto.save()
            .then(({_id}) => String(_id))
    }

    async encontrarProdutoPorId(produtoId: string): Promise<ProdutoDTO[]> {
        return await Produto.findById(produtoId)
            .exec()
            .then(produtoEncontrado => {
                if ( ! produtoEncontrado?._id ) {
                    return null
                }

                const produto: ProdutoDTO = {
                    id: String(produtoEncontrado._id),
                    categoriaId: String(produtoEncontrado.categoriaId),
                    nome: produtoEncontrado.nome,
                    valor: produtoEncontrado.valor
                }

                return [produto]
            })
            .catch(err => err)
    }

    async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: string): Promise<ProdutoDTO[]> {
        const categoriaObjectId = new ObjectId(categoriaId)
        return await Produto.findOne({ nome: nome, categoriaId: categoriaObjectId })
            .exec()
            .then(produtoEncontrado => {
                if ( ! produtoEncontrado?._id ) {
                    return null
                }

                const produto: ProdutoDTO = {
                    id: String(produtoEncontrado._id),
                    categoriaId: String(produtoEncontrado.categoriaId),
                    nome: produtoEncontrado.nome,
                    valor: produtoEncontrado.valor
                }

                return [produto]
            })
            .catch(err => err)
    }

    async atualizarProduto(produtoDTO: ProdutoDTO): Promise<ProdutoDTO> {
        const produtoObjectId = new ObjectId(produtoDTO.id)
        const categoriaObjectId = new ObjectId(produtoDTO.categoriaId)
        return await Produto.findByIdAndUpdate(produtoObjectId, {
                nome: produtoDTO.nome,
                categoriaId: categoriaObjectId,
                valor: produtoDTO.valor
            })
            .exec()
            .then(() => produtoDTO)
            .catch(err => err)
    }

    async removerProduto(produtoId: string): Promise<boolean> {
        const produtoObjectId = new ObjectId(produtoId)
        return await Produto.findByIdAndDelete(produtoObjectId)
            .exec()
            .then(() => true)
            .catch(() => false)
    }

    async listarProdutosPorCategoriaId(categoriaId: string): Promise<ProdutoDTO[]> {
        const categoriaObjectId = new ObjectId(categoriaId)
        return await Produto.find({ categoriaId: categoriaObjectId })
            .exec()
            .then(response => {
                const produtosEncontrados = response.map(item => ({
                    id: String(item._id),
                    nome: item.nome,
                    categoriaId: String(item.categoriaId),
                    valor: item.valor
                }))

                return produtosEncontrados
            })
            .catch(err => err)
    }

}