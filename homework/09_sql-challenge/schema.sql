--Create tables and import related csv files

create table employees(
emp_no int primary key not null,
birth_date varchar(15),
first_name varchar(30) not null,
last_name varchar(30) not null,
gender varchar(3),
hire_date varchar(15) not null
);

create table salaries(
emp_no int,
salary int,
from_date varchar(15),
to_date varchar(15),
foreign key(emp_no) references employees(emp_no)
);

create table departments(
dept_no varchar(10) primary key not null,
dept_name varchar(30) not null
);

create table dept_manager(
dept_no varchar(10) not null,
emp_no int not null,
from_date varchar(15),
to_date varchar(15),
foreign key(emp_no) references employees(emp_no),
foreign key(dept_no) references departments(dept_no)
);

create table dept_emp(
emp_no int not null,
dept_no varchar(10) not null,
from_date varchar(15),
to_date varchar(15),
foreign key(emp_no) references employees(emp_no),
foreign key(dept_no) references departments(dept_no)
);