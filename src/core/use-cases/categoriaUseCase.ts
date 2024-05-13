import { Categoria } from "../../core/entities/categoria";
import { CategoriaGatewayInterface } from "../../common/interfaces/gateways";
import { AdicionaCategoriaDTO, CategoriaDTO } from "../../common/types/produto";

export default class CategoriaUseCase {

    static async criarCategoria(adicionaCategoriaDTO: AdicionaCategoriaDTO, gateway: CategoriaGatewayInterface): Promise<Categoria> {
        // Categoria.validaDadosDeEntrada(adicionaCategoriaDTO)

        // const categoria = await CategoriaUseCase.encontrarCategoriaPorNome(adicionaCategoriaDTO.nome, gateway)

        // if ( categoria ) {
        //     throw new Error('Categoria já cadastrada.')
        // }

        return await gateway.criarCategoria(adicionaCategoriaDTO)
    }

    static async encontrarCategoriaPorNome(nome: string, gateway: CategoriaGatewayInterface): Promise<Categoria | null> {
        const categoria = await gateway.encontrarCategoriaPorNome(nome)

        if ( ! categoria ) {
            throw new Error('Categoria não encontrada.')
        }

        return categoria
    }

    static async encontrarCategoriaPorId(categoriaId: string, gateway: CategoriaGatewayInterface): Promise<Categoria> {
        const categoria = await gateway.encontrarCategoriaPorId(categoriaId)

        if ( ! categoria ) {
            throw new Error('Categoria não encontrada.')
        }

        return categoria
    }

    static async atualizarCategoria(categoriaDTO: CategoriaDTO, gateway: CategoriaGatewayInterface): Promise<Categoria> {
        const categoria = await CategoriaUseCase.encontrarCategoriaPorId(categoriaDTO.id, gateway)

        if ( ! categoria ) {
            throw new Error('Categoria não encontrada.')
        }

        return await gateway.atualizarCategoria(categoriaDTO)
    }

    static async removerCategoria(categoriaId: string, gateway: CategoriaGatewayInterface): Promise<boolean> {

        const categoria = await CategoriaUseCase.encontrarCategoriaPorId(categoriaId, gateway)

        if ( ! categoria ) {
            throw new Error('Categoria não encontrada.')
        }

        return await gateway.removerCategoria(categoriaId)
    }

}