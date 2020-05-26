
-- Create a new database called 'Demo'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'Demo'
)
CREATE DATABASE Demo
GO

Use Demo
GO
  
  create table userItems (
    userName varchar(20) not null PRIMARY key,
    userPassword varchar(540) not null,
    userRole varchar(10) not null
)  

INSERT INTO userItems
VALUES ('tempadmUser', 'pwd', 'admin')
