#!/usr/bin/env python
# coding: utf-8


import names
import pandas as pd
import numpy as np
import mysql.connector
from mysql.connector import Error
from essential_generators import DocumentGenerator
from random import randint 
import random



def create_connection(host_name, db_name, user_name, user_password):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

connection = create_connection("34.136.221.76", "348-project-production", "Andrew", "")
cursor = connection.cursor()



idVal = 0
cursor.execute("SELECT MAX(id) FROM users")
for (id) in cursor:
    idVal = max(id[0], idVal)
print("current Max User ID is: ", idVal)
existingEmails = set()

# USER DATA -------------------------------------------------------------------------------
def createUserData():
    i = 0
    currID = idVal + 1
    while i < 5000:
        name = names.get_full_name(gender="female")
        email = name.replace(" ", "") + "@gmail.com"
        password = "$2a$10$6U.ZvZJdf93059f5sY.RJu..Rp4zpTU61INzmq6cpEKppEXw3E8V2"
        isAdmin = False
        add_user = ("INSERT INTO users "
                "(id, name, email, password, isAdmin, createdAt, updatedAt) "
                "VALUES (%s, %s, %s, %s, %s, NOW(), NOW())")
        data_user = (currID, name, email, password, isAdmin)
        if ( email not in existingEmails ):
            existingEmails.add( email )
            try:
                cursor.execute(add_user, data_user)
            except Error as e:
                print(f"The error '{e}' occurred")
        if ( i % 100 == 0):
    #         print("user with name: ", name, "id: ", currID, " is created")
            connection.commit()
            print("100 users added to database")
        i += 1
        currID += 1

# USER DATA -------------------------------------------------------------------------------

# Product DATA -------------------------------------------------------------------------------
def createProductData():
    cursor.execute('DELETE FROM products')
    manufacturers = ['Apple', 'Samsung', 'Huawei']
    types = ['laptop', 'phone', 'tablet']
    colors = ['silver', 'black', 'golden', 'other']
    currID = 1

    for m in manufacturers:
        for t in types:
            for c in colors:
                add_product = ("INSERT INTO products "
                            "(id, manufacturer, type, colour, createdAt, updatedAt) "
                            "VALUES (%s, %s, %s, %s, NOW(), NOW())")
                data_product = (currID, m, t, c)
                cursor.execute(add_product, data_product)
                print(data_product)
                currID += 1
    connection.commit()

# Product DATA -------------------------------------------------------------------------------

    
def createTicketsData():
    cursor.execute('DELETE FROM tickets')
    statusList = ['open', 'closed', 'archive' ]
    gen = DocumentGenerator()
    
    currID = 1
    while currID < 10000:
        userID = randint( 1, 20000 )
        productID = randint( 1, 36 )
        status = random.choice( statusList )
        description = gen.sentence()
        # print(currID, userID, productID, description, status)
        add_ticket = ("INSERT INTO tickets "
                        "(id, userID, productID, description, status, createdAt, updatedAt) "
                        "VALUES (%s, %s, %s, %s, %s, NOW(), NOW())")
        data_ticket = (currID, userID, productID, description, status)
        cursor.execute(add_ticket, data_ticket)
        currID += 1
        if ( currID % 100 ):
            print('added 100 tickets to database')
    connection.commit()

def createNotesData():
    # cursor.execute('DELETE FROM tickets')
    isStaffList = [ True, False ]
    gen = DocumentGenerator()
    
    currID = 5
    while currID <= 1000:
        ticketID = randint( 1, 100 )
        description = gen.sentence()
        isStaff = random.choice( isStaffList )
        # print(currID, userID, productID, description, status)
        add_notes = ("INSERT INTO notes "
                        "(id, ticketID, text, isStaff, createdAt, updatedAt) "
                        "VALUES (%s, %s, %s, %s, NOW(), NOW())")
        data_notes = (currID, ticketID, description, isStaff)
        cursor.execute(add_notes, data_notes)
        currID += 1
        if ( currID % 100 == 0):
            print('added ' + str(currID) + ' notes to database ')
    connection.commit()

    
# Execution
# createUserData()
# createProductData()
# createTicketsData()
createNotesData()

cursor.close()
connection.close()

