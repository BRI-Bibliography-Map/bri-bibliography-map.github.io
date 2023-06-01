# import csv module
import csv

# country dictionary format
# { "country": { "Political Science and International Relations": numOccurances } }

subjects = [
 "Political Science and International Relations",
 "Sociology and Political Science",
 "Development",
 "Economics, Econometrics and Finance",
 "Business, Management and Accounting",
 "Environmental Science",
 "Transportation",
 "Social Sciences (Misc.)",
 "Agricultural and Biological Sciences",
 "Arts and Humanities",
 "Computer Science",
 "Decision Sciences",
 "Earth and Planetary Sciences",
 "Education",
 "Energy",
 "Law",
 "Mathematics",
 "Medicine",
 "Multidisciplinary",
 "Safety Research",
 "Urban Studies",
 "Cultural Sciences",
]

nations = {}

# open the csv file in read mode
with open('countryData.csv', 'r') as read_obj:
    # pass the file object to reader() to get the reader object
    csv_reader = csv.reader(read_obj)
    next(csv_reader)
    # Iterate over each row in the csv using reader object
    for row in csv_reader:
        # split row by " / " in the first column
        # and store the result in a list with rest of the columns
        list = row[0].split(" / ")
        # for each element in list, make a row containing the first element and the rest of the columns
        for nation in list:
            # if the country is not in the dictionary, add it
            if nation not in nations:
                nations[nation] = { }
                # add subjects to the dictionary with initial value of 0
                for subject in subjects:
                    nations[nation][subject] = 0
            # for each subject in the row, add 1 to the value
            for subject in subjects:
                if row[subjects.index(subject) + 1] == "1":
                    nations[nation][subject] += 1
        # print out the nations dictionary

# output the dictionary to a csv file
with open('output.csv', 'w', newline='', encoding='utf-8') as f:
    # create the csv writer
    writer = csv.writer(f)
    # write the header row
    writer.writerow(["Country"] + subjects)
    # write the data without newlines
    for nation in nations:
        writer.writerow([nation] + [nations[nation][subject] for subject in subjects])
