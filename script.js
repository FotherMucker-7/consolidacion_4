class Producto {
    constructor(nombre, precio, medida) {
        this.nombre = nombre;
        this.precio = precio;
        this.medida = medida;
    }

    mostrarPrecio() {
        return this.precio.toLocaleString('es-CL');
    }
}

const productosDisponibles = [
    new Producto("Leche", 1000, "1 litro"),
    new Producto("Pan", 2000, "1 kilo"),
    new Producto("Queso", 1200, "1 kilo"),
    new Producto("Jamón", 1200, "1 kilo"),
    new Producto("Endulzante", 2000, "1 unidad")
];

function mostrarListaProductos() {
    const listaProductosDiv = document.getElementById("lista-productos");
    listaProductosDiv.innerHTML = "";
    productosDisponibles.forEach((producto, index) => {
        const icono = obtenerIconoProducto(producto.nombre);
        listaProductosDiv.innerHTML += `
            <div class="producto">
                <span><i class="${icono}"></i> ${index + 1}.- ${producto.nombre}</span>
                <p>Precio: ${producto.medida} $${producto.mostrarPrecio()}</p>
            </div>
        `;
    });
}

function obtenerIconoProducto(nombreProducto) {
    switch (nombreProducto.toLowerCase()) {
        case 'leche': return 'fas fa-mug-hot';
        case 'pan': return 'fas fa-bread-slice';
        case 'queso': return 'fas fa-cheese';
        case 'jamón': return 'fas fa-drumstick-bite';
        case 'endulzante': return 'fas fa-cube';
        default: return 'fas fa-box';
    }
}

document.addEventListener("DOMContentLoaded", mostrarListaProductos);

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        let productoConCantidad = {
            nombre: producto.nombre,
            precioUnitario: producto.precio,
            medida: producto.medida,
            cantidad: cantidad,
            precioTotal: producto.precio * cantidad
        };
        this.productos.push(productoConCantidad);
        alert(`${cantidad} ${producto.medida} de ${producto.nombre} agregado(s) al carrito. Precio total: $${productoConCantidad.precioTotal.toLocaleString('es-CL')}`);
    }

    calcularTotal() {
        let total = this.productos.reduce((sum, producto) => sum + producto.precioTotal, 0);
        return total;
    }

    finalizarCompra() {
        let total = this.calcularTotal();
        alert(`Compra finalizada.\nTotal a pagar: $${total.toLocaleString('es-CL')}`);
    }    

    mostrarDetalles() {
        let detalles = this.productos.map(producto => 
            `${producto.cantidad} ${producto.medida} de ${producto.nombre} - $${producto.precioTotal.toLocaleString('es-CL')}`
        ).join('\n');
        alert(`Detalles de la compra:\n${detalles}\nTotal: $${this.calcularTotal().toLocaleString('es-CL')}`);
    }
}

function validarEntrada(productosDisponibles, numeroProducto) {
    while (numeroProducto < 1 || numeroProducto > productosDisponibles.length) {
        numeroProducto = parseInt(prompt("Número no válido. Ingrese un número de producto válido:"));
    }
    return productosDisponibles[numeroProducto - 1];
}

function continuarCompra() {
    let respuesta = prompt("¿Desea agregar otro producto al carrito? (Escriba s (Sí) o n (No))").trim().toLowerCase();
    while (respuesta !== "s" && respuesta !== "n") {
        respuesta = prompt("Respuesta no válida. Escriba 's' para continuar o 'n' para finalizar:").trim().toLowerCase();
    }
    return respuesta === "s";
}

function iniciarCompra() {
    const carrito = new Carrito();
    let continuar = true;

    while (continuar) {
        let numeroProducto = parseInt(prompt("Ingrese el número del producto que desea agregar al carrito:"));
        let producto = validarEntrada(productosDisponibles, numeroProducto);

        let cantidad = parseFloat(prompt(`Ingrese la cantidad de ${producto.nombre} que desea comprar (${producto.medida}):`));
        while (isNaN(cantidad) || cantidad <= 0) {
            cantidad = parseFloat(prompt("Cantidad no válida. Ingrese una cantidad positiva:"));
        }

        carrito.agregarProducto(producto, cantidad);

        continuar = continuarCompra();
    }

    carrito.mostrarDetalles();
    carrito.finalizarCompra();
}
