/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

var response=[];
const baseUrl = 'http://localhost:8080/Assignment_2';
var isEditing = false;
function makeRequest(method, url, data = null) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, baseUrl + url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                response = JSON.parse(xhr.responseText);
                setItems(response);
            } else {
                console.error("Error:", xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send(data ? new URLSearchParams(data).toString()  : null);
}

makeRequest("GET", `/NewServlet?action=get`);

function setItems(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear existing content

    if (products.length === 0) {
        productList.innerHTML = '<tr><td colspan="6">No products found</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td'); // Corrected method name
        idCell.textContent = product.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;
        row.appendChild(categoryCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price}`;
        row.appendChild(priceCell);

        const stockCell = document.createElement('td');
        stockCell.textContent = product.stock;
        row.appendChild(stockCell);

        const actionsCell = document.createElement('td'); // Initialize actionsCell
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteProduct(product.id);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editProduct(product.id);
        actionsCell.appendChild(editButton);

        row.appendChild(actionsCell);
        
        productList.appendChild(row);
    });
}

function deleteProduct(id) {
  
        makeRequest("DELETE", `/NewServlet?action=delete&id=${id}`);
        location.reload(); 
}
function addProduct(e){
    console.log("hii dhjnm");
    e.preventDefault();
    const form=document.getElementById('productForm');
    const formData=new FormData(form);
    const newTask={};
    formData.forEach((value,key)=>{
            if (key !== 'id') {
            newTask[key] = value;
        }
        
    });
    console.log(newTask);
     makeRequest("POST","/NewServlet?action=post", newTask);
    location.reload(); 

}

function searchProducts() {
    console.log("Searching...");
    const searchQuery = document.getElementById('searchQuery').value.toLowerCase().trim();

    
    const filteredProducts = response.filter(product => {
        return product.name.toLowerCase().includes(searchQuery) ||
               product.category.toLowerCase().includes(searchQuery);
    });

 
    setItems(filteredProducts);
}
   function editProduct(id) {
    const product = response.find(p => p.id === id);
    const form = document.getElementById('productForm');
    isEditing = true;
    showEditProductForm();
    if (product && form) {
        form.elements['id'].value = product.id;
        form.elements['name'].value = product.name;
        form.elements['category'].value = product.category;
        form.elements['price'].value = product.price;
        form.elements['stock'].value = product.stock;

        form.onsubmit = function (e) {
            e.preventDefault(); 
             
            const updatedProduct = {
                id: form.elements['id'].value,
                name: form.elements['name'].value,
                category: form.elements['category'].value,
                price: form.elements['price'].value,
                stock: form.elements['stock'].value
            };
        
            makeRequest("PUT", "/NewServlet?action=update", updatedProduct);
            location.reload(); 
              
        };
        
        
    }
}

function showAddProductForm() {
    document.getElementById('addProductHeading').style.display = 'block';
    document.getElementById('addProductButton').style.display = 'block';
    document.getElementById('editProductHeading').style.display = 'none';
    document.getElementById('editProductButton').style.display = 'none';
}

function showEditProductForm() {
    document.getElementById('addProductHeading').style.display = 'none';
    document.getElementById('addProductButton').style.display = 'none';
    document.getElementById('editProductHeading').style.display = 'block';
    document.getElementById('editProductButton').style.display = 'block';
}

// Call showAddProductForm initially
showAddProductForm();