- npm init adonisjs@latest adonis_learn
- npm run dev
- npm i adonis-autoswagger
  - create swagger config file
  - https://github.com/ad-on-is/adonis-autoswagger
- node ace migration:fresh
- node ace make:controller auth -s register login logout me
- node ace make:middleware role_middleware
- Add role in the user model and in the table (with enum)
- Add role middleware checking if user role match the asked role
- If there is complex checks for actions (policy) add a userRoleUtils
  - With possibility to check if role is enough
- add node ace add @adonisjs/redis (used for limiter and queues)
- add rate limiters : node ace add @adonisjs/limiter
- npm i -D c8 // For test coverage
- add script for precommit hook

make typecheck, lint, format mandatory (makefile before each commit or an auto script before)
Utilisation des validators
Nom des fichier en snake case
Structure des dossier :
nom des dossiers / sous-dossier au pluriel
/!\ Exceptés pour certains dossier pré crées par adonis (database, config, middleware, etc)

npm i pino-roll // For logs rotation

TODO :

[x] Route resource
[x] Check the syntax (store, destroy etc, or other for regsiter login ?)
[ ] queues // Ignore for now, not used
[x] Logs
[x] log rotations
[x] log service
[x] make logger service into singleton
[x] Add logging to existing actions
[x] Services architecture
// We MUST use ctx directly in controller and destructure afterward. The solutions to avoid duplication would be over
// engineering and not efficient
[x] Structure for api response (response service)
[x] Change api response using the response service
[x] Seeders
[x] Factory
[x] Tests for auth controller
[ ] Add test coverage check npm i -D c8
[x] Code checkers
[x] makefile commands to check :
[x] code quality
[x] Tests
[x] Types
[x] Merge checker (all of the above)
[x] Pre commit, run code quality and type checking
[x] Add precommit script.
[x] Add script "format:check": "prettier --check ." in package json

Use seeders for local
Use factory in seeders or in tests to generate it's fake data

Api responses structure

```
{
  isSuccess: true,
  status: ResponseStatus,
  data: null,
  errors: error.messages,
  message: error.message,
  code: error.code,
}
```

# IDEAS

Have a script that separetes the logs by taking the security ones to a specific file ?
Maybe bad since it would be a huge amount of data (but since we roll the logs thats ok no ?)

# WARNING

Types must be good, compilation on build uses tsc so it has a type checking and will not build

# Installation

- make d-up
- make d-init-db
