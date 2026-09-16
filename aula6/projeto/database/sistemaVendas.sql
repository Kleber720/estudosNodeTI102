CREATE DATABASE sistemaVenda;

USE sistemaVenda;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(110) NOT NULL UNIQUE,
    senha VARCHAR(250) NOT NULL
);

CREATE TABLE categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Produtos (
    id_produto BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(150),
    valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
	data_vencimento TIMESTAMP DEFAULT CURRENT_DATE,
    id_categoria BIGINT,

    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id)
        ON DELETE CASCADE
);

CREATE TABLE Estoque (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_produto BIGINT UNIQUE,
    quantidade BIGINT NOT NULL DEFAULT 0 CHECK (quantidade >= 0),

    FOREIGN KEY (id_produto)
        REFERENCES Produtos(id_produto)
        ON DELETE CASCADE
);

alter table Produtos add  column data_vencimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP;