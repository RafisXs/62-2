const Produto = require('../models/produtoModel');

exports.listar = (req, res) => {
    res.render('produto', { produtos: Produto.getAll() });
};

exports.novo = (req, res) => {
    res.render('novoproduto');
};

exports.criar = (req, res) => {
    Produto.add(req.body);
    res.redirect('/produtos');
};

exports.editar = (req, res) => {
    const produto = Produto.getById(req.params.id);
    res.render('editarproduto', { produto });
};

exports.atualizar = (req, res) => {
    Produto.update(req.params.id, req.body);
    res.redirect('/produtos');
};

exports.deletar = (req, res) => {
    Produto.delete(req.params.id);
    res.redirect('/produtos');
};