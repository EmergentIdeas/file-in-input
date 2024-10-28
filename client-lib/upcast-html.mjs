
// import { ImageBrowserView, FileSelectDialog, loadStyles } from '@webhandle/tree-file-browser/client-lib/dynamic-load.mjs'
import FileInInputView from './file-in-input-view.mjs'

export default function upcast({
	selector = 'input.file-input-field'
	, sink = window.webhandle.sinks.public
} = {}) {
	let fileInputs = document.querySelectorAll(selector)
	for(let fileInput of fileInputs) {
		let view = new FileInInputView({
			input: fileInput
			, sink: sink
		})
		view.render()
		view.appendTo(fileInput.parentElement)
		fileInput.view = view
	}
}

upcast.FileInInputView = FileInInputView