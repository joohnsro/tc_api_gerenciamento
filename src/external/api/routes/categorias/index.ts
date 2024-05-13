import { Router } from "express"
import categorias from "./categorias"

const router = Router()
router.post('/categoria', categorias.criarCategoria)
router.get('/categoria/:categoriaId', categorias.encontrarCategoriaPorId)
router.get('/categoria/nome/:nome', categorias.encontrarCategoriaPorNome)
router.put('/categoria/:categoriaId', categorias.atualizarCategoria)
router.delete('/categoria/:categoriaId', categorias.removerCategoria)

export default router