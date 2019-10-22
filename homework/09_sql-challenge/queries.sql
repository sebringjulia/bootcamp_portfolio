--1) List the following details of each employee: employee number, last name, first name, gender, and salary

select 
	e.emp_no, 
	e.last_name, 
	e.first_name, 
	e.gender,
	salary
	
from employees e
join salaries s on (e.emp_no=s.emp_no);

--2) List employees who were hired in 1986.

select 
	emp_no, 
	last_name, 
	first_name, 
	hire_date 
	
from employees 
where hire_date like '1986-%';


-- 3) List the manager of each department with the following information: 
--    department number, department name, the manager's employee number, 
--    last name, first name, and start and end employment dates.

select 
	dm.dept_no,
	d.dept_name,
	e.emp_no as "Manager Emp_No", 
	e.last_name, 
	e.first_name,
	e.hire_date,
	de.to_date
	
from employees e
join dept_manager dm on (e.emp_no=dm.emp_no)
join dept_emp de on (dm.emp_no=de.emp_no)
left join departments d on (dm.dept_no=d.dept_no);

-- 4) List the department of each employee with the following information: employee number, last name, first name, and department name.

select
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name

from employees e
left join dept_emp de on e.emp_no=de.emp_no
left join departments d on de.dept_no=d.dept_no;

-- 5) List all employees whose first name is "Hercules" and last names begin with "B."

select 
	first_name, 
	last_name
from employees
where 
	first_name = 'Hercules' and 
	last_name like 'B%';

-- 6) List all employees in the Sales department, including their employee number, last name, first name, and department name.

select
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name

from employees e
left join dept_emp de on e.emp_no=de.emp_no
left join departments d on de.dept_no=d.dept_no
where de.dept_no in
	(
	select dept_no 
	from departments
	where dept_name = 'Sales'
	);

-- 7) List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
--Need to select department NAME

select
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name

from employees e
left join dept_emp de on e.emp_no=de.emp_no
left join departments d on de.dept_no=d.dept_no
where de.dept_no in
	(
	select dept_no 
	from departments
	where dept_name = 'Sales' OR dept_name = 'Development'
	);

-- 8) In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

select 
	last_name, 
	count(last_name)
from employees
group by last_name
order by count(last_name) desc;