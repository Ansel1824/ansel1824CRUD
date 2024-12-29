// script.js
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Sección: Crear Producto
    const createSection = document.createElement('section');
    createSection.innerHTML = `
        <h2>Crear Producto</h2>
        <form id="createForm">
            <label for="productName">Nombre:</label>
            <input type="text" id="productName" required>
            <button type="submit">Crear</button>
        </form>
    `;
    app.appendChild(createSection);

    // Sección: Lista de Productos
    const listSection = document.createElement('section');
    listSection.innerHTML = `<h2>Lista de Productos</h2><ul id="productList"></ul>`;
    app.appendChild(listSection);

    // Manejo de Productos
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const renderProducts = () => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product}
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            `;
            productList.appendChild(li);
        });
    };

    // Crear Producto
    document.getElementById('createForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        products.push(productName);
        saveToLocalStorage();
        renderProducts();
        e.target.reset();
    });

    // Editar Producto
    window.editProduct = (index) => {
        const newName = prompt('Nuevo nombre:', products[index]);
        if (newName) {
            products[index] = newName;
            saveToLocalStorage();
            renderProducts();
        }
    };

    // Eliminar Producto
    window.deleteProduct = (index) => {
        if (confirm('¿Seguro que quieres eliminar este producto?')) {
            products.splice(index, 1);
            saveToLocalStorage();
            renderProducts();
        }
    };

    // Inicializar
    renderProducts();
});
