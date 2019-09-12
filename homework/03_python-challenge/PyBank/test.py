#PyBank 

#Dependencies
import os

#Store file in memory
file = "budget_data.csv"

#Read csv
with open(file, 'r') as text:
    data = text.read()

print(data)
