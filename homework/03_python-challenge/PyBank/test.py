#PyBank 

#Dependencies
import os
import csv

#Store file path
csv_path = os.path.join("budget_data.csv")

#Read csv
with open(csv_path, newline = "") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter = ",")

    csv_header = next(csv_reader)
    print(csv_header)
    
    for row in csv_reader:
        print(row)
    
    print(csv_reader)

#Create separate lists
Date = []
Profit_Losses = []

#Fill lists
with open(csv_path, newline ="") as csv_file:
    csv_reader2 = csv.reader(csv_file, delimiter =",")
    
    csv_header2 = next(csv_reader2)
    
    
    for row in csv_reader2:
        #print(row)
        #Add to month_count
        Date.append(row[0])
        Profit_Losses.append(row[1])
    
    print(Date)
    print(Profit_Losses)

#zip
Date_Profit_zip = zip(Date, Profit_Losses)

#output zip
zip_output_path = os.path.join("zip_output.csv")

#open exported zip
with open(zip_output_path, "w", newline="") as datafile:
    writer = csv.writer(datafile)
    
    writer.writerow(["Date", "Profit/Losses"])
    
    writer.writerows(Date_Profit_zip)

for record in Date_Profit_zip:
    print(record)