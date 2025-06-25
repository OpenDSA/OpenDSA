#!/usr/bin/env python
# coding: utf-8
import csv
import os
import pandas as pd
import numpy as np
from girth import twopl_mml
import mysql.connector
import warnings
from argparse import ArgumentParser
warnings.filterwarnings("ignore")

def callToDB(BookID):
    mydb = mysql.connector.connect(
    host="db",
    user=os.environ['MYSQL_USER'],
    passwd=os.environ['MYSQL_PASSWORD']
    )
    cursor = mydb.cursor();
    ##SQL query to extract the data from the database
    query = f"SELECT * FROM opendsa.odsa_exercise_attempts where inst_book_id = {BookID} order by user_id, time_done;"
    # print(query)
    with open('/tmp/irt_curve.csv', 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        header = ['id','user_id','inst_book_id','inst_section_id','inst_book_section_exercise_id','worth_credit','time_done','time_taken','count_hints','hint_used','points_earned','earned_proficiency','count_attempts','ip_address','question_name','request_type','created_at','updated_at','correct','pe_score','pe_steps_fixed','inst_course_offering_exercise_id','inst_module_section_exercise_id','answer','question_id','finished_frame']
        csvwriter.writerow(header)
        cursor.execute(query)
        for obj in cursor:
            csvwriter.writerow(obj)
        cursor.close()
        mydb.close()
    return csvfile

def readfile(filename):
    data = pd.read_csv(filename.name)

    ##creating a datafrme of columns
    df = pd.DataFrame(data,columns=['user_id', 'inst_book_section_exercise_id','count_attempts',
                                'question_name','request_type', 'correct'])
    return df


def groupByRequestType(filename):

        df = filename

        ##grouping the data by request_type
        df1 = df.groupby(['user_id', 'inst_book_section_exercise_id','request_type'])['request_type'].count().reset_index(name='total_attempts')

        ##assigning only those values if "request_type " == "attempt"
        condition = df1['request_type']=="attempt"

        ##creates a new data frame with the above condition
        new_df1 = df1[condition]
        new_df1.sort_values(by=['user_id', 'inst_book_section_exercise_id'],
               axis=0, ascending=True, inplace=False, kind='quicksort').reset_index(drop=True)

        ##Creates another data frame to count the correct answers (column="correct_answer") from "correct" columns
        df2 = df.groupby(['user_id', 'inst_book_section_exercise_id'])['correct'].sum().reset_index(name='correct_answer')

        #sort_data = df1.sort_values(by=['user_id', 'inst_book_section_exercise_id'],
              # axis=0, ascending=True, inplace=False, kind='quicksort')

        ##merges two data frame to create a master data frame
        data = pd.merge(new_df1, df2)

        ##Sorting the data frame
        #df.sort_values(by=['user_id', 'inst_book_se

        return data


def computeDifficultyLevel(val):

    ##computes the difficulty level 'r' (correct_answer/total_attempts) for each students and each exercise

    data = val
    r = []
    ##coverts into an array from a DataFrame
    temp =np.array(data.correct_answer)

    ##coverts into an array from a DataFrame
    temp2 = np.array(data.total_attempts)

    length = len(val)

    for i in range(length):

        if temp[i]/temp2[i] >= 0.75:

            ##assigns int 1 to r if it is >= 0.75
            r.append(1)

        else:

            ##assigns int 0 to r if it is < 0.75
            r.append(0)

    data1 = pd.DataFrame(r)
    data1 =data1.rename(columns={0:'coefficient_r'})
    result = pd.concat([val, data1], axis=1, join='inner')

    matrix = pd.DataFrame(result)
    return matrix

def pivot_table(val):

    ptable=val.pivot_table(index ='user_id',columns='inst_book_section_exercise_id', values='coefficient_r')
    return ptable


def filter_row(val1, val2):

    temp=np.array(val1)

    # l=len(val2.inst_book_section_exercise_id)

    ##stores the count of 'NAN' values for each student
    value = []

    ##stores the filtered data
    value2 = []

    for i in range(len(temp)):

        ##counts 'nan' values
        value.append(np.count_nonzero(np.isnan(temp[i])))

        ##Computes and stores the percent values "nan/total# of exercies"
        value2.append(value[i]/len(val2.inst_book_section_exercise_id))


    df = pd.DataFrame({'total_nan': value, 'percent_nan':value2})
    df['user_id']=(val1.index)
    df['percent_nan']= df['percent_nan'].round(decimals=4)

    #print (max(df.total_nan))

    result = pd.merge(val2, df)

    ## Filter all rows ("user_id") for which the percentage with respect to exercise "nan"
    ##is more than 0.001
    m = result.drop(result[result['percent_nan'] > 0.001].index, inplace = True)

    m=result.pivot_table(index ='user_id',columns='inst_book_section_exercise_id', values='coefficient_r')

    ##saves in a csv file
    #m.to_csv('filtered_data.csv')
    return m.T

def compute_irt_parameters(val):

    data =val.fillna(0)
    data =np.array(data)
    data = data.astype(int)


    ##solve for parameters
    estimates = twopl_mml(data)

    ##unpack estimates
    ##determines the rate at which the probability of endorsing a
    ##correct item (y-axis)changes given ability levels.
    discrimination_estimates = estimates['Discrimination']

    ##determines the manner of which the item behaves along the ability (x-axis)scale
    difficulty_estimates = estimates['Difficulty']

    ##stores in a dataframe but not used here
    df = pd.DataFrame({'Discrimination': discrimination_estimates, 'Difficulty':difficulty_estimates})

    ##converts to a list array
    list=df.values.tolist()

    print(list)
    return list


def runner(BookID):

    book_file = callToDB(BookID)

    file = readfile(book_file)
    group_by = groupByRequestType(file)

    diff_level = computeDifficultyLevel(group_by)

    filtr_row = filter_row(pivot_table(diff_level),diff_level)
    irt_curve = compute_irt_parameters(filtr_row)
    return(irt_curve)

# x = main("id_721_latest.csv")

# print(x)

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument("bookID", help="Book ID")
    args = parser.parse_args()
    bookID = args.bookID

    runner(bookID)
