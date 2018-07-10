# BenefitsCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# Running locally connected to deployed Web API

1) Clone the repo
2) In the root folder of the repo (benefitsCalculator-angularClient), execute the following using a command prompt:
- npm install
- npm start
3) Navigate to `http://localhost:4200`

# Running locally with a locally running Web API

1) Clone the repo
2) Have the Web API running and note the port number
3) Update the CONFIG.urls.server setting (@ benefitsCalculator-angularClient/src/app/entities/app.constants.ts) to match the Web API localhost port number.
4) In the root folder of the repo (benefitsCalculator-angularClient), execute the following using a command prompt:
- npm install
- npm start
5) Navigate to `http://localhost:4200`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
