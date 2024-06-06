const API_URL = 'http://localhost:3000'; // Alterar conforme a URL da sua API

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    fetchBooks();
    fetchLoans();
});

const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const users = await response.json();
        const userSelect = document.getElementById('user-select');
        const userList = document.getElementById('user-list');
        userSelect.innerHTML = '<option value="">Selecione um usuário</option>';
        userList.innerHTML = '';
        users.forEach(user => {
            userSelect.innerHTML += `<option value="${user.id}">${user.nome}</option>`;
            userList.innerHTML += `<li>Nome: ${user.nome}, CPF: ${user.cpf}</li>`;
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
};

const addUser = async () => {
    const nome = document.getElementById('user-name').value;
    const cpf = document.getElementById('user-cpf').value;
    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, cpf })
        });
        if (response.ok) {
            fetchUsers();
        }
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
    }
};

const addMultipleUsers = async () => {
    const users = [
        { nome: 'User 1', cpf: '000000001' },
        { nome: 'User 2', cpf: '000000002' },
        { nome: 'User 3', cpf: '000000003' },
        { nome: 'User 4', cpf: '000000004' },
        { nome: 'User 5', cpf: '000000005' }
    ];
    try {
        for (const user of users) {
            await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        }
        fetchUsers();
    } catch (error) {
        console.error('Erro ao adicionar múltiplos usuários:', error);
    }
};

const fetchBooks = async () => {
    try {
        const response = await fetch(`${API_URL}/livros`);
        const books = await response.json();
        const bookSelect = document.getElementById('book-select');
        const bookList = document.getElementById('book-list');
        bookSelect.innerHTML = '<option value="">Selecione um livro</option>';
        bookList.innerHTML = '';
        books.forEach(book => {
            bookSelect.innerHTML += `<option value="${book.id}">${book.titulo}</option>`;
            bookList.innerHTML += `<li>Título: ${book.titulo}, Ano de Publicação: ${book.anoPublicacao}</li>`;
        });
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
};

const addBook = async () => {
    const titulo = document.getElementById('book-title').value;
    const anoPublicacao = document.getElementById('book-year').value;
    try {
        const response = await fetch(`${API_URL}/livros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, anoPublicacao })
        });
        if (response.ok) {
            fetchBooks();
        }
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
    }
};

const addMultipleBooks = async () => {
    const books = [
        { titulo: 'Book 1', anoPublicacao: 2001 },
        { titulo: 'Book 2', anoPublicacao: 2002 },
        { titulo: 'Book 3', anoPublicacao: 2003 },
        { titulo: 'Book 4', anoPublicacao: 2004 },
        { titulo: 'Book 5', anoPublicacao: 2005 }
    ];
    try {
        for (const book of books) {
            await fetch(`${API_URL}/livros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
        }
        fetchBooks();
    } catch (error) {
        console.error('Erro ao adicionar múltiplos livros:', error);
    }
};

const fetchLoans = async () => {
    try {
        const response = await fetch(`${API_URL}/emprestimos`);
        const loans = await response.json();
        const loanList = document.getElementById('loan-list');
        loanList.innerHTML = '';
        loans.forEach(loan => {
            loanList.innerHTML += `<li>Usuário: ${loan.idUsuario}, Livro: ${loan.idLivro}, Data de Entrega: ${loan.dataDeEntrega}, Entregue: ${loan.entregaRealizada ? 'Sim' : 'Não'} <button onclick="returnLoan(${loan.id})">Marcar como Entregue</button></li>`;
        });
    } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
    }
};

const addLoan = async () => {
    const idUsuario = document.getElementById('user-select').value;
    const idLivro = document.getElementById('book-select').value;
    const dataDeEntrega = document.getElementById('loan-date').value;
    try {
        const response = await fetch(`${API_URL}/emprestimos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, idLivro, dataDeEntrega, entregaRealizada: false })
        });
        if (response.ok) {
            fetchLoans();
        }
    } catch (error) {
        console.error('Erro ao adicionar empréstimo:', error);
    }
};

const returnLoan = async (loanId) => {
    try {
        const response = await fetch(`${API_URL}/emprestimos/${loanId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entregaRealizada: true })
        });
        if (response.ok) {
            fetchLoans();
        }
    } catch (error) {
        console.error('Erro ao marcar empréstimo como entregue:', error);
    }
};
