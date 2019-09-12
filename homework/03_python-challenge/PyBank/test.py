#PyBank 

#Dependencies
import os
import csv

#Store file path
csv_path = os.path.join("budget_data.csv")

#Read csv
with open(csv_path, newline = "") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter = ",")

    print(csv_reader)

    csv_header = next(csv_reader)

    for row in csv_reader:
        print(row)