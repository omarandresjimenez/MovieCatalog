
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'Demo'
)
BEGIN
  CREATE DATABASE Demo;

  Use Demo;
  
  create table userItems (
    userName varchar(20) not null PRIMARY key,
    userPassword varchar(540) not null,
    userRole varchar(10) not null
)  

INSERT INTO userItems
VALUES ('tempadmUser', 'pwd', 'admin')

END



