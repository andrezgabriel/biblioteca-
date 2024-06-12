const API_URL = 'http://localhost:3000'; // Alterar conforme a URL da sua API
const users = [];
const books = [];
const loans = [];

function addUser() {
    const userName = document.getElementById('user-name').value;
    if (userName) {
        users.push(userName);
        updateUserList();
        updateUserSelect();
        document.getElementById('user-name').value = '';
    }
}

function addBook() {
    const bookTitle = document.getElementById('book-title').value;
    if (bookTitle) {
        books.push(bookTitle);
        updateBookList();
        updateBookSelect();
        document.getElementById('book-title').value = '';
    }
}

function updateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => `<li>${user}</li>`).join('');
}

function updateBookList() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = books.map(book => `<li>${book}</li>`).join('');
}

function updateUserSelect() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '<option value="">Selecione um Usuário</option>' + users.map((user, index) => `<option value="${index}">${user}</option>`).join('');
}

function updateBookSelect() {
    const bookSelect = document.getElementById('book-select');
    bookSelect.innerHTML = '<option value="">Selecione um Livro</option>' + books.map((book, index) => `<option value="${index}">${book}</option>`).join('');
}

function updateLoanSelect() {
    const loanSelect = document.getElementById('loan-select');
    loanSelect.innerHTML = '<option value="">Selecione um Empréstimo</option>' + loans.map((loan, index) => `<option value="${index}">${loan.user} - ${loan.book}</option>`).join('');
}

function makeLoan() {
    const userSelect = document.getElementById('user-select');
    const bookSelect = document.getElementById('book-select');
    const returnDate = document.getElementById('return-date').value;

    if (userSelect.value && bookSelect.value && returnDate) {
        const loan = {
            user: users[userSelect.value],
            book: books[bookSelect.value],
            returnDate: returnDate,
        };
        loans.push(loan);
        updateLoanSelect();
        alert('Empréstimo realizado com sucesso!');
    } else {
        alert('Por favor, selecione todos os campos.');
    }
}

function returnBook() {
    const loanSelect = document.getElementById('loan-select');
    if (loanSelect.value) {
        loans.splice(loanSelect.value, 1);
        updateLoanSelect();
        alert('Livro entregue com sucesso!');
    } else {
        alert('Por favor, selecione um empréstimo.');
    }
}
