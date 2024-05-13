import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    categoriaId: {
        type: ObjectId,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Produto', ProdutoSchema)