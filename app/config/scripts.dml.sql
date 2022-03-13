-- Category
INSERT INTO category (name)
VALUES ('Comestibles');
INSERT INTO category (name)
VALUES ('Bebidas');
INSERT INTO category (name)
VALUES ('Verduras');
INSERT INTO category (name)
VALUES ('Carnes');
INSERT INTO category (name)
VALUES ('Mariscos');
-- Product
--Comestibles
INSERT INTO product (name, categoryId, price)
VALUES ('Cereal con almendras', 1, 10.22);
INSERT INTO product (name, categoryId, price)
VALUES ('Galletas toppers', 1, 18.32);
INSERT INTO product (name, categoryId, price)
VALUES ('Pasta spaguetti', 1, 7.12);
INSERT INTO product (name, categoryId, price)
VALUES ('Arroz integral', 1, 12);
INSERT INTO product (name, categoryId, price)
VALUES ('Salsa con espinacas', 1, 14.2);
-- Bebidas
INSERT INTO product (name, categoryId, price)
VALUES ('Agua gasificada', 2, 13);
INSERT INTO product (name, categoryId, price)
VALUES ('Refresco coca cola', 2, 10);
INSERT INTO product (name, categoryId, price)
VALUES ('Jugo de naranja natural', 2, 15.2);
INSERT INTO product (name, categoryId, price)
VALUES ('Jugo de cranberry', 2, 20.5);
INSERT INTO product (name, categoryId, price)
VALUES ('Champaña rosada laurent', 2, 155.45);
INSERT INTO product (name, categoryId, price)
VALUES ('Espumante semi seco', 2, 89.62);
INSERT INTO product (name, categoryId, price)
VALUES ('Ginebra hendricks', 2, 53.04);
INSERT INTO product (name, categoryId, price)
VALUES ('Licor de grand marnier', 2, 49.38);
--Verduras
INSERT INTO product (name, categoryId, price)
VALUES ('Hongo champiñon', 3, 10.22);
INSERT INTO product (name, categoryId, price)
VALUES ('Esparragos blancos', 3, 18.32);
INSERT INTO product (name, categoryId, price)
VALUES ('Pimientos tricolor', 3, 7.12);
INSERT INTO product (name, categoryId, price)
VALUES ('Zanahoria pelada', 3, 2.15);
INSERT INTO product (name, categoryId, price)
VALUES ('Repollo fresco', 3, 4.2);
--Carnes
INSERT INTO product (name, categoryId, price)
VALUES ('Churrasco angus', 4, 13);
INSERT INTO product (name, categoryId, price)
VALUES ('Filete brangus', 4, 15);
INSERT INTO product (name, categoryId, price)
VALUES ('Costillas de cerdo', 4, 25.15);
--Mariscos
INSERT INTO product (name, categoryId, price)
VALUES ('Lomo de salmon', 5, 34.8);
INSERT INTO product (name, categoryId, price)
VALUES ('Tentaculos de calamar', 5, 15.7);
INSERT INTO product (name, categoryId, price)
VALUES ('Camaron crudo', 5, 20);
-- Type
INSERT INTO type (name)
VALUES ('Empleado');
INSERT INTO type (name)
VALUES ('Afiliado');
INSERT INTO type (name)
VALUES ('Fidelidad');
-- Discount
INSERT INTO discount (percent, typeId)
VALUES (30, 1);
INSERT INTO discount (percent, typeId)
VALUES (10, 2);
INSERT INTO discount (percent, typeId)
VALUES (5, 3);
-- Client
INSERT INTO client (name, typeId)
VALUES ('Gabriel Mendez', 1);
INSERT INTO client (name, typeId)
VALUES ('Maria del pilar', 2);
INSERT INTO client (name, createdAt, updatedAt)
VALUES (
        'Oliver Reyes',
        '2019-03-12 00:00:00',
        '2019-03-12 00:00:00'
    );