class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.validaMetodoPagamento(metodoDePagamento)) {
            return "Forma de pagamento inválida!"
        }
        if (this.verificaCarrinhoVazio(itens)) {
            return "Não há itens no carrinho de compra!"
        }
        const itensCompra = this.tratarCarrinho(itens);
        if (itensCompra === undefined) {
            return "Quantidade inválida!"
        }
        if (!this.validaItem(itensCompra)) {
            return "Item inválido!"
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

    tratarCarrinho(itens) {
        const itensObject = [];
        itens.array.forEach(element => {
            const arrayElement = element.split(",");
            if (Number(arrayElement[1]) < 1) {
                return undefined;
            }
            itensObject.push({nome: arrayElement[0], quantidade: Number(arrayElement[1])});
        });
        return itensObject;
    }

    itensValidos() {
        return [
            "cafe",
            "chantily", 
            "suco",
            "sanduiche",
            "queijo",
            "salgado",
            "combo1",
            "combo2" 
        ]
    }

    validaItem(itensObject) {
        itensObject.forEach(element => {
            if (!this.itensValidos().find(element.nome)) return false;
        })
        return true;
    }
}

export { CaixaDaLanchonete };
