import { CategoriaDTO, AdicionaCategoriaDTO } from "../../common/types/produto";
import { CategoriaDataSourceInterface } from "../../common/interfaces/datasource";
import Categoria from "./model/categoria";
import { ObjectId } from "mongodb";

export default class MongoDBCategoria implements CategoriaDataSourceInterface {

    async criarCategoria(adicionaCategoriaDTO: AdicionaCategoriaDTO): Promise<string> {
        const novaCategoria = new Categoria({ nome: adicionaCategoriaDTO.nome })
        return await novaCategoria.save()
            .then(({_id}) => String(_id))
    }
    
    async encontrarCategoriaPorNome(nome: string): Promise<CategoriaDTO[]> {
        return await Categoria.findOne({ nome })
            .exec()
            .then(categoriaEncontrada => {
                if ( ! categoriaEncontrada?._id ) {
                    return null
                }

                const categoria: CategoriaDTO = {
                    id: String(categoriaEncontrada?._id),
                    nome: categoriaEncontrada?.nome
                }
                return [categoria]
            })
            .catch(err => err)
    }
    
    async encontrarCategoriaPorId(categoriaId: string): Promise<CategoriaDTO[]> {
        return await Categoria.findById(categoriaId)
            .exec()
            .then(categoriaEncontrada => {
                if ( ! categoriaEncontrada?._id ) {
                    return null
                }

                const categoria: CategoriaDTO = {
                    id: String(categoriaEncontrada._id),
                    nome: categoriaEncontrada.nome
                }
                return [categoria]
            })
            .catch(err => err)
    }
    
    async atualizarCategoria(categoriaDTO: CategoriaDTO): Promise<CategoriaDTO> {
        const categoriaObjectId = new ObjectId(categoriaDTO.id)
        return await Categoria.findByIdAndUpdate(categoriaObjectId, { nome: categoriaDTO.nome })
                .exec()
                .then(() => categoriaDTO)
                .catch(err => err)
    }

    async removerCategoria(categoriaId: string): Promise<boolean> {
        const categoriaObjectId = new ObjectId(categoriaId)
        return await Categoria.findByIdAndDelete(categoriaObjectId)
            .exec()
            .then(() => true)
            .catch(() => false)
    }

}