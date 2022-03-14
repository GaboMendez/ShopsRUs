/*DROP**/
DROP TABLE IF EXISTS invoice_detail;
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS discount;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
/*CREATE*/
CREATE TABLE IF NOT EXISTS category (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS product (
    "id" SERIAL PRIMARY KEY,
    "category_id" INT,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY(category_id) REFERENCES category(id)
);
CREATE TABLE IF NOT EXISTS type (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS discount (
    "id" SERIAL PRIMARY KEY,
    "type_id" INT NOT NULL,
    "percent" DECIMAL NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(type_id),
    CONSTRAINT fk_discount_type FOREIGN KEY(type_id) REFERENCES type(id)
);
CREATE TABLE IF NOT EXISTS client (
    "id" SERIAL PRIMARY KEY,
    "type_id" INT,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_client_type FOREIGN KEY(type_id) REFERENCES type(id)
);
CREATE TABLE IF NOT EXISTS invoice (
    "id" SERIAL PRIMARY KEY,
    "client_id" INT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_invoice_client FOREIGN KEY(client_id) REFERENCES client(id)
);
CREATE TABLE IF NOT EXISTS invoice_detail (
    "id" SERIAL PRIMARY KEY,
    "invoice_id" INT,
    "discount_id" INT,
    "product_id" INT,
    "quantity" INT,
    "price" DECIMAL NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_detail_invoice FOREIGN KEY(invoice_id) REFERENCES invoice(id),
    CONSTRAINT fk_detail_discount FOREIGN KEY(discount_id) REFERENCES discount(id),
    CONSTRAINT fk_detail_product FOREIGN KEY(product_id) REFERENCES product(id)
);