import { CategoriaGatewayInterface } from "../../../common/interfaces/gateways";
import { CategoriaDataSourceInterface } from "../../../common/interfaces/datasource";
import { AdicionaCategoriaDTO, CategoriaDTO } from "../../../common/types/produto";
import { Categoria } from "../../../core/entities/categoria"

export default class InMemoryCategoriaGateway implements CategoriaGatewayInterface {

    private readonly dataSource: CategoriaDataSourceInterface;

    constructor(dataSource: CategoriaDataSourceInterface) {
        this.dataSource = dataSource
    }

    async criarCategoria(adicionaCategoriaDTO: AdicionaCategoriaDTO): Promise<Categoria> {
        const categoriaId = await this.dataSource.criarCategoria(adicionaCategoriaDTO)
        return new Categoria({
            id: categoriaId,
            ...adicionaCategoriaDTO
        })
    }

    async encontrarCategoriaPorNome(nome: string): Promise<Categoria | null> {
        const categoriasDataSource = await this.dataSource.encontrarCategoriaPorNome(nome)

        if ( categoriasDataSource === null || categoriasDataSource === undefined || categoriasDataSource.length < 1 ) {
            return null
        }

        return new Categoria(categoriasDataSource[0])
    }

    async encontrarCategoriaPorId(categoriaId: string): Promise<Categoria | null> {
        const categoriasDataSource = await this.dataSource.encontrarCategoriaPorId(categoriaId)

        if ( ! categoriasDataSource || categoriasDataSource === null || categoriasDataSource === undefined || categoriasDataSource.length < 1 ) {
            return null
        }

        return new Categoria(categoriasDataSource[0])
    }

    async atualizarCategoria(categoriaDTO: CategoriaDTO): Promise<Categoria> {
        const resposta = await this.dataSource.atualizarCategoria(categoriaDTO)
        return new Categoria(resposta)
    }

    async removerCategoria(categoriaId: string): Promise<boolean> {
        return this.dataSource.removerCategoria(categoriaId)    
    }

}