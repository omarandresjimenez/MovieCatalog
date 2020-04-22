# Movie Catalog 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

ASP.NET Core as Back End   Angular 9 as Front End

# API Movies

http://api.tvmaze.com/

# API Back End

http://localhost:63545/api/useritems     (local url asp.net core project)

## Development API REST server

Open project with Visual Studio 2019+ and Run with default options.

Set in the appsettings.json file the Connection string with the SQL server DB.  

From VS Package Manager terminal run  Migrations to create the Table UserItems in the DB:

Add-Migration "InitialCreate"
Update-Database


## Development Angular server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Set Environment variables

Update environment variables to set the API urls accordingly

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
