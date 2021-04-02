# Giphy Search

- [Giphy Search](#giphy-search)
- [Introduction](#introduction)
- [Live Preview](#live-preview)
- [Installation](#installation)
  - [Local installation](#local-installation)
- [API](#api)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Useful Commands](#useful-commands)
- [Environment](#environment)
  - [Development server](#development-server)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
- [Supported Browsers](#supported-browsers)
- [Possible improvements](#possible-improvements)

# Introduction

This is a simple gif search app. It consists of following features. 

User can:
1. Search for Gifs.
2. Copy link to clipboard.
3. Click on gif navigates to gif page
4. Scroll infinite for more gifs
5. View total gifs available for that category

# Live Preview
You can view the application [here](https://giphy-search-demo.netlify.app)


# Installation

## Local installation

- Clone this repo using `https://github.com/mdsrayyan/giphy-search.git`
- Run `npm install` or `npm ci` for a clean install.
- Run `npm start` to start application in your local machine.
- Open chrome and navigate to `http://localhost:4200`

# API

This project makes use of

1. Giphy API that provide all the data needed



# Project Structure

- This project structure is well suitable for enterprise level applications to small scale applications.
- Configured with latest tslint rules
- Husky is in place to check linting, unit test and end to end test cases for every commit
- Equipped with code snippets to help developers to ease the process of documentation
- Project uses Angular Material for UX (opiniated)
- Uses CDK Virtual scroll for pagination from Angular Material[here](https://material.angular.io/cdk/scrolling/overview)
- Uses Flex layout library

# Deployment

Before deployment, Husky scripts check for linting, Unit Testing and End-To-End tests. Not meeting the check wont let you to push the code to repo.
After the successful check, code will be pushed to the corresponding branch in github and automatic scripts are in place to deploy it to netlify.

check live app after deployment [here](https://giphy-search-demo.netlify.app)


# Useful Commands

Run `ng g c my-component` to generate a new component.
Run `ng g module my-component` to generate a new component.
Run `ng g service my-component` to generate a new component.
Run `npm run generate:Docs` to generate docs.
Run `npm run update` to update to latest version.


# Environment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Supported Browsers

1. Chrome
2. Edge
3. Firefox

# Possible improvements

1. Unit test case coverage could have been done better
2. Could have added embed link
3. Could have added trending gifs in dash-board when landing

