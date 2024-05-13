import AssertionConcern from "../../common/asserts/assertionConcern"
import { AdicionaCategoriaDTO, CategoriaDTO } from "../../common/types/produto"

export class Categoria {

    private _id: string
    private _nome: string

    constructor(categoria: CategoriaDTO) {
        Categoria.validaDadosDeEntrada(categoria)

        if ( ! categoria.id ) {
            throw new Error('A categoria não possui um formato válido.')
        }

        this._id = categoria.id
        this._nome = categoria.nome
    }

    get id() : string {
        return this._id
    }

    get nome() : string {
        return this._nome
    }

    public static validaDadosDeEntrada(produto: AdicionaCategoriaDTO | CategoriaDTO) {
        const propriedades = [ 'nome' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'nome':
                    AssertionConcern.AssertArgumentNotNull(produto[prop], 'A categoria não possui um formato válido.')
                    AssertionConcern.AssertArgumentNotEmpty(produto[prop], 'A categoria não possui um formato válido.')
                    break
            }
        })
    }

}