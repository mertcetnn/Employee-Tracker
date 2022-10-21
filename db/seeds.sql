USE employees_db;

 -- INSERT INTO table(column1, column2,...)
-- VALUES (value1, value2,...);
INSERT INTO  department(name)
VALUES
('HUMAN RESOURCES'),
("SALE")
("FOOD AND BEVARAGE")
("ROOMS")
("RECEPTION")




INSERT INTO role(title, payment ,department_id)
VALUES

("SALES MANAGER", 8000, 1)
("FOOD AND BEVARAGE MANAGER",6000, 2)
("HUMAN RESOURCE MANAGER",4000,3)
("ROOMS MANAGER",3000 ,4)
("RECEPTION MANAGER",2000,5)





INSERT INTO employee(first_name,last_name,role_id,manager_id)
("Beck","Deck" ,1, 123)
("Yank","Yung",2,234)
("Jack","Hurg",3,345)
("Mert","Cetin"4,567)
("Lucky","Luke",5,789)