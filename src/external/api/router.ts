import { Router } from "express"
import produtos from "./routes/produtos"
import categorias from "./routes/categorias"

const router = Router()
router.use(produtos)
router.use(categorias)

export default router