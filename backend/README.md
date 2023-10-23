# Commands

## Install dependencies
```
npm install
```

## Run migrations
```
npx dotenv sequelize db:migrate
```

## Run seeds
```
npx dotenv sequelize db:seed:all
```

## Run the app
```
npm start
```

## Creating models
```
npx dotenv sequelize model:generate --name [tablename] --attributes [attributes]
(ex: npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string)
```

## Creating seeders
```
npx dotenv sequelize seed:generate --name [seedername]
(ex: npx dotenv sequelize seed:generate --name demo-user)
```

## Creating migrations
```
npx dotenv sequelize migration:generate --name [migrationname]
(ex: npx dotenv sequelize migration:generate --name add-user)
```

## Undo migrations
```
npx dotenv sequelize db:migrate:undo
```

## Undo all migrations
```
npx dotenv sequelize db:migrate:undo:all
```

## Undo all migrations and seeders
```
npx dotenv sequelize db:reset
```

## Undo last migration and seeder
```
npx dotenv sequelize db:migrate:undo
npx dotenv sequelize db:seed:undo
```
