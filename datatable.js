class DataTable {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('data')) || [];
        this.tableBody = document.getElementById("tablebody");
        this.table = document.getElementById('data-table');
        this.headers = this.table.querySelectorAll('th');
        this.filters = {};

        this.init();
    }

    init() {
        this.updateTable();

        this.table.addEventListener('click', (event) => {
            if (event.target.classList.contains('editButton')) {
                this.openEditModal(event);
            }
        });

        this.table.addEventListener('input', (event) => {
            if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
                this.filters[event.target.dataset.column] = event.target.value.toLowerCase();
                this.filterTable();
            }
        });

        document.getElementById('addButton').addEventListener('click', () => {
            document.getElementById('addRowForm').style.display = 'block';
        });

        document.getElementById('cancelButton').addEventListener('click', () => {
            document.getElementById('addRowForm').style.display = 'none';
        });

        document.getElementById('addRowFormData').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addRow();
        });

        document.getElementById('editForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.editRow();
        });

        document.getElementById('logoutButton').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "login.html";
        });
    }

    updateTable() {
        this.tableBody.innerHTML = '';
        this.data.forEach((item, index) => {
            let newRow = this.tableBody.insertRow(-1);
            newRow.innerHTML = `
                <td>${item["ID"]}</td>
                <td>${item["Product Name"]}</td>
                <td>${item["Product title"]}</td>
                <td>${item["Product description"]}</td>
                <td>${item["Product vendor"]}</td>
                <td>${item["In stock"]}</td>
                <td>${item["Buying price"]}</td>
                <td>${item["Sale price"]}</td>
                <td><button class="deleteButton">Delete</button><button class="editButton">Edit</button></td>
            `;
    
            newRow.querySelector('.deleteButton').addEventListener('click', () => {
                this.data.splice(index, 1);
                localStorage.setItem('data', JSON.stringify(this.data));
                this.updateTable();
            });
        });
    }
    
    addRow() {
        let newData = {
            "ID": document.getElementById('id').value,
            "Product Name": document.getElementById('productName').value,
            "Product title": document.getElementById('productTitle').value,
            "Product description": document.getElementById('productDescription').value,
            "Product vendor": document.getElementById('productVendor').value,
            "In stock": document.getElementById('inStock').value,
            "Buying price": document.getElementById('buyingPrice').value,
            "Sale price": document.getElementById('salePrice').value,
        };

        this.data.push(newData);
        localStorage.setItem('data', JSON.stringify(this.data));
        this.updateTable();
        document.getElementById('addRowFormData').reset();
        document.getElementById('addRowForm').style.display = 'none';
    }

    editRow() {
        let id = document.getElementById('editId').value;
        let index = this.data.findIndex(item => item["ID"] === id);

        this.data[index] = {
            "ID": id,
            "Product Name": document.getElementById('editProductName').value,
            "Product title": document.getElementById('editProductTitle').value,
            "Product description": document.getElementById('editProductDescription').value,
            "Product vendor": document.getElementById('editProductVendor').value,
            "In stock": document.getElementById('editInStock').value,
            "Buying price": document.getElementById('editBuyingPrice').value,
            "Sale price": document.getElementById('editSalePrice').value,
        };

        localStorage.setItem('data', JSON.stringify(this.data));
        this.updateTable();
        document.getElementById('editModalContent').style.display = 'none';
    }

    openEditModal(event) {
        let row = event.target.closest('tr');
        document.getElementById('editId').value = row.cells[0].textContent;
        document.getElementById('editProductName').value = row.cells[1].textContent;
        document.getElementById('editProductTitle').value = row.cells[2].textContent;
        document.getElementById('editProductDescription').value = row.cells[3].textContent;
        document.getElementById('editProductVendor').value = row.cells[4].textContent;
        document.getElementById('editInStock').value = row.cells[5].textContent;
        document.getElementById('editBuyingPrice').value = row.cells[6].textContent;
        document.getElementById('editSalePrice').value = row.cells[7].textContent;
        document.getElementById('editModalContent').style.display = 'block';

        document.querySelector('.modal-close').onclick = () => {
            document.getElementById("editModalContent").style.display = "none";
        };
    }

    filterTable() {
        let rows = this.table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            let display = true;
            for (let i = 0; i < row.cells.length - 1; i++) {
                if (!this.filters.hasOwnProperty(i)) continue;
                let cellValue = row.cells[i].textContent.toLowerCase();
                if (cellValue.indexOf(this.filters[i]) === -1) {
                    display = false;
                    break;
                }
            }
            row.style.display = display ? '' : 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let dataTable = new DataTable();
});
