# Create SQL Server and StreamService Database and tables

1. Run init.ps1 from the root directory to create the SQL Server.
2. Connect to SQL Server from SSMS and create "StreamService" database
3. Open StreamService.sln, clean then rebuild
4. Run "Update-Database" on Package Manager Console. This should create "VideoFile" and "VideoCategory" tables in StreamService database.

## Run StreamService API project
1. Run StreamService (API) project from Visual Studio

## Run StreamService Angular project
1. Open UI/stream-app in the terminal
2. run "npm run start"
3. stream app uses port 4200 by default. Navigate to http://localhost:4200
4. Enjoy streaming and uploading videos :)

## WIP
* Automating database creation and migration execution
* Containerize API and UI applications
