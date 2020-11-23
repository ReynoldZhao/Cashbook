const jsonSever = require('json-server')
const express = require('express')
const path = require('path')
const server = jsonSever.create()
const router = jsonSever.router('db.json')
const middlewares = jsonSever.defaults()
const root = __dirname + '/build'
server.use(express.static(root, { maxAge: 8640000}))
server.use(middlewares)
const reactRouterWhiteList = ['/create', '/edit/:itemId']
server.get(reactRouterWhiteList, (request, response) => {
    response.sendFile(path.resolve(root, 'index.html'))
})
server.use(router)
server.listen(3000, ()=>{
    console.log('server is running')
})