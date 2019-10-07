# Dependencies
import os
import csv

# Store file path
csv_path = os.path.join("budget_data.csv")

# Create separate lists
Date = []
Profit_Losses = []
Increase_Decrease = []

# Open and read csv
with open(csv_path, newline ="") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter =",")
    
    csv_header = next(csv_reader)
    
    # for Loop to assign values to Date and Profit_Losses lists
    for row in csv_reader:
                
        Date.append(row[0])
        Profit_Losses.append(row[1])

# Assign value to Increase_Decrease list
Increase_Decrease = Profit_Losses

# Declare index counters
count1 = 0
count2 = 1

# Declare greatest profit and loss variables
high = 0
low = 0

# Declare variables to track index counters for greatest profit and loss dates
high_index = 0
low_index = 0

# While the loop interates to the last pair of profit/loss values...
while count2 <= len(Increase_Decrease)-1:
    
    # if the difference of the two sequential profit/loss values is greater than the high variable...
    if float(Increase_Decrease[count2])-float(Increase_Decrease[count1]) > high:
        
        # then reassign the high variable to that greater difference to find the greatest profit in the data...
        high = float(Increase_Decrease[count2])-float(Increase_Decrease[count1])
        
        # and reassign the high_index variable to track the index count so can find the date of greatest profit...
        high_index = count2
        
    # if the difference of the two sequential profit/loss values is lower than the low variable...
    if float(Increase_Decrease[count2])-float(Increase_Decrease[count1]) < low:
        
        # then reassign the low variable to that lower difference to find the greatest loss in the data...
        low = float(Increase_Decrease[count2])-float(Increase_Decrease[count1])
        
        # and reassign the low_index variable to track the index count to find the date of the greatest loss
        low_index = count2
    
    # reassign counters to increment by 1 for next comparisons
    count1 = count2
    count2 += 1

# Declare variable to find overall net profit/loss
sum = 0

# for Loop to calculate sum variable
for i in Profit_Losses:
    sum += float(i)

# Declare and assign variable for average/mean
mean = sum/len(Profit_Losses)

# Assign keys
high_key = Date[high_index]

low_key = Date[low_index]

# Create string variable that contains the analysis information
analysis = f"""
    Total number of months: {len(Date)}; 
    Net total amount of profits/losses over entire period: {sum}; 
    Average of the changes in profits/losses over entire period: {mean}; 
    Greatest increase in profits: (Date) {high_key} (Profit) {high}; 
    Greatest decrease in losses: (Date) {low_key} (Loss) {low}"""
print(analysis)

# Output path
output_file = os.path.join("output.txt")

# Write analysis text file
with open(output_file, "w") as text:
    lines = text.write(analysis)