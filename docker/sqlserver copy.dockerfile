FROM microsoft/mssql-server-linux

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=reallyStrongPwd123
ENV MSSQL_PID=Developer
ENV MSSQL_TCP_PORT=1433

#WORKDIR /temp

COPY  *.sql /tmp


RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" &&  /opt/mssql-tools/bin/sqlcmd -S127.0.0.1 -U sa -P reallyStrongPwd123  -Q ":r /tmp/restore.sql" 

# 1. Run docker build -t sqlserver -f sqlserver.dockerfile .
# 2. Run docker run -p 1433:1433 --name sqlC -d sqlserver 