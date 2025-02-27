# Capital Connect V2
Welcome to the official capital connect frontend app code repository.

## Contribution
If you can access this repository from your account, congratulations because you can contribute to this codebase.

## Installation
To install this project:

1. Clone this repository:
```bash
git clone https://github.com/Capital-Connect-Africa/capital-connect-v2.git
```

2. At the project's root folder and install the required packages by using the command:
```bash
npm install
```
3. Deploy to localhost:
```bash
ng serve
```

## Deployments
* Local: 
```bash
http://localhost:4200
```
* Staging: 
```bash

```
* Live: 
```bash
https://app.capitalconnect.africa
```

## Tech Stack
* Angular 19
* Typescript

### Structure

`core/` - contains reusable  

* `pipes/`
* `utils/`
* `interfaces/` - custom entites
    * `crud-methods.interface.ts` - defines crud methods
    * `query-params.inteface.ts` - defines query params type
* `services/`
    * `base-http-service.ts`
* `components/`
* `interceptors/`

`features/` - app level features

`models/` - database entities

`assets/` - house static files

Happy coding!