SELECT 
	d.department_id,
    d.department_name,
    overhead_cost,
    SUM(product_sales) AS dept_sales,
    (SUM(product_sales) - overhead_Cost) AS total_profit
FROM bamazonDB.departments d
	JOIN bamazonDB.products p ON d.department_name = p.department_name
GROUP BY d.department_id, d.department_name, overhead_cost

UPDATE products SET product_sales = product_sales + price, stock_quantity = stock_quantity - quantity
    
    