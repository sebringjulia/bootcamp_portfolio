#PyPoll 

#Dependencies
import os
import csv

#Store file path
csv_path = os.path.join("election_data.csv")

#Read csv
#with open(csv_path, newline = "") as csv_file:
#    csv_reader = csv.reader(csv_file, delimiter = ",")

#    csv_header = next(csv_reader)
#    print(csv_header)
    
#    for row in csv_reader:
#        print(row)
    
#    print(csv_reader)

#Create separate lists and vote count
Voter_ID = []
County = []
Candidate = []
Li_count = 0
Correy_count = 0
Khan_count = 0
OTooley_count = 0
total = 0
winner = []

# Fill lists
with open(csv_path, newline ="") as csv_file:
    csv_reader2 = csv.reader(csv_file, delimiter =",")
    
    csv_header2 = next(csv_reader2)
    
    # Count candidates' votes
    for row in csv_reader2:
        #print(row)
        #Add to month_count
        Voter_ID.append(row[0])
        County.append(row[1])
        Candidate.append(row[2])

        if row[2] == "Li":
            Li_count += 1
        
        elif row[2] == "Correy":
            Correy_count += 1
        
        elif row[2] == "Khan":
            Khan_count += 1
        
        else:
            OTooley_count += 1

# Calculate sum of all votes
total = Li_count + Correy_count + Khan_count + OTooley_count

# Calculate vote percentages for each candidate
Li_pct = (Li_count/total)*100
Correy_pct = (Correy_count/total)*100
Khan_pct = (Khan_count/total)*100
OTooley_pct = (OTooley_count/total)*100
  
#Find the winner
if Li_count > Correy_count and Li_count > Khan_count and Li_count > OTooley_count:
    winner = "Li"

elif Correy_count > Li_count and Correy_count > Khan_count and Correy_count > OTooley_count:
    winner = "Correy"

elif Khan_count > Correy_count and Khan_count > Li_count and Khan_count > OTooley_count:
    winner = "Khan"

else:
    winner = "O'Tooley"

# Store the results to export to text file
str1 = "Election Results"
str_blank = "----------------------------------------------------"
str2 = f"Total Votes: {total}"
str3 = f"Votes for Li: {Li_count}  -  {Li_pct}%"
str4 = f"Votes for Correy: {Correy_count}  -  {Correy_pct}%"
str5 = f"Votes for Khan: {Khan_count}  -  {Khan_pct}%"
str6 = f"Votes for O'Tooley: {OTooley_count}  -  {OTooley_pct}%"
str7 = f"Winner: {winner}"

# Write to text file results.txt
with open("results.txt", "w") as results_txt:
    print(f"Election Results", file=results_txt)
    print(f"{str_blank}", file=results_txt)
    print(f"Total Votes: {total}", file=results_txt)
    print(f"Votes for Li: {Li_count}  -  {Li_pct}%", file=results_txt)
    print(f"Votes for Correy: {Correy_count}  -  {Correy_pct}%", file=results_txt)
    print(f"Votes for Khan: {Khan_count}  -  {Khan_pct}%", file=results_txt)
    print(f"Votes for O'Tooley: {OTooley_count}  -  {OTooley_pct}%", file=results_txt)
    print(f"{str_blank}", file=results_txt)
    print(f"Winner: {winner}", file=results_txt)
    print(f"{str_blank}", file=results_txt)

# Create list to print results to terminal
results = [str1, str_blank, str2, str4, str5, str6, str_blank, str7, str_blank]

# Create and run function to print results to terminal
def print_out(results):
  for x in results:
    print(f"{x}")

print_out(results)