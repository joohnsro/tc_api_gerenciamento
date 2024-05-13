import { Request, Response } from "express"
import { AdicionaProdutoDTO, ProdutoDTO } from "../../../../common/types/produto"
import { ProdutoController } from "../../../../operation/controllers/produtoController"
import MongoDBProduto from "../../../mongodb/mongoDBProduto"

export default {
    criarProduto: async (req: Request, res: Response) => {
        const adicionaProdutoDTO: AdicionaProdutoDTO = {...req.body}
        const dataSource = new MongoDBProduto()
        await ProdutoController.criarProduto(adicionaProdutoDTO, dataSource)
            .then(produto => res.send(produto))
            .catch(error => res.send({error: error.message}))
    },
    atualizarProduto: async (req: Request, res: Response) => {
        const id = req.params.produtoId ? req.params.produtoId : ''
        const dataSource = new MongoDBProduto()
        const produto: ProdutoDTO = {id, ...req.body}
        await ProdutoController.atualizarProduto(produto, dataSource)
            .then(produtoAtualizado => res.send(produtoAtualizado))
            .catch(error => res.send({error: error.message}))
    },
    removerProduto: async (req: Request, res: Response) => {
        const produtoId: string = req.params.produtoId ? req.params.produtoId : ''
        const dataSource = new MongoDBProduto()
        await ProdutoController.removerProduto(produtoId, dataSource)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    encontrarProdutoPorNomeECategoriaId: async (req: Request, res: Response) => {
        const nome: string = req.params.nome ? req.params.nome : ''
        const categoriaId: string = req.params.categoriaId ? req.params.categoriaId : ''
        const dataSource = new MongoDBProduto()
        await ProdutoController.encontrarProdutoPorNomeECategoriaId(nome, categoriaId, dataSource)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    encontrarProdutoPorId: async (req: Request, res: Response) => {
        const produtoId: string = req.params.produtoId ? req.params.produtoId : ''
        const dataSource = new MongoDBProduto()
        await ProdutoController.encontrarProdutoPorId(produtoId, dataSource)
            .then(response => res.send(response))
            .catch(error => res.send({error: error.message}))
    },
    listarProdutosPorCategoriaId: async (req: Request, res: Response) => {
        const q: string = req.query.q ? String(req.query.q) : '0'
        const categoriaId: string = req.query.q ? q : ''
        const dataSource = new MongoDBProduto()
        await ProdutoController.listarProdutosPorCategoriaId(categoriaId, dataSource)
            .then(produtos => res.send(produtos))
            .catch(error => res.send({error: error.message}))
    }
}