let produtos = [];

module.exports = {
    getAll: () => produtos,

    getById: (id) => produtos.find(p => p.id == id),

    add: (produto) => {
        produto.id = Date.now();
        produtos.push(produto);
    },

    update: (id, novoProduto) => {
        let produto = produtos.find(p => p.id == id);
        if (produto) {
            produto.nome = novoProduto.nome;
            produto.preco = novoProduto.preco;
        }
    },

    delete: (id) => {
        produtos = produtos.filter(p => p.id != id);
    }
};