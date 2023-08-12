class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.validaMetodoPagamento(metodoDePagamento)) {
            return "Forma de pagamento inválida!"
        }
        if (this.verificaCarrinhoVazio(itens)) {
            return "Não há itens no carrinho de compra!"
        }


        return "";
    }

    validaMetodoPagamento(metodoDePagamento) {
        if (metodoDePagamento === "dinheiro" || metodoDePagamento === "debito" || metodoDePagamento === "credito") {
            return true;
        }
        return false;
    }

    verificaCarrinhoVazio(itens) {
        if (itens.length === 0) {
            return true;
        }
        return false;
    }

 
}

export { CaixaDaLanchonete };
