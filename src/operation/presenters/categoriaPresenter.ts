import { Categoria } from "../../core/entities/categoria";

export class CategoriaPresenter {
    static toDTO(categoria: Categoria) {
        const categoriaDTO = {
            id: categoria.id,
            nome: categoria.nome
        }

        return {
            id: categoriaDTO.id,
            nome: categoriaDTO.nome
        }
    }
}