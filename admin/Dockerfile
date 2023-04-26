# Начинаем с базового образа Node.js
FROM node:14-alpine

# Устанавливаем рабочую директорию внутри образа
WORKDIR /app

# Копируем файлы package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем переменные окружения
ENV NODE_ENV=production
#ENV API_URL=https://api.example.com

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в рабочую директорию
COPY . .

# Собираем проект
RUN npm run build

# Запускаем приложение при запуске контейнера
CMD ["npm", "start"]
