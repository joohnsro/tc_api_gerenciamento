import { describe, test, expect } from "@jest/globals"
import { AdicionaCategoriaDTO, CategoriaDTO } from "../src/common/types/produto"
import InMemoryCategoria from "../src/external/in-memory/InMemoryCategoria"
import InMemoryCategoriaGateway from "../src/operation/gateways/in-memory/inMemoryCategoriaGateway"
import CategoriaUseCase from "../src/core/use-cases/categoriaUseCase"

describe('Serviços da categoria', () => {

    test('Cadastrar uma categoria', async () => {
        const adicionaCategoriaDTO: AdicionaCategoriaDTO = {
            nome: 'Sobremesas'
        }

        const dataSource = new InMemoryCategoria()
        const gateway = new InMemoryCategoriaGateway(dataSource)
        const categoria = await CategoriaUseCase.criarCategoria(adicionaCategoriaDTO, gateway)

        expect(categoria.id).toBe(4)
    })

    test('Editar categoria', async () => {
        const categoriaDTO: CategoriaDTO = {
            id: 2,
            nome: 'Bebidas'
        }

        const dataSource = new InMemoryCategoria()
        const gateway = new InMemoryCategoriaGateway(dataSource)
        const categoriaAtualizado = await CategoriaUseCase.atualizarCategoria(categoriaDTO, gateway)

        expect(JSON.stringify({
            id: categoriaAtualizado.id,
            nome: categoriaAtualizado.nome
        })).toStrictEqual(JSON.stringify(categoriaDTO))
    })

    test('Remover categoria', async () => {
        const categoriaId = 2

        const dataSource = new InMemoryCategoria()
        const gateway = new InMemoryCategoriaGateway(dataSource)
        const categoriaFoiRemovida = await CategoriaUseCase.removerCategoria(categoriaId, gateway)

        expect(categoriaFoiRemovida).toBeTruthy()
    })

})