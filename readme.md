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

make typecheck, lint, format mandatory (makefile before each commit or an auto script before)
Utilisation des validators
Nom des fichier en snake case
nom des dossiers / sous-dossier au pluriel
npm i pino-roll // For logs rotation

TODO :

[ ] Route resource
  [ ] Check the syntax (store, destroy etc, or other for regsiter login ?)
[x] Logs
  [x] log rotations
  [x] log service
  [x] make logger service into singleton
  [x] Add logging to existing actions
[ ] queues
[x] Services architecture
  // We MUST use ctx directly in controller and destructure afterward. The solutions to avoid duplication would be over
  // engineering and not efficient
[x] Structure for api response (response service)
  [x] Change api response using the response service

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

[ ] Seeders
[ ] Factory

# IDEAS

Have a script that separetes the logs by taking the security ones to a specific file ? 
Maybe bad since it would be a huge amount of data (but since we roll the logs thats ok no ?)

# WARNING

Types must be good, compilation on build uses tsc so it has a type checking and will not build