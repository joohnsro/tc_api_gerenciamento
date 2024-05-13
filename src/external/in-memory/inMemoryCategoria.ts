import { CategoriaDTO, AdicionaCategoriaDTO } from "../../common/types/produto"
import { CategoriaDataSourceInterface } from "../../common/interfaces/datasource"

export default class InMemoryCategoria implements CategoriaDataSourceInterface {

    private categorias: any[] = [
        { id: "1", nome: 'Lanches' },
        { id: "2", nome: 'Bebidas' },
        { id: "3", nome: 'Acompanhamentos' }
    ]

    async criarCategoria(adcionaCategoriaDTO: AdicionaCategoriaDTO): Promise<string> {
        const tempCategorias: CategoriaDTO[] = [...this.categorias]
        if ( tempCategorias.length > 1 ) {
            tempCategorias.sort((a: CategoriaDTO, b: CategoriaDTO): any => {
                if ( a.id && b.id ) {
                    return parseInt(a.id) - parseInt(b.id)
                } else {
                    return false
                }
            })
            tempCategorias.reverse()
        }

        let ultimoId: number|undefined = tempCategorias[0] ? parseInt(tempCategorias[0].id) : 0
        let categoriaId = ultimoId ? ultimoId + 1 : 1

        const produto = {id: categoriaId, ...adcionaCategoriaDTO}
        this.categorias.push(produto)
        
        return String(categoriaId)
    }

    async encontrarCategoriaPorId(categoriaId: string): Promise<CategoriaDTO[]> {
        return this.categorias.filter(categoria => categoria.id === categoriaId)
    }

    async encontrarCategoriaPorNome(categoriaNome: string): Promise<CategoriaDTO[]> {
        return this.categorias.filter(categoria => categoria.nome === categoriaNome)
    }

    async atualizarCategoria(categoria: CategoriaDTO): Promise<CategoriaDTO> {
        this.categorias.forEach(item => {
            if ( item.id === categoria.id ) {
                item.nome = categoria.nome
            }
        })

        return this.categorias.filter(item => item.id === categoria.id)[0]
    }

    async removerCategoria(categoriaId: string): Promise<boolean> {
        const posicaoCategoria = this.categorias.map(item => item.id).indexOf(categoriaId)
        this.categorias.splice(posicaoCategoria, 1)

        return true
    }

}