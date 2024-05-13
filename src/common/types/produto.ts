export type AdicionaProdutoDTO = {
    categoriaId: string
    nome: string
    valor: number
}

export type ProdutoDTO = {
    id: string
    categoriaId: string
    nome: string
    valor: number
}

export type AdicionaCategoriaDTO = {
    nome: string
}

export type CategoriaDTO = {
    id: string
    nome: string
}