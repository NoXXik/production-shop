// const express = require('express');
// const serveStatic = require('serve-static');
// const path = require('path');
import path from 'path'
import express from 'express'
import serveStatic from "serve-static";
import {fileURLToPath} from "url";

const app = express();

// Путь к папке с собранными файлами
const staticPath = path.join(fileURLToPath(import.meta.url), '..', 'dist');

// Используем serveStatic для раздачи статических файлов
app.use('/', serveStatic(staticPath));

// Возвращаем index.html для всех запросов, кроме статических файлов
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Запускаем сервер на порту 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
