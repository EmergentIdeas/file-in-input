
import path from "path"
import express from "express"
import filog from "filter-log"
import loadTemplates from "./add-templates.js"
import webhandle from "webhandle"
// import initializeTreeBrowserResources from "./initialize-tree-browser-resources.cjs"
import initializeTreeBrowserResources from "@webhandle/tree-file-browser/server-lib/initialize-tree-browser-resources.mjs"
import FileSinkServer from 'file-sink-server'
import FileSink from 'file-sink'

let log

export default function(app) {
	log = filog('unknown')

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	loadTemplates()
	
	webhandle.routers.preStatic.get(/.*\.cjs$/, (req, res, next) => {
		console.log('cjs')
		res.set('Content-Type', "application/javascript")
		next()
	})

	initializeTreeBrowserResources(webhandle)
	let router = express.Router()
	let sinkServer = new FileSinkServer(new FileSink(webhandle.projectRoot + '/public'))
	// let sinkServer = new FileSinkServer(new FileSink('/home/kolz/data/test-data/image-files'))
	// let sinkServer = new FileSinkServer(new FileSink('/home/kolz/personal-data/dmusic'))
	sinkServer.addToRouter(router)
	app.use('/files', router)
	
	initializeTreeBrowserResources(webhandle)
}


