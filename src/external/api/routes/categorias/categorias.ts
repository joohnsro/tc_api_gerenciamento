import { Request, Response } from "express"
import { AdicionaCategoriaDTO, CategoriaDTO } from "../../../../common/types/produto"
import { CategoriaController } from "../../../../operation/controllers/categoriaController"
import MongoDBCategoria from "../../../mongodb/mongoDBCategoria"

export default {
    criarCategoria: async (req: Request, res: Response) => {
        const adicionaCategoriaDTO: AdicionaCategoriaDTO = {...req.body}
        const dataSource = new MongoDBCategoria()
        await CategoriaController.criarCategoria(adicionaCategoriaDTO, dataSource)
            .then(categoria => res.send(categoria))
            .catch(error => res.send({error: error.message}))
    },
    atualizarCategoria: async (req: Request, res: Response) => {
        const id = req.params.categoriaId ? req.params.categoriaId : ''
        const dataSource = new MongoDBCategoria()
        const categoria: CategoriaDTO = {id, ...req.body}
        await CategoriaController.atualizarCategoria(categoria, dataSource)
            .then(categoriaAtualizada => res.send(categoriaAtualizada))
            .catch(error => res.send({error: error.message}))
    },
    removerCategoria: async (req: Request, res: Response) => {
        const categoriaId: string = req.params.categoriaId ? req.params.categoriaId : ''
        const dataSource = new MongoDBCategoria()
        await CategoriaController.removerCategoria(categoriaId, dataSource)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    encontrarCategoriaPorId: async (req: Request, res: Response) => {
        const categoriaId: string = req.params.categoriaId ? req.params.categoriaId : ''
        const dataSource = new MongoDBCategoria()
        await CategoriaController.encontrarCategoriaPorId(categoriaId, dataSource)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    encontrarCategoriaPorNome: async (req: Request, res: Response) => {
        const nome: string = req.params.nome ? req.params.nome : ''
        const dataSource = new MongoDBCategoria()
        await CategoriaController.encontrarCategoriaPorNome(nome, dataSource)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
}