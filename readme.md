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