class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.validaMetodoPagamento(metodoDePagamento)) {
            return "Forma de pagamento inválida!"
        }
        if (this.verificaCarrinhoVazio(itens)) {
            return "Não há itens no carrinho de compra!"
        }
        const itensCompra = this.tratarCarrinho(itens);
        if (itensCompra == "Quantidade inválida!") {
            return "Quantidade inválida!"
        }
        if (!this.validaItem(itensCompra) || itensCompra == "Item inválido!") {
            return "Item inválido!"
        }
        if (!this.verificaSeExistePratoPrincipal(itensCompra)) {
            return "Item extra não pode ser pedido sem o principal"
        }
        const valorParcial = this.calculaValor(itensCompra);
        if (valorParcial === undefined) {
            return "Quantidade inválida!"
        }
        const valorTotal = this.calculaDesconto(metodoDePagamento, Number(valorParcial));
        if (valorTotal === 0) return "Quantidade inválida!"
        return `R$ ${this.trataValorFinal(valorTotal.toFixed(2))}`;
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
        let existePrincipal = false;
        let existeExtra = false;
        let pedidoExtra = "";
        let pedidoPrincipal = "";

        itensObject.map(item => {
            if ((item.nome === "chantily" || item.nome === "queijo")) {
                existeExtra = true
                pedidoExtra = item.nome;
            };
        })
        itensObject.map(item => {
            if ((item.nome === "cafe" 
            || item.nome === "sanduiche" 
            || item.nome === "suco" 
            || item.nome === "salgado")) {
                existePrincipal = true;
                pedidoPrincipal = item.nome;
            };
        })


        if (existeExtra && !existePrincipal) return false;
        if (existeExtra && existePrincipal) {
            if (pedidoPrincipal === "cafe" && pedidoExtra !== "chantily") return false;
            if (pedidoPrincipal === "sanduiche" && pedidoExtra !== "queijo") return false;
        }
        return true;
    }

    tratarCarrinho(itens) {
        const itensObject = [];
        itens.forEach(element => {
            const arrayElement = element.split(",");
            const itemObject = {nome: arrayElement[0], quantidade: Number(arrayElement[1])}          
            if ((itemObject.quantidade === 0) && itemObject.nome !== undefined) {
                return "Quantidade inválida!"
            }
            if (itemObject.quantidade === undefined || itemObject.nome === undefined) {
                return "Item inválido!";
            }
            itensObject.push(itemObject);
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
        let containValue = true;
        itensObject?.map(item => {
            if (!this.itensValidos().includes(item.nome)) containValue = false;
        })
        return containValue;
    }

    calculaValor(itensObject) {
        let valorFinal = 0;
        for (const element of itensObject) {
            const item = element;
            if (item.quantidade === 0 ||  isNaN(item.quantidade)) {
                return undefined;
            }
            if (item.nome === "cafe") {
                valorFinal += (3 * item.quantidade);
            } else if (item.nome === "chantily") {
                valorFinal += (1.5 * item.quantidade);
            } else if (item.nome === "queijo") {
                valorFinal += (2 * item.quantidade);
            } else if (item.nome === "combo1") {
                valorFinal += (9.5 * item.quantidade);
            } else if (item.nome === "combo2") {
                valorFinal += (7.5 * item.quantidade);
            } else if (item.nome === "suco") {
                valorFinal += (6.2 * item.quantidade);
            } else if (item.nome === "sanduiche") {
                valorFinal += (6.5 * item.quantidade);
            } else if (item.nome === "salgado") {
                valorFinal += (7.25 * item.quantidade);
            }
        }
        return valorFinal.toFixed(2);
    }

    calculaDesconto(metodoDePagamento, valor) {
        if (metodoDePagamento === "dinheiro") {
            return 0.95 * Number(valor);
        }
        if (metodoDePagamento === "credito") {
            return 1.03 * Number(valor);
        }
        return Number(valor);
    }

    trataValorFinal(valor) {
        return valor.toString().replace(".", ",");
    }

}

export { CaixaDaLanchonete };
