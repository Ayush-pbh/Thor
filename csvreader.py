import csv
n=0
with open('location-data.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for row in reader:
        #print(n)
        #print(type(row))
        #print(' '.join(row))
        print(row)
        n+=1


