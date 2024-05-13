import { ProdutoDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaProdutoDTO, ProdutoDTO } from "../../common/types/produto";
import ProdutoUseCase from "../../core/use-cases/produtoUseCase";
import conexao from "../../external/mongodb/conexao";
import MongoDBProdutoGateway from "../gateways/mongodb/mongoDBProdutoGateway";
import { ProdutoPresenter } from "../presenters/produtoPresenter";

export class ProdutoController {
    static async criarProduto(adicionaProdutoDTO: AdicionaProdutoDTO, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MongoDBProdutoGateway(dataSource)

        try {
            conexao()
            const produtoCadastrado = await ProdutoUseCase.criarProduto(adicionaProdutoDTO, gateway)
            return ProdutoPresenter.toDTO(produtoCadastrado)
        } catch(err) {
            throw new Error("Não foi possível cadastrar o produto.")
        }
    }

    static async encontrarProdutoPorNomeECategoriaId(nome: string, categoriaId: string, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MongoDBProdutoGateway(dataSource)
        
        try {
            conexao()
            const produtoEncontrado = await ProdutoUseCase.encontrarProdutoPorNomeECategoriaId(nome, categoriaId, gateway)
            if ( ! produtoEncontrado ) {
                return null
            }
            return ProdutoPresenter.toDTO(produtoEncontrado)
        } catch(err) {
            throw new Error("Não foi possível encontrar o produto.")
        }
    }

    static async encontrarProdutoPorId(produtoId: string, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MongoDBProdutoGateway(dataSource)
        
        try {
            conexao()
            const produtoEncontrado = await ProdutoUseCase.encontrarProdutoPorId(produtoId, gateway)
            if ( ! produtoEncontrado ) {
                return null
            }
            return ProdutoPresenter.toDTO(produtoEncontrado)
        } catch(err) {
            throw new Error("Não foi possível encontrar o produto.")
        }
    }

    static async atualizarProduto(produtoDTO: ProdutoDTO, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MongoDBProdutoGateway(dataSource)

        try {
            conexao()
            const produtoAtualizado = await ProdutoUseCase.atualizarProduto(produtoDTO, gateway)
            return ProdutoPresenter.toDTO(produtoAtualizado)
        } catch(err) {
            throw new Error("Não foi possível atualizar o produto.")
        }
    }

    static async removerProduto(produtoId: string, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MongoDBProdutoGateway(dataSource)

        try {
            conexao()
            return await ProdutoUseCase.removerProduto(produtoId, gateway)
                .then(() => true)
        } catch(err) {
            throw new Error("Não foi possível remover o produto.")
        }
    }

    static async listarProdutosPorCategoriaId(categoriaId: string, dataSource: ProdutoDataSourceInterface) {
        const gateway = new MongoDBProdutoGateway(dataSource)

        try {
            conexao()
            const produtosEncontrados = await ProdutoUseCase.listarProdutosPorCategoriaId(categoriaId, gateway)
            if ( ! produtosEncontrados ) {
                return null
            }
            return ProdutoPresenter.toDTOList(produtosEncontrados)
        } catch(err) {
            throw new Error("Não foi possível listar os produtos.")
        }
    }
}