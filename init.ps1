docker pull mcr.microsoft.com/mssql/server:2022-latest

docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=StreamServiceDemo2022" -p 1433:1433 --name StreamServiceSql --hostname StreamServiceSql -d mcr.microsoft.com/mssql/server:2022-latest

