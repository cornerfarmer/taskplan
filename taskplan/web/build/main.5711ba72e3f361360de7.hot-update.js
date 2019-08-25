webpackHotUpdate("main",{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./src/less/index.less":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./src/less/index.less ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\n  color: #757575;\n  line-height: 1.15;\n  background: #FAFAFA;\n}\nhtml,\nbody,\n#root,\n#root > #page,\n#root > #page > .container > .row,\n#root > #page > .container > .row > div,\n#root > #page > .container > .row > div > #scheduler {\n  height: 100%;\n}\n#root > #page > .container {\n  height: calc(100% - 39px);\n  max-width: none;\n}\n#root > #page > .container > .row > div:first-child {\n  padding-right: 0;\n}\n#root > .container > .row > div:last-child {\n  padding-left: 0;\n}\nh1 {\n  font-size: 80px;\n  font-weight: 300;\n  line-height: 1;\n  margin-bottom: 40px;\n}\nh2 {\n  font-size: 30px;\n  font-weight: 400;\n  line-height: 40px;\n  margin-bottom: 15px;\n}\n.buttons {\n  display: flex;\n}\n.buttons div {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 6px 10px;\n  border-radius: 2px;\n  cursor: pointer;\n  text-transform: uppercase;\n  font-size: 14px;\n}\n.buttons div:first-child {\n  background: #3f51b5;\n  color: white;\n  margin-right: 10px;\n}\n.buttons div:last-child {\n  margin-right: 0;\n}\nlabel {\n  margin-bottom: 0;\n}\n.separator {\n  margin: 0 5px;\n}\n#scheduler {\n  padding: 16px 30px 16px 0;\n  overflow-y: auto;\n  max-width: 600px;\n  margin: 0 auto;\n}\n#scheduler #max-running-tasks {\n  cursor: pointer;\n}\n.device {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n}\n.device > .header {\n  background: rgba(0, 0, 0, 0.05);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 40px;\n  padding: 0 16px;\n}\n.device > .header > span {\n  flex: 1 1;\n}\n.device > .header .action {\n  margin-bottom: 0;\n  margin-right: 16px;\n}\n.device > .header .hide-device {\n  cursor: pointer;\n}\n.device .queue-header {\n  display: flex;\n  align-items: center;\n}\n.device .queue-header .action {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  width: 21px;\n  height: 21px;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  margin: 0;\n  margin-right: 8px;\n}\n.device .body {\n  padding: 16px;\n}\n.device .tasks {\n  padding: 0;\n  margin-bottom: 10px;\n}\n.device .tasks.tasks-queued {\n  margin: 0;\n}\n.device .tasks .mock-task {\n  background: white;\n  border: 2px dashed rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 300;\n  font-size: 20px;\n  color: rgba(0, 0, 0, 0.4);\n  height: 132px;\n}\n.device .tasks .task {\n  list-style: none;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: white;\n  margin-bottom: 16px;\n}\n.device .tasks .task .content {\n  padding: 16px;\n  padding-bottom: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-bottom: none;\n}\n.device .tasks .task .header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.device .tasks .task .header .status {\n  text-align: right;\n  line-height: 1;\n}\n.device .tasks .task .header .status .iterations {\n  font-size: 12px;\n  color: #AAA;\n}\n.tasks-queued.device .tasks .task .header {\n  cursor: grab;\n}\n.device .tasks .task .header .project-name {\n  font-weight: 300;\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n.device .tasks .task .progress {\n  background: #3f51b5;\n  height: 2px;\n  margin-bottom: 10px;\n  border-radius: 0;\n  transition: width 400ms ease-in-out;\n}\n.device .tasks .task .preset-name {\n  font-size: 14px;\n  cursor: pointer;\n}\n.device .tasks .task .try-number {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 1px 7px 2px 7px;\n  margin-right: 7px;\n  display: inline-block;\n  line-height: 1;\n  vertical-align: top;\n}\n.device .tasks .task .toolbar {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 5px 16px 1px 16px;\n  line-height: 1;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n.device .tasks .task .toolbar > span {\n  display: flex;\n  align-items: center;\n}\n.device .action,\n.device .tasks .task .toolbar .action {\n  background: #3f51b5;\n  padding: 0 10px;\n  text-transform: uppercase;\n  display: inline-flex;\n  align-items: center;\n  color: white;\n  border-radius: 2px;\n  font-weight: 500;\n  /* box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);*/\n  height: 24px;\n  font-size: 13px;\n  cursor: pointer;\n  margin-right: 5px;\n  margin-bottom: 4px;\n}\n.device .tasks .task .toolbar .action i {\n  margin-right: 7px;\n}\n.device .tasks .task .toolbar .action span {\n  margin-top: 2px;\n}\n.device .tasks .task .toolbar .dropdown {\n  display: inline-flex;\n  margin-bottom: 4px;\n}\n.device .tasks .task .toolbar .action.dropdown-toggle i {\n  margin: 0;\n}\n.device .tasks .task .toolbar .current-action {\n  flex: 2 1;\n  text-align: right;\n  font-size: 12px;\n}\n.device .tasks .task.on-drag-over {\n  border: 3px dashed #3f51b5;\n  box-shadow: none;\n}\n.device .tasks .task.on-drag-over .content,\n.device .tasks .task.on-drag-over .toolbar {\n  visibility: hidden;\n}\n#root div.jsoneditor-tree div.jsoneditor-tree-inner {\n  padding-bottom: 100px;\n}\n.jsoneditor .inherited-value .jsoneditor-field,\n.jsoneditor .inherited-value .jsoneditor-value {\n  color: #888888;\n}\n.jsoneditor table.jsoneditor-values.inherited-value td .revert {\n  display: none;\n}\n.jsoneditor table.jsoneditor-values:not(.inherited-value) td .revert {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 16px;\n  color: #3f51b5;\n  cursor: pointer;\n}\n.jsoneditor table.jsoneditor-values.new-value td .revert i:before {\n  content: \"\\f00d\";\n}\n#project-manager {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-top: 0;\n  border-bottom: 0;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n#project-manager #projects-toolbar {\n  display: flex;\n  padding: 5px 16px;\n  background: #e8e8e8;\n  justify-content: space-between;\n  z-index: 10;\n}\n#project-manager #projects-toolbar #project-selector span {\n  margin-right: 20px;\n}\n#project-manager #projects-toolbar #project-selector span i {\n  color: #BBB;\n}\n#project-manager #projects-toolbar #project-selector span.active i {\n  color: inherit;\n  cursor: pointer;\n}\n#project-manager #projects-toolbar #project-toolbar {\n  display: flex;\n  flex-direction: row;\n}\n#project-manager #projects-toolbar #project-toolbar #code-version {\n  padding: 0 10px;\n  border-radius: 2px;\n  font-weight: 500;\n  margin-right: 10px;\n  color: #757575;\n  background: #f2f2f2;\n  display: flex;\n  align-items: stretch;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n}\n#project-manager #projects-toolbar #project-toolbar #tb-link {\n  background: #F57C00;\n  color: white;\n  border-radius: 2px;\n  padding: 0 3px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n#project-manager #projects {\n  overflow-y: hidden;\n  flex: 1 1 auto;\n  height: 100px;\n  background: #FAFAFA;\n  z-index: 10;\n}\n#project-manager #projects .project {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n#project-manager #projects .project .tabs {\n  display: flex;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: none;\n  border-left: none;\n  background: white;\n  flex: 0 0 auto;\n}\n#project-manager #projects .project .tabs div {\n  padding: 16px;\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n  flex: 2 1;\n  text-align: center;\n  font-weight: 300;\n  font-size: 24px;\n  background: rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n}\n#project-manager #projects .project .tabs div:hover {\n  background: rgba(0, 0, 0, 0.025);\n}\n#project-manager #projects .project .tabs div.tab-active,\n#project-manager #projects .project .tabs div.tab-active:hover {\n  background: white;\n}\n#project-manager #projects .project .tabs div:last-child {\n  border: none;\n}\n#project-manager #projects .project .sorting {\n  padding: 5px 16px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n#project-manager #projects .project .sorting > div > * {\n  margin-right: 10px;\n}\n#project-manager #projects .project .sorting > div > .fa,\n#project-manager #projects .project .sorting > div > .fas {\n  cursor: pointer;\n}\n#project-manager #projects .project > .preset-filter {\n  border: none;\n}\n#project-manager #projects .project .tab {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n#project-manager #projects .project .presets-tab,\n#project-manager #projects .project .tasks-tab {\n  overflow-y: auto;\n  flex: 1 1 auto;\n}\n#project-manager #projects .project ul {\n  padding: 0;\n  margin-bottom: 0;\n}\n#project-manager #projects .project ul .item {\n  list-style: none;\n}\n#project-manager #projects .project ul .item-preset[draggable=\"true\"] .header {\n  cursor: grab;\n}\n#project-manager #projects .project ul .item-preset.on-drag-over {\n  border: 3px dashed #3f51b5;\n  box-shadow: none;\n}\n#project-manager #projects .project ul .item-preset.on-drag-over .header {\n  visibility: hidden;\n}\n#project-manager #projects .project ul .item-preset .grip-icon {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#project-manager #projects .project ul .item-preset .group-header,\n#project-manager #projects .project ul .item-preset .header {\n  cursor: pointer;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n#project-manager #projects .project ul .item-preset .group-header {\n  background: white;\n  font-weight: 300;\n  justify-content: center;\n  font-size: 24px;\n  padding: 0 0 0 16px;\n  text-transform: uppercase;\n}\n#project-manager #projects .project ul .item-preset .header {\n  height: 40px;\n  padding-left: 16px;\n  padding-right: 10px;\n  background: rgba(0, 0, 0, 0.05);\n}\n#project-manager #projects .project ul .item-preset .header .title {\n  font-weight: 300;\n  font-size: 18px;\n}\n#project-manager #projects .project ul .item-preset .header .toolbar {\n  display: flex;\n  align-items: center;\n}\n#project-manager #projects .project ul .item-task,\n#project-manager #projects .project ul .item-choice {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  background: white;\n  display: flex;\n}\n#project-manager #projects .project ul .item-task.task-running {\n  background-image: repeating-linear-gradient(-45deg, #f4f5ff, #f4f5ff 11px, white 10px, white 20px);\n  background-size: 28px 28px;\n  animation: move 2s linear infinite;\n}\n@keyframes move {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 28px 0;\n  }\n}\n#project-manager #projects .project ul .item-task.item-highlight {\n  animation: highlight 1500ms ease-out;\n}\n@keyframes highlight {\n  0% {\n    background-color: #4f61f4;\n  }\n  100 {\n    background-color: white;\n  }\n}\n#project-manager #projects .project ul .item-choice.item-abstract {\n  font-style: italic;\n}\n#project-manager #projects .project ul .item-task .content,\n#project-manager #projects .project ul .item-choice .content {\n  flex: 1 1 auto;\n  padding: 16px;\n}\n#project-manager #projects .project ul .item-task .content .title,\n#project-manager #projects .project ul .item-choice .content .title {\n  font-weight: 300;\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n#project-manager #projects .project ul .item-task .content .title .try-number,\n#project-manager #projects .project ul .item-choice .content .title .try-number {\n  background: #ececec;\n  padding: 4px 10px;\n  margin-right: 10px;\n  display: inline-block;\n  line-height: 1;\n  font-size: 20px;\n  vertical-align: top;\n}\n#project-manager #projects .project ul .item-task .content .footer,\n#project-manager #projects .project ul .item-choice .content .footer {\n  font-size: 14px;\n  font-weight: 300;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 10px;\n  margin-top: 10px;\n}\n#project-manager #projects .project ul .item-task .content .footer .task-error {\n  color: #ef767a;\n  font-weight: 400;\n}\n#project-manager #projects .project ul .item-task .content .footer span:not(.task-error):before {\n  content: \"-\";\n  margin: 0 7px;\n}\n#project-manager #projects .project ul .item-task .content .footer span:first-child:before,\n#project-manager #projects .project ul .item-choice .content .footer span:first-child:before {\n  content: \"\";\n  margin: 0;\n}\n#project-manager #projects .project ul .item-task .content .footer span span,\n#project-manager #projects .project ul .item-choice .content .footer span span {\n  font-weight: 400;\n}\n#project-manager #projects .project ul .item-task .toolbar,\n#project-manager #projects .project ul .item-choice .toolbar {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 10px;\n  background: #f2f2f2;\n  display: flex;\n  flex-direction: column;\n}\n#project-manager #projects .project ul .item .toolbar .action {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #3f51b5;\n  border-radius: 2px;\n  cursor: pointer;\n  color: white;\n  font-size: 12px;\n}\n#project-manager #projects .project ul .item .toolbar .action.action-disabled {\n  cursor: not-allowed;\n  background: gray;\n}\n#project-manager #projects .project ul .item-task .toolbar .action,\n#project-manager #projects .project ul .item-choice .toolbar .action {\n  margin-bottom: 4px;\n}\n#project-manager #projects .project ul .item-preset .header .toolbar .action {\n  margin-left: 4px;\n}\n.tasks .task .toolbar .action.dropdown-toggle,\n#project-manager #projects .project ul .item-task .toolbar .action.dropdown-toggle,\n#project-manager #projects .project ul .item-choice .toolbar .action.dropdown-toggle {\n  margin: 0;\n}\n#project-manager #projects .project ul .item-task .toolbar .action.dropdown-toggle,\n#project-manager #projects .project ul .item-choice .toolbar .action.dropdown-toggle {\n  height: 14px;\n}\n.tasks .task .toolbar .action.dropdown-toggle:after,\n#project-manager #projects .project ul .item-task .toolbar .action.dropdown-toggle:after,\n#project-manager #projects .project ul .item-choice .toolbar .action.dropdown-toggle:after {\n  display: none;\n}\n.tasks .task .toolbar .dropdown-menu,\n#project-manager #projects .project ul .item-task .toolbar .dropdown-menu,\n#project-manager #projects .project ul .item-choice .toolbar .dropdown-menu {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  min-width: auto;\n  padding: 7px;\n  border: 1px solid #E3E3E3;\n  border-radius: 0;\n  margin-top: 5px;\n}\n.tasks .task .toolbar .dropdown-menu {\n  left: -42px !important;\n}\n#project-manager #projects .project ul .item .toolbar .dropdown-menu {\n  left: 4px !important;\n}\n.tasks .task .toolbar .dropdown-menu:after,\n#project-manager #projects .project ul .item .toolbar .dropdown-menu:after {\n  content: \" \";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -8px;\n  border: 10px solid transparent;\n  border-bottom-color: white;\n}\n.tasks .task .toolbar .dropdown-menu .action:last-child,\n#project-manager #projects .project ul .item .toolbar .dropdown-menu .action:last-child {\n  margin: 0;\n}\n#project-manager #projects .project .tab-toolbar {\n  display: flex;\n  padding: 5px 16px;\n  background: rgba(158, 158, 158, 0.2);\n  flex-direction: row;\n  justify-content: space-between;\n  flex: 0 0 auto;\n}\n#project-manager #projects .project .tab-toolbar label {\n  margin-bottom: 0;\n  display: flex;\n  align-items: center;\n}\n#project-manager #projects .project .tab-toolbar label input {\n  margin-right: 10px;\n}\n#project-manager #projects .project .tab-toolbar .buttons div:last-child {\n  margin-right: 0;\n}\n.prompt-wrapper {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 5;\n}\n.prompt-wrapper .prompt {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: white;\n  max-width: 300px;\n  border-radius: 2px;\n}\n.prompt-wrapper .prompt.preset-prompt {\n  max-width: 600px;\n  width: 600px;\n}\n.prompt-wrapper .prompt .prompt-header {\n  background: #3f51b5;\n  padding: 5px 16px;\n  color: white;\n}\n.prompt-wrapper .prompt .prompt-text {\n  font-size: 14px;\n  padding: 16px;\n  padding-bottom: 0;\n}\n.prompt-wrapper .prompt > input,\n.prompt-wrapper .prompt > select {\n  margin: 10px 16px 0 16px;\n  text-align: right;\n  width: calc(100% - 32px);\n}\n.prompt-wrapper .jsoneditor {\n  width: calc(100% - 32px);\n  margin: 10px 16px 16px 16px;\n  height: 250px;\n  border-color: #3f51b5;\n}\n.prompt-wrapper .jsoneditor div.jsoneditor-menu {\n  background-color: #3f51b5;\n  border-color: #3f51b5;\n}\n.editor .buttons,\n.prompt-wrapper .prompt .buttons {\n  display: flex;\n  justify-content: flex-end;\n  margin: 16px 16px 16px 16px;\n}\n.editor.task-editor {\n  flex: 1 1;\n}\n.editor .header {\n  padding: 5px 16px;\n  background: rgba(158, 158, 158, 0.2);\n}\n.editor .field {\n  margin: 10px 16px;\n}\n.editor .preset-filter {\n  margin: 30px 16px;\n}\n.editor .field {\n  display: flex;\n  align-items: center;\n  justify-content: stretch;\n}\n.editor .field label {\n  margin: 0;\n  width: 150px;\n}\n.editor .field input,\n.editor .field select {\n  flex: 2 1;\n  padding-left: 5px;\n}\n.editor .field input[type=\"checkbox\"] {\n  flex: none;\n}\n.editor .jsoneditor {\n  width: calc(100% - 32px);\n  resize: vertical;\n  margin: 16px;\n  height: 250px;\n  border-color: #3f51b5;\n}\n.editor .jsoneditor-readOnly .jsoneditor {\n  border-color: rgba(158, 158, 158, 0.2);\n  height: auto;\n}\n.editor .jsoneditor-readOnly .ace-jsoneditor .ace_marker-layer .ace_active-line,\n.editor .jsoneditor-readOnly .ace-jsoneditor .ace_gutter-active-line {\n  background-color: inherit;\n}\n.editor .jsoneditor-readOnly .ace-jsoneditor .ace_scroller {\n  background-color: rgba(158, 158, 158, 0.1);\n}\n.editor .jsoneditor-readOnly .ace_cursor-layer {\n  display: none;\n}\n.editor .editor-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 250px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin: 16px;\n}\n.editor .jsoneditor div.jsoneditor-menu {\n  background-color: #3f51b5;\n  border-color: #3f51b5;\n}\n.task-editor .command {\n  cursor: pointer;\n}\n.slide-editor {\n  position: absolute;\n  width: 400px;\n  left: -400px;\n  top: 0;\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n  background: #fafafa;\n  height: 100%;\n  animation: slide-in 0.4s ease;\n  overflow-y: auto;\n}\n@keyframes slide-in {\n  0% {\n    transform: translateX(400px);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n.slide-editor .header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n}\n.slide-editor .header i {\n  padding: 2px 10px;\n  margin: -2px -10px;\n}\n.task-viewer .title,\n.task-viewer .metadata,\n.task-viewer h2,\n.task-viewer .notes,\n.task-viewer .presets,\n.task-viewer .checkpoints {\n  margin: 10px 16px;\n}\n.task-viewer .title {\n  font-weight: 300;\n  font-size: 24px;\n}\n.task-viewer .title .try-number {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 4px 10px;\n  margin-right: 10px;\n  display: inline-block;\n  line-height: 1;\n  font-size: 20px;\n  vertical-align: top;\n}\n.task-viewer .metadata,\n.task-viewer .presets {\n  font-weight: 300;\n}\n.task-viewer .metadata div,\n.task-viewer .presets div {\n  margin-bottom: 5px;\n}\n.task-viewer .metadata div span,\n.task-viewer .presets div span {\n  font-weight: 400;\n  display: inline-block;\n  width: 100px;\n}\n.task-viewer h2 {\n  font-weight: 300;\n  font-size: 24px;\n}\n.task-viewer .checkpoints {\n  max-height: 300px;\n  overflow: auto;\n}\n.task-viewer .checkpoints > div {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin-bottom: 5px;\n  align-items: center;\n}\n.task-viewer .checkpoints > div .iteration {\n  background: rgba(158, 158, 158, 0.2);\n}\n.task-viewer .checkpoints > div .action {\n  background: #3f51b5;\n  cursor: pointer;\n  color: white;\n}\n.task-viewer .checkpoints > div .iteration,\n.task-viewer .checkpoints > div .action {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.task-viewer .checkpoints > div .time {\n  font-weight: 300;\n}\n.task-viewer textarea {\n  min-height: 150px;\n  width: 100%;\n}\n.code-version-viewer {\n  display: flex;\n  flex-direction: column;\n}\n.code-version-viewer .code-versions {\n  overflow: auto;\n}\n.code-version-viewer .code-versions .code-version-row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.code-version-viewer .code-versions .code-version-row .code-version-branch-arrow {\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.code-version-viewer .code-versions .code-version {\n  background: rgba(158, 158, 158, 0.1);\n  margin: 5px 0;\n  max-width: 300px;\n  border-radius: 5px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  flex: 1 1 auto;\n}\n.code-version-viewer .code-versions .code-version.current-code-version {\n  background: #3f51b5;\n  color: white;\n}\n.code-version-viewer .code-versions .code-version .name {\n  background: rgba(0, 0, 0, 0.05);\n  font-weight: 300;\n  padding: 5px 16px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.code-version-viewer .code-versions .code-version .time {\n  font-size: 12px;\n  text-align: center;\n  padding: 2px 0;\n}\n.code-version-viewer .code-versions .arrow {\n  text-align: center;\n  font-size: 20px;\n}\n.preset-viewer label {\n  display: flex;\n  align-items: center;\n  margin: 10px 16px;\n}\n.preset-viewer label input {\n  margin-right: 10px;\n}\n.preset-viewer .preset-filter {\n  margin: 10px 16px;\n}\n#flash-messages {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 10;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n#flash-messages .flash-message {\n  opacity: 1;\n  background: #3f51b5;\n  border-radius: 0 2px 2px 0;\n  color: white;\n  padding: 5px 10px;\n  max-width: 400px;\n  display: inline-block;\n  height: 26px;\n  margin-top: 10px;\n  transition: margin 0.4s;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font-size: 14px;\n  font-weight: 300;\n}\n#flash-messages .flash-message:hover {\n  opacity: 1;\n}\n#flash-messages .flash-message.level-40 {\n  background: #ef767a;\n}\n#flash-messages .flash-message.level-30 {\n  background: #eeb868;\n}\n#controlbar {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: rgba(158, 158, 158, 0.4);\n  color: white;\n}\n#controlbar > .container {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n}\n#controlbar > .container #title {\n  background: #3f51b5;\n  font-size: 24px;\n  padding: 7px 10px;\n  font-weight: 400;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  margin: 0 50px 0 0;\n}\n#controlbar > .container .action {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 2px;\n  cursor: pointer;\n  font-size: 14px;\n  background: #3f51b5;\n  margin-right: 10px;\n}\n.preset-filter {\n  border: 1px solid rgba(158, 158, 158, 0.2);\n  border-bottom: none;\n  max-height: 350px;\n  overflow: auto;\n}\n.preset-filter .preset-name {\n  background: rgba(158, 158, 158, 0.05);\n}\n.preset-filter .choices-wrapper {\n  overflow: y;\n}\n.preset-filter .choices {\n  border-top: 1px solid rgba(158, 158, 158, 0.2);\n  border-bottom: 1px solid rgba(158, 158, 158, 0.2);\n}\n.preset-filter .preset-name {\n  padding: 5px 10px;\n}\n.preset-filter .choices .choice {\n  padding: 10px;\n  white-space: nowrap;\n}\n.preset-filter .choices .choice {\n  background: white;\n  cursor: pointer;\n}\n.preset-filter .choices .choice-selected.choice {\n  background: #3f51b5;\n  color: white;\n}\n.preset-filter .choices {\n  display: flex;\n}\n.preset-filter .choices .choice {\n  border-right: 1px solid rgba(158, 158, 158, 0.2);\n}\n.preset-filter .choices .choice.choice-default {\n  font-weight: 500;\n}\n.preset-filter .choices .choice .task-numbers {\n  margin-left: 10px;\n  background: #ededed;\n  border-radius: 2px;\n  color: #1c1c1c;\n  font-weight: 300;\n  padding: 0 2px;\n}\n.preset-filter .choices .choice input {\n  padding: 0;\n  border: none;\n}\n.preset-filter .group-header {\n  cursor: pointer;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background: white;\n  font-weight: 300;\n  justify-content: center;\n  font-size: 24px;\n  padding: 0 0 0 16px;\n  text-transform: uppercase;\n}\n", ""]);



/***/ }),

/***/ "./src/Device.js":
/*!***********************!*\
  !*** ./src/Device.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Prompt */ "./src/Prompt.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/Device.js";





class Device extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      max_running: 1,
      showQueue: false
    };
    this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
    this.connect = this.connect.bind(this);
    this.toggleQueue = this.toggleQueue.bind(this);
  }

  openMaxRunningDialog() {
    this.openMaxRunningDialogRefs.current.openDialog();
  }

  connect() {
    fetch("/connect_device/" + this.props.device.uuid).then(res => res.json()).then(result => {});
  }

  disconnect() {
    fetch("/disconnect_device/" + this.props.device.uuid).then(res => res.json()).then(result => {});
  }

  toggleQueue() {
    this.setState({
      showQueue: !this.state.showQueue
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "device",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, this.props.device.name), this.props.device.is_connected === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.connect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, "Connect"), this.props.device.is_connected === 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.disconnect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      },
      __self: this
    }, "Disconnect"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "hide-device",
      onClick: () => this.props.hideDevice(this.props.device),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-times",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "body",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, this.props.device.is_connected !== 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "tasks",
      id: "tasks-running",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: this
    }, this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING).length === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "mock-task",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      },
      __self: this
    }, "Idle"), this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING).map((task, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: task.uuid,
      task: task,
      index: index,
      highlightTask: this.props.highlightTask,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "queue-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.toggleQueue,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: this
    }, this.state.showQueue ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-minus",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-plus",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92
      },
      __self: this
    })), "Waiting (", this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED).length, ")"), this.state.showQueue && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "tasks tasks-queued",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      },
      __self: this
    }, this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED).sort(function (a, b) {
      return a.queue_index - b.queue_index;
    }).map((task, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: task.uuid,
      task: task,
      index: index,
      highlightTask: this.props.highlightTask,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    })))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Device);

/***/ })

})
//# sourceMappingURL=main.5711ba72e3f361360de7.hot-update.js.map