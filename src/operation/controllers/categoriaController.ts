import { CategoriaDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaCategoriaDTO, CategoriaDTO } from "../../common/types/produto";
import CategoriaUseCase from "../../core/use-cases/categoriaUseCase";
import conexao from "../../external/mongodb/conexao";
import MongoDBCategoriaGateway from "../gateways/mongodb//mongoDBCategoriaGateway";
import { CategoriaPresenter } from "../presenters/categoriaPresenter";

export class CategoriaController {
    static async criarCategoria(adicionaCategoriaDTO: AdicionaCategoriaDTO, dataSource: CategoriaDataSourceInterface) {
        const gateway = new MongoDBCategoriaGateway(dataSource)

        try {
            conexao()
            const categoriaCadastrada = await CategoriaUseCase.criarCategoria(adicionaCategoriaDTO, gateway)
            return CategoriaPresenter.toDTO(categoriaCadastrada)
        } catch(err) {
            throw new Error("Não foi possível cadastrar a categoria.")
        }
    }

    static async encontrarCategoriaPorNome(nome: string, dataSource: CategoriaDataSourceInterface) {
        const gateway = new MongoDBCategoriaGateway(dataSource)
        
        try {
            conexao()
            const categoriaEncontrada = await CategoriaUseCase.encontrarCategoriaPorNome(nome, gateway)
            if ( ! categoriaEncontrada ) {
                return null
            }
            return CategoriaPresenter.toDTO(categoriaEncontrada)
        } catch(err) {
            throw new Error("Não foi possível encontrar a categoria.")
        }
    }

    static async encontrarCategoriaPorId(categoriaId: string, dataSource: CategoriaDataSourceInterface) {
        const gateway = new MongoDBCategoriaGateway(dataSource)
        
        try {
            conexao()
            const categoriaEncontrada = await CategoriaUseCase.encontrarCategoriaPorId(categoriaId, gateway)
            if ( ! categoriaEncontrada ) {
                return null
            }
            return CategoriaPresenter.toDTO(categoriaEncontrada)
        } catch(err) {
            throw new Error("Não foi possível encontrar a categoria.")
        }
    }

    static async atualizarCategoria(categoriaDTO: CategoriaDTO, dataSource: CategoriaDataSourceInterface) {
        const gateway = new MongoDBCategoriaGateway(dataSource)

        try {
            conexao()
            const categoriaAtualizada = await CategoriaUseCase.atualizarCategoria(categoriaDTO, gateway)
            return CategoriaPresenter.toDTO(categoriaAtualizada)
        } catch(err) {
            throw new Error("Não foi possível atualizar a categoria.")
        }
    }

    static async removerCategoria(categoriaId: string, dataSource: CategoriaDataSourceInterface) {
        const gateway = new MongoDBCategoriaGateway(dataSource)

        try {
            conexao()
            return await CategoriaUseCase.removerCategoria(categoriaId, gateway)
                .then(() => true)
        } catch(err) {
            throw new Error("Não foi possível remover a categoria.")
        }
    }

}