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
        if (!this.verificaSeExistePratoPrincipal(itensCompra)) {
            return "Item extra não pode ser pedido sem o principal"
        }
        const valorTotal = this.calculaDesconto(metodoDePagamento, this.calculaValor(itensCompra));
        return `R$ ${this.trataValorFinal(valorTotal)}`;
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

    verificaSeExistePratoPrincipal(itensObject) {
        const filteredArray = itensObject.filter(item => {
            (item.nome === "cafe" || item.nome === "sanduiche" || item.nome === "suco" || item.nome === "salgado")
        })
        if (filteredArray.length < 1) {
            return false;
        }
        return true;
    }

    tratarCarrinho(itens) {
        const itensObject = [];
        itens.forEach(element => {
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
        itensObject?.forEach(element => {
            if (!this.itensValidos().includes(element.nome)) return false;
        })
        return true;
    }

    calculaValor(itensObject) {
        let valorFinal = 0;
        itensObject.map(item => {
            if (item.nome === "cafe") {
                valorFinal =+ 3 * item.quantidade;
            }
            if (item.nome === "suco") {
                valorFinal =+ 6.2 * item.quantidade;
            }
            if (item.nome === "sanduiche") {
                valorFinal =+ 6.5 * item.quantidade;
            }
            if (item.nome === "salgado") {
                valorFinal =+ 6.5 * item.quantidade;
            }
        })
        return valorFinal;
    }

    calculaDesconto(metodoDePagamento, valor) {
        if (metodoDePagamento === "dinheiro") {
            return 0.95 * valor;
        }
        if (metodoDePagamento === "credito") {
            return 1.03 * valor;
        }
        return valor;
    }

    trataValorFinal(valor) {
        return valor.toString().replace(".", ",");
    }

}

export { CaixaDaLanchonete };
