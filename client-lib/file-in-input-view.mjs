
import { View } from '@webhandle/backbone-view'

import associateFile from './templates/associate-file.mjs'
import existingFile from './templates/existing-file.mjs'
import noFile from './templates/no-file.mjs'
import { FileSelectDialog, loadStyles } from '@webhandle/tree-file-browser/client-lib/dynamic-load.mjs'

let statusAttr = 'data-image-in-input-status'
let directoryAttribute = 'data-file-dir'

export default class FileInInputView extends View {
	constructor(options) {
		super(options)

		this.input = options.input
		this.sink = options.sink

		this.statusAttr = options.statusAttr || statusAttr
		this.directoryAttribute = options.directoryAttribute || directoryAttribute
		this.template = options.template || associateFile
		this.existingFile = options.existingFile || existingFile
		this.noFile = options.noFile || noFile

		this.directory = this.input.getAttribute(this.directoryAttribute) || ''
		while (this.directory.startsWith('/')) {
			this.directory = this.directory.substring(1)
		}


		this.input.setAttribute(statusAttr, 'processed')
		loadStyles()
	}

	preinitialize() {
		this.className = 'webhandle-file-in-input-el'
		this.events = {
			'click .select': 'select'
			, 'click .remove': 'remove'
		}
	}

	render() {
		let val = this.input.value
		this.el.innerHTML = this.template(val)
		this.input.style.position = 'absolute'
		this.input.style.left = '-10000px'

		this.renderValue()
		this.setupButtonStyles()
	}

	setupButtonStyles() {
		let val = this.input.value
		let button = this.el.querySelector('.remove')
		if (val) {
			button.style.display = ''
		}
		else {
			button.style.display = 'none'
		}
	}

	renderValue() {
		let val = this.input.value
		let cur = this.el.querySelector('.current-file')
		if (val) {
			cur.innerHTML = this.existingFile(val)
		}
		else {
			cur.innerHTML = this.noFile()
		}
	}

	async select(evt, el) {
		evt.preventDefault()

		let diag = new FileSelectDialog({
			sink: this.sink
			, imagesOnly: false
			, startingDirectory: this.directory
		})
		let result = await diag.open()

		if (result && result.url) {
			this.input.value = result.url
		}
		else {
			this.input.value = ''
		}

		this.renderValue()
		this.setupButtonStyles()
	}

	remove(evt, el) {
		this.input.value = ''

		this.renderValue()
		this.setupButtonStyles()
	}

}