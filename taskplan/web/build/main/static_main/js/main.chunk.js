(window["webpackJsonpweb"] = window["webpackJsonpweb"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./src/less/index.less":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./src/less/index.less ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\n  color: #757575;\n  line-height: 1.15;\n  background: #FAFAFA;\n}\nhtml,\nbody,\n#root,\n#root > #page,\n#root > #page > .container > .row,\n#root > #page > .container > .row > div,\n#root > #page > .container > .row > div > #scheduler {\n  height: 100%;\n}\n#root > #page > .container {\n  height: calc(100% - 39px);\n  max-width: none;\n}\n#root > #page > .container > .row > div:first-child {\n  padding-right: 0;\n}\n#root > .container > .row > div:last-child {\n  padding-left: 0;\n}\nh1 {\n  font-size: 80px;\n  font-weight: 300;\n  line-height: 1;\n  margin-bottom: 40px;\n}\nh2 {\n  font-size: 30px;\n  font-weight: 400;\n  line-height: 40px;\n  margin-bottom: 15px;\n}\n.buttons {\n  display: flex;\n}\n.buttons div {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 6px 10px;\n  border-radius: 2px;\n  cursor: pointer;\n  text-transform: uppercase;\n  font-size: 14px;\n}\n.buttons div:first-child {\n  background: #3f51b5;\n  color: white;\n  margin-right: 10px;\n}\n.buttons div:last-child {\n  margin-right: 0;\n}\nlabel {\n  margin-bottom: 0;\n}\n.separator {\n  margin: 0 5px;\n}\n#scheduler {\n  padding: 16px 0 16px 0;\n  overflow-y: auto;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  justify-content: center;\n}\n#scheduler #max-running-tasks {\n  cursor: pointer;\n}\n#scheduler > .dropdown {\n  width: 510px;\n  margin-bottom: 10px;\n}\n#scheduler > .dropdown div.action {\n  margin-bottom: 0;\n}\n#scheduler > .dropdown > .dropdown-menu {\n  border-radius: 0px;\n  transform: translate3d(0px, 24px, 0px) !important;\n}\n#scheduler > .dropdown > .dropdown-menu .dropdown-item {\n  cursor: pointer;\n}\n#scheduler > .dropdown > .dropdown-menu .dropdown-item:active {\n  background-color: #3f51b5;\n}\n.mock-device {\n  width: 510px;\n  height: 0;\n}\n.device {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin-bottom: 20px;\n  width: 500px;\n  margin-right: 10px;\n}\n.device > .header {\n  background: rgba(0, 0, 0, 0.05);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 40px;\n  padding: 0 16px;\n}\n.device > .header > span {\n  flex: 1 1;\n}\n.device > .header .action {\n  margin-bottom: 0;\n  margin-right: 16px;\n}\n.device > .header .hide-device {\n  cursor: pointer;\n}\n.device .queue-header {\n  display: flex;\n  align-items: center;\n}\n.device .queue-header .action {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  width: 21px;\n  height: 21px;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  margin: 0;\n  margin-right: 8px;\n}\n.device .body {\n  padding: 16px;\n}\n.device .tasks {\n  padding: 0;\n  margin-bottom: 10px;\n}\n.device .tasks.tasks-queued {\n  margin: 0;\n}\n.device .tasks.tasks-queued .task {\n  margin-top: 10px;\n}\n.device .tasks .mock-task {\n  background: white;\n  border: 2px dashed rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 300;\n  font-size: 20px;\n  color: rgba(0, 0, 0, 0.4);\n  height: 132px;\n}\n.device .tasks .task {\n  list-style: none;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: white;\n}\n.device .tasks .task .content {\n  padding: 16px;\n  padding-bottom: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-bottom: none;\n}\n.device .tasks .task .header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.device .tasks .task .header .status {\n  text-align: right;\n  line-height: 1;\n}\n.device .tasks .task .header .status .iterations {\n  font-size: 12px;\n  color: #AAA;\n}\n.tasks-queued.device .tasks .task .header {\n  cursor: grab;\n}\n.device .tasks .task .header .project-name {\n  font-weight: 300;\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n.device .tasks .task .progress {\n  background: #3f51b5;\n  height: 2px;\n  margin-bottom: 10px;\n  border-radius: 0;\n  transition: width 400ms ease-in-out;\n}\n.device .tasks .task .param-name {\n  font-size: 14px;\n  cursor: pointer;\n}\n.device .tasks .task .try-number {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 1px 7px 2px 7px;\n  margin-right: 7px;\n  display: inline-block;\n  line-height: 1;\n  vertical-align: top;\n}\n.device .tasks .task .toolbar {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 5px 16px 1px 16px;\n  line-height: 1;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n.device .tasks .task .toolbar > span {\n  display: flex;\n  align-items: center;\n}\n#scheduler > .dropdown .action,\n.device .action,\n.device .tasks .task .toolbar .action {\n  background: #3f51b5;\n  padding: 0 10px;\n  text-transform: uppercase;\n  display: inline-flex;\n  align-items: center;\n  color: white;\n  border-radius: 2px;\n  font-weight: 500;\n  /* box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);*/\n  height: 24px;\n  font-size: 13px;\n  cursor: pointer;\n  margin-right: 5px;\n  margin-bottom: 4px;\n}\n.device .tasks .task .toolbar .action i {\n  margin-right: 7px;\n}\n.device .tasks .task .toolbar .action span {\n  margin-top: 2px;\n}\n.device .tasks .task .toolbar .dropdown {\n  display: inline-flex;\n  margin-bottom: 4px;\n}\n.device .tasks .task .toolbar .action.dropdown-toggle i {\n  margin: 0;\n}\n.device .tasks .task .toolbar .current-action {\n  flex: 2 1;\n  text-align: right;\n  font-size: 12px;\n}\n.device .tasks .task.on-drag-over {\n  border: 3px dashed #3f51b5;\n  box-shadow: none;\n}\n.device .tasks .task.on-drag-over .content,\n.device .tasks .task.on-drag-over .toolbar {\n  visibility: hidden;\n}\n#root div.jsoneditor-tree div.jsoneditor-tree-inner {\n  padding-bottom: 100px;\n}\n.jsoneditor .inherited-value .jsoneditor-field,\n.jsoneditor .inherited-value .jsoneditor-value {\n  color: #888888;\n}\n.jsoneditor table.jsoneditor-values.inherited-value td .revert {\n  display: none;\n}\n.jsoneditor table.jsoneditor-values:not(.inherited-value) td .revert {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 16px;\n  color: #3f51b5;\n  cursor: pointer;\n}\n.jsoneditor table.jsoneditor-values.new-value td .revert i:before {\n  content: \"\\f00d\";\n}\n#project-manager {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-top: 0;\n  border-bottom: 0;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n#project-manager #projects-toolbar {\n  display: flex;\n  padding: 5px 16px;\n  background: #e8e8e8;\n  justify-content: space-between;\n  z-index: 10;\n}\n#project-manager #projects-toolbar #project-selector span {\n  margin-right: 20px;\n}\n#project-manager #projects-toolbar #project-selector span i {\n  color: #BBB;\n}\n#project-manager #projects-toolbar #project-selector span.active i {\n  color: inherit;\n  cursor: pointer;\n}\n#project-manager #projects-toolbar #project-toolbar {\n  display: flex;\n  flex-direction: row;\n}\n#project-manager #projects-toolbar #project-toolbar #code-version {\n  padding: 0 10px;\n  border-radius: 2px;\n  font-weight: 500;\n  margin-right: 10px;\n  color: #757575;\n  background: #f2f2f2;\n  display: flex;\n  align-items: stretch;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n}\n#project-manager #projects-toolbar #project-toolbar #tb-link {\n  background: #F57C00;\n  color: white;\n  border-radius: 2px;\n  padding: 0 3px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  margin-right: 10px;\n}\n#project-manager #projects-toolbar #project-toolbar #reload-tasks {\n  cursor: pointer;\n}\n#project-manager #projects {\n  overflow-y: hidden;\n  flex: 1 1 auto;\n  height: 100px;\n  background: #FAFAFA;\n  z-index: 10;\n}\n#project-manager #projects .project {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n#project-manager #projects .project .tabs {\n  display: flex;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: none;\n  border-left: none;\n  background: white;\n  flex: 0 0 auto;\n}\n#project-manager #projects .project .tabs div {\n  padding: 16px;\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n  flex: 2 1;\n  text-align: center;\n  font-weight: 300;\n  font-size: 24px;\n  background: rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n}\n#project-manager #projects .project .tabs div:hover {\n  background: rgba(0, 0, 0, 0.025);\n}\n#project-manager #projects .project .tabs div.tab-active,\n#project-manager #projects .project .tabs div.tab-active:hover {\n  background: white;\n}\n#project-manager #projects .project .tabs div:last-child {\n  border: none;\n}\n#project-manager #projects .project .sorting {\n  padding: 5px 16px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n#project-manager #projects .project .sorting > div > * {\n  margin-right: 10px;\n}\n#project-manager #projects .project .sorting > div > .fa,\n#project-manager #projects .project .sorting > div > .fas {\n  cursor: pointer;\n}\n#project-manager #projects .project .sorting .filter-enabled {\n  color: #3f51b5;\n}\n#project-manager #projects .project > .param-filter {\n  border: none;\n}\n#project-manager #projects .project .tab {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n#project-manager #projects .project .params-tab,\n#project-manager #projects .project .tasks-tab {\n  overflow-y: auto;\n  flex: 1 1 auto;\n}\n#project-manager #projects .project .tasks-tab .collapse-toggle {\n  display: flex;\n  justify-content: center;\n  padding: 5px;\n  background: #e5e5e5;\n  font-weight: 300;\n  cursor: pointer;\n}\n#project-manager #projects .project .tasks-tab .param-group > .group-header {\n  padding: 10px;\n  background: #f2f2f2;\n  border: 1px solid #d9d9d9;\n  border-left: 0;\n  cursor: pointer;\n  border-right: 0;\n}\n#project-manager #projects .project .tasks-tab .param-group > .group-header .title {\n  display: flex;\n  align-items: end;\n}\n#project-manager #projects .project .tasks-tab .param-group > .group-header .title i {\n  margin-right: 5px;\n  font-size: 20px;\n}\n#project-manager #projects .project .tasks-tab .param-group .group-tasks {\n  padding-left: 10px;\n  background: #d9d9d9;\n}\n#project-manager #projects .project ul {\n  padding: 0;\n  margin-bottom: 0;\n}\n#project-manager #projects .project ul .item {\n  list-style: none;\n}\n#project-manager #projects .project ul .item-param[draggable=\"true\"] .header {\n  cursor: grab;\n}\n#project-manager #projects .project ul .item-param.on-drag-over {\n  border: 3px dashed #3f51b5;\n  box-shadow: none;\n}\n#project-manager #projects .project ul .item-param.on-drag-over .header {\n  visibility: hidden;\n}\n#project-manager #projects .project ul .item-param .grip-icon {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#project-manager #projects .project ul .item-param .group-header,\n#project-manager #projects .project ul .item-param .header {\n  cursor: pointer;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n#project-manager #projects .project ul .item-param .group-header {\n  background: white;\n  font-weight: 300;\n  justify-content: center;\n  font-size: 24px;\n  padding: 0 0 0 16px;\n  text-transform: uppercase;\n}\n#project-manager #projects .project ul .item-param .header {\n  height: 40px;\n  padding-left: 16px;\n  padding-right: 10px;\n  background: rgba(0, 0, 0, 0.05);\n}\n#project-manager #projects .project ul .item-param .header .title {\n  font-weight: 300;\n  font-size: 18px;\n}\n#project-manager #projects .project ul .item-param .header .toolbar {\n  display: flex;\n  align-items: center;\n}\n#project-manager #projects .project ul .item-task,\n#project-manager #projects .project ul .item-param-value {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  background: white;\n  display: flex;\n}\n#project-manager #projects .project ul .item-task.task-running:not(.item-highlight) {\n  background-image: repeating-linear-gradient(-45deg, #f4f5ff, #f4f5ff 11px, white 10px, white 20px);\n  background-size: 28px 28px;\n  animation: move 2s linear infinite;\n}\n@keyframes move {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 28px 0;\n  }\n}\n#project-manager #projects .project ul .item-task.task-queued:not(.item-highlight) {\n  background-image: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 11px, white 10px, white 20px);\n  background-size: 28px 28px;\n}\n#project-manager #projects .project ul .item-task.item-highlight {\n  animation: highlight 1500ms ease-out;\n}\n@keyframes highlight {\n  0% {\n    background-color: #4f61f4;\n  }\n  100% {\n    background-color: white;\n  }\n}\n#project-manager #projects .project ul .item-param-value.item-abstract {\n  font-style: italic;\n}\n#project-manager #projects .project ul .item-task .content,\n#project-manager #projects .project ul .item-param-value .content {\n  flex: 1 1 auto;\n  padding: 16px;\n}\n#project-manager #projects .project ul .item-task .content .title,\n#project-manager #projects .project ul .item-param-value .content .title {\n  font-weight: 300;\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n#project-manager #projects .project ul .item-task .content .title .try-number,\n#project-manager #projects .project ul .item-param-value .content .title .try-number {\n  background: #ececec;\n  padding: 4px 10px;\n  margin-right: 10px;\n  display: inline-block;\n  line-height: 1;\n  font-size: 20px;\n  vertical-align: top;\n}\n#project-manager #projects .project ul .item-task .content .footer,\n#project-manager #projects .project ul .item-param-value .content .footer {\n  font-size: 14px;\n  font-weight: 300;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 10px;\n  margin-top: 10px;\n}\n#project-manager #projects .project ul .item-task .content .footer .task-error {\n  color: #ef767a;\n  font-weight: 400;\n}\n#project-manager #projects .project ul .item-task .content .footer span:not(.task-error):before {\n  content: \"-\";\n  margin: 0 7px;\n}\n#project-manager #projects .project ul .item-task .content .footer span:first-child:before,\n#project-manager #projects .project ul .item-param-value .content .footer span:first-child:before {\n  content: \"\";\n  margin: 0;\n}\n#project-manager #projects .project ul .item-task .content .footer span span,\n#project-manager #projects .project ul .item-param-value .content .footer span span {\n  font-weight: 400;\n}\n#project-manager #projects .project ul .item-task .toolbar,\n#project-manager #projects .project ul .item-param-value .toolbar {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 10px;\n  background: #f2f2f2;\n  display: flex;\n  flex-direction: column;\n}\n#project-manager #projects .project ul .item .toolbar .action {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #3f51b5;\n  border-radius: 2px;\n  cursor: pointer;\n  color: white;\n  font-size: 12px;\n}\n#project-manager #projects .project ul .item .toolbar .action.action-disabled {\n  cursor: not-allowed;\n  background: gray;\n}\n#project-manager #projects .project ul .item-task .toolbar .action,\n#project-manager #projects .project ul .item-param-value .toolbar .action {\n  margin-bottom: 4px;\n}\n#project-manager #projects .project ul .item-param .header .toolbar .action {\n  margin-left: 4px;\n}\n.tasks .task .toolbar .action.dropdown-toggle,\n#project-manager #projects .project ul .item-task .toolbar .action.dropdown-toggle,\n#project-manager #projects .project ul .item-param-value .toolbar .action.dropdown-toggle {\n  margin: 0;\n}\n#project-manager #projects .project ul .item-task .toolbar .action.dropdown-toggle,\n#project-manager #projects .project ul .item-param-value .toolbar .action.dropdown-toggle {\n  height: 14px;\n}\n.tasks .task .toolbar .action.dropdown-toggle:after,\n#project-manager #projects .project ul .item-task .toolbar .action.dropdown-toggle:after,\n#project-manager #projects .project ul .item-param-value .toolbar .action.dropdown-toggle:after {\n  display: none;\n}\n.tasks .task .toolbar .dropdown-menu,\n#project-manager #projects .project ul .item-task .toolbar .dropdown-menu,\n#project-manager #projects .project ul .item-param-value .toolbar .dropdown-menu {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  min-width: auto;\n  padding: 7px;\n  border: 1px solid #E3E3E3;\n  border-radius: 0;\n  margin-top: 5px;\n}\n.tasks .task .toolbar .dropdown-menu {\n  left: -42px !important;\n}\n#project-manager #projects .project ul .item .toolbar .dropdown-menu {\n  left: 4px !important;\n}\n.tasks .task .toolbar .dropdown-menu:after,\n#project-manager #projects .project ul .item .toolbar .dropdown-menu:after {\n  content: \" \";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -8px;\n  border: 10px solid transparent;\n  border-bottom-color: white;\n}\n.tasks .task .toolbar .dropdown-menu .action:last-child,\n#project-manager #projects .project ul .item .toolbar .dropdown-menu .action:last-child {\n  margin: 0;\n}\n#project-manager #projects .project .tab-toolbar {\n  display: flex;\n  padding: 5px 16px;\n  background: rgba(158, 158, 158, 0.2);\n  flex-direction: row;\n  justify-content: space-between;\n  flex: 0 0 auto;\n}\n#project-manager #projects .project .tab-toolbar label {\n  margin-bottom: 0;\n  display: flex;\n  align-items: center;\n}\n#project-manager #projects .project .tab-toolbar label input {\n  margin-right: 10px;\n}\n#project-manager #projects .project .tab-toolbar .buttons div:last-child {\n  margin-right: 0;\n}\n.prompt-wrapper {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 100;\n}\n.prompt-wrapper .prompt {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: white;\n  max-width: 300px;\n  border-radius: 2px;\n}\n.prompt-wrapper .prompt.param-prompt {\n  max-width: 600px;\n  width: 600px;\n}\n.prompt-wrapper .prompt .prompt-header {\n  background: #3f51b5;\n  padding: 5px 16px;\n  color: white;\n}\n.prompt-wrapper .prompt .prompt-text {\n  font-size: 14px;\n  padding: 16px;\n  padding-bottom: 0;\n}\n.prompt-wrapper .prompt > input,\n.prompt-wrapper .prompt > select {\n  margin: 10px 16px 0 16px;\n  text-align: right;\n  width: calc(100% - 32px);\n}\n.prompt-wrapper .jsoneditor {\n  width: calc(100% - 32px);\n  margin: 10px 16px 16px 16px;\n  height: 250px;\n  border-color: #3f51b5;\n}\n.prompt-wrapper .jsoneditor div.jsoneditor-menu {\n  background-color: #3f51b5;\n  border-color: #3f51b5;\n}\n.editor .buttons,\n.prompt-wrapper .prompt .buttons {\n  display: flex;\n  justify-content: flex-end;\n  margin: 16px 16px 16px 16px;\n}\n.prompt-wrapper .prompt .param-filter .param-name {\n  cursor: pointer;\n}\n.editor.task-editor {\n  flex: 1 1;\n}\n.editor .header {\n  padding: 5px 16px;\n  background: rgba(158, 158, 158, 0.2);\n}\n.editor .field {\n  margin: 10px 16px;\n}\n.editor .param-filter {\n  margin: 30px 16px;\n}\n.editor .field {\n  display: flex;\n  align-items: center;\n  justify-content: stretch;\n}\n.editor .field label {\n  margin: 0;\n  width: 150px;\n}\n.editor .field input,\n.editor .field select {\n  flex: 2 1;\n  padding-left: 5px;\n}\n.editor .field input[type=\"checkbox\"] {\n  flex: none;\n}\n.editor .jsoneditor {\n  width: calc(100% - 32px);\n  resize: vertical;\n  margin: 16px;\n  height: 250px;\n  border-color: #3f51b5;\n}\n.editor .jsoneditor-readOnly .jsoneditor {\n  border-color: rgba(158, 158, 158, 0.2);\n  height: auto;\n}\n.editor .jsoneditor-readOnly .ace-jsoneditor .ace_marker-layer .ace_active-line,\n.editor .jsoneditor-readOnly .ace-jsoneditor .ace_gutter-active-line {\n  background-color: inherit;\n}\n.editor .jsoneditor-readOnly .ace-jsoneditor .ace_scroller {\n  background-color: rgba(158, 158, 158, 0.1);\n}\n.editor .jsoneditor-readOnly .ace_cursor-layer {\n  display: none;\n}\n.editor .editor-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 250px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin: 16px;\n}\n.editor .jsoneditor div.jsoneditor-menu {\n  background-color: #3f51b5;\n  border-color: #3f51b5;\n}\n.task-editor .command {\n  cursor: pointer;\n}\n.slide-editor {\n  position: absolute;\n  width: 400px;\n  left: -400px;\n  top: 0;\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n  background: #fafafa;\n  height: 100%;\n  animation: slide-in 0.4s ease;\n  overflow-y: auto;\n}\n@keyframes slide-in {\n  0% {\n    transform: translateX(400px);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n.slide-editor .header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n}\n.slide-editor .header i {\n  padding: 2px 10px;\n  margin: -2px -10px;\n}\n.task-viewer .title,\n.task-viewer .metadata,\n.task-viewer h2,\n.task-viewer .notes,\n.task-viewer .params,\n.task-viewer .checkpoints {\n  margin: 10px 16px;\n}\n.task-viewer .title {\n  font-weight: 300;\n  font-size: 24px;\n}\n.task-viewer .title .try-number {\n  background: rgba(158, 158, 158, 0.2);\n  padding: 4px 10px;\n  margin-right: 10px;\n  display: inline-block;\n  line-height: 1;\n  font-size: 20px;\n  vertical-align: top;\n}\n.task-viewer .metadata,\n.task-viewer .params {\n  font-weight: 300;\n}\n.task-viewer .metadata div,\n.task-viewer .params div {\n  margin-bottom: 5px;\n}\n.task-viewer .metadata div:first-child {\n  margin: 10px 0;\n}\n.task-viewer .metadata div span,\n.task-viewer .params div span {\n  font-weight: 400;\n  display: inline-block;\n  width: 150px;\n}\n.task-viewer h2 {\n  font-weight: 300;\n  font-size: 24px;\n}\n.task-viewer .checkpoints {\n  max-height: 300px;\n  overflow: auto;\n}\n.task-viewer .checkpoints > div {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin-bottom: 5px;\n  align-items: center;\n}\n.task-viewer .checkpoints > div .iteration {\n  background: rgba(158, 158, 158, 0.2);\n}\n.task-viewer .checkpoints > div .action {\n  background: #3f51b5;\n  cursor: pointer;\n  color: white;\n}\n.task-viewer .checkpoints > div .iteration,\n.task-viewer .checkpoints > div .action {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.task-viewer .checkpoints > div .time {\n  font-weight: 300;\n}\n.task-viewer textarea {\n  min-height: 150px;\n  width: 100%;\n}\n.code-version-viewer {\n  display: flex;\n  flex-direction: column;\n}\n.code-version-viewer .code-versions {\n  overflow: auto;\n}\n.code-version-viewer .code-versions .code-version-row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.code-version-viewer .code-versions .code-version-row .code-version-branch-arrow {\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.code-version-viewer .code-versions .code-version {\n  background: rgba(158, 158, 158, 0.1);\n  margin: 5px 0;\n  max-width: 300px;\n  border-radius: 5px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  flex: 1 1 auto;\n}\n.code-version-viewer .code-versions .code-version.current-code-version {\n  background: #3f51b5;\n  color: white;\n}\n.code-version-viewer .code-versions .code-version .name {\n  background: rgba(0, 0, 0, 0.05);\n  font-weight: 300;\n  padding: 5px 16px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n.code-version-viewer .code-versions .code-version .time {\n  font-size: 12px;\n  text-align: center;\n  padding: 2px 0;\n}\n.code-version-viewer .code-versions .arrow {\n  text-align: center;\n  font-size: 20px;\n}\n.param-viewer label {\n  display: flex;\n  align-items: center;\n  margin: 10px 16px;\n}\n.param-viewer label input {\n  margin-right: 10px;\n}\n.param-viewer .param-filter {\n  margin: 10px 16px;\n  max-height: none;\n}\n#flash-messages {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 10;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n#flash-messages .flash-message {\n  opacity: 1;\n  background: #3f51b5;\n  border-radius: 0 2px 2px 0;\n  color: white;\n  padding: 5px 10px;\n  max-width: 400px;\n  display: inline-block;\n  height: 26px;\n  margin-top: 10px;\n  transition: margin 0.4s;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font-size: 14px;\n  font-weight: 300;\n}\n#flash-messages .flash-message:hover {\n  opacity: 1;\n}\n#flash-messages .flash-message.level-40 {\n  background: #ef767a;\n}\n#flash-messages .flash-message.level-30 {\n  background: #eeb868;\n}\n#controlbar {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  background: rgba(158, 158, 158, 0.4);\n  color: white;\n}\n#controlbar > .container {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n}\n#controlbar > .container #title {\n  background: #3f51b5;\n  font-size: 24px;\n  padding: 7px 10px;\n  font-weight: 400;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  margin: 0 50px 0 0;\n}\n#controlbar > .container .action {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 2px;\n  cursor: pointer;\n  font-size: 14px;\n  background: #3f51b5;\n  margin-right: 10px;\n}\n.param-filter {\n  border: 1px solid rgba(158, 158, 158, 0.2);\n  border-bottom: none;\n  max-height: 350px;\n  overflow: auto;\n}\n.param-filter .param-name {\n  background: rgba(158, 158, 158, 0.05);\n  padding: 5px 10px;\n  display: flex;\n  overflow: hidden;\n  justify-content: space-between;\n}\n.param-filter .param-name.param-name-selected {\n  background: #3f51b5;\n  color: white;\n}\n.param-filter .param-name i {\n  cursor: pointer;\n}\n.param-filter .param-name.param-name-collapsed {\n  border-bottom: 1px solid rgba(158, 158, 158, 0.2);\n}\n.param-filter .param-name.param-name-expanded {\n  justify-content: space-between;\n}\n.param-filter .param-name .param-value-hint,\n.param-filter .param-name .all-button {\n  border-radius: 2px;\n  font-weight: 600;\n  padding: 0 5px;\n  background: #ececec;\n}\n.param-filter .param-name .param-value-hint {\n  margin-left: 10px;\n}\n.param-filter .param-name .all-button {\n  cursor: pointer;\n}\n.param-filter .param-name .all-button.all-button-activated {\n  background: #3f51b5;\n  color: white;\n}\n.param-filter .param-values {\n  border-top: 1px solid rgba(158, 158, 158, 0.2);\n  border-bottom: 1px solid rgba(158, 158, 158, 0.2);\n  overflow-y: auto;\n}\n.param-filter .param-values .param-value {\n  padding: 10px;\n  white-space: nowrap;\n}\n.param-filter .param-values .param-value {\n  background: white;\n  cursor: pointer;\n}\n.param-filter .param-values .param-value-selected.param-value {\n  background: #3f51b5;\n  color: white;\n}\n.param-filter .param-values {\n  display: flex;\n}\n.param-filter .param-values .param-value {\n  border-right: 1px solid rgba(158, 158, 158, 0.2);\n}\n.param-filter .param-values .param-value.param-value-default {\n  font-weight: 500;\n}\n.param-filter .param-values .param-value .task-numbers {\n  margin-left: 10px;\n  background: #ededed;\n  border-radius: 2px;\n  color: #1c1c1c;\n  font-weight: 300;\n  padding: 0 2px;\n}\n.param-filter .param-values .param-value input {\n  padding: 0;\n  border: 1px solid rgba(158, 158, 158, 0.2);\n}\n.param-filter .group-header {\n  cursor: pointer;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background: white;\n  font-weight: 300;\n  justify-content: center;\n  font-size: 24px;\n  padding: 0 0 0 16px;\n  text-transform: uppercase;\n}\n.param-viewer > input {\n  width: calc(100% - 32px);\n  margin: 10px 16px;\n  display: flex;\n}\n.param-viewer .table-cols {\n  display: flex;\n}\n.param-viewer .table-cols .table-col {\n  flex: 1 1;\n  margin: 10px;\n}\n.param-viewer .table-cols .table-col .table-col-entry {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  margin: 5px 0;\n  padding: 5px;\n  display: flex;\n  align-items: center;\n  cursor: grab;\n}\n.param-viewer .table-cols .table-col .table-col-dummy {\n  height: 30px;\n  margin: 5px 0;\n}\n.param-viewer .table-cols .table-col .table-col-dummy.on-drag-over,\n.param-viewer .table-cols .table-col .table-col-entry.on-drag-over {\n  border: 3px dashed #3f51b5;\n  box-shadow: none;\n}\n.param-viewer .table-cols .table-col .table-col-entry i {\n  margin-left: 5px;\n  cursor: pointer;\n}\n.param-viewer .table-cols .table-col .table-col-entry div {\n  flex: 2 1;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/fonts/fonts.css":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/fonts/fonts.css ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./Roboto-300-cyrillic-ext1.woff2 */ "./src/fonts/Roboto-300-cyrillic-ext1.woff2"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./Roboto-300-cyrillic2.woff2 */ "./src/fonts/Roboto-300-cyrillic2.woff2"));
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ./Roboto-300-greek-ext3.woff2 */ "./src/fonts/Roboto-300-greek-ext3.woff2"));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! ./Roboto-300-greek4.woff2 */ "./src/fonts/Roboto-300-greek4.woff2"));
var ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(/*! ./Roboto-300-vietnamese5.woff2 */ "./src/fonts/Roboto-300-vietnamese5.woff2"));
var ___CSS_LOADER_URL___5___ = urlEscape(__webpack_require__(/*! ./Roboto-300-latin-ext6.woff2 */ "./src/fonts/Roboto-300-latin-ext6.woff2"));
var ___CSS_LOADER_URL___6___ = urlEscape(__webpack_require__(/*! ./Roboto-300-latin7.woff2 */ "./src/fonts/Roboto-300-latin7.woff2"));
var ___CSS_LOADER_URL___7___ = urlEscape(__webpack_require__(/*! ./Roboto-400-cyrillic-ext8.woff2 */ "./src/fonts/Roboto-400-cyrillic-ext8.woff2"));
var ___CSS_LOADER_URL___8___ = urlEscape(__webpack_require__(/*! ./Roboto-400-cyrillic9.woff2 */ "./src/fonts/Roboto-400-cyrillic9.woff2"));
var ___CSS_LOADER_URL___9___ = urlEscape(__webpack_require__(/*! ./Roboto-400-greek-ext10.woff2 */ "./src/fonts/Roboto-400-greek-ext10.woff2"));
var ___CSS_LOADER_URL___10___ = urlEscape(__webpack_require__(/*! ./Roboto-400-greek11.woff2 */ "./src/fonts/Roboto-400-greek11.woff2"));
var ___CSS_LOADER_URL___11___ = urlEscape(__webpack_require__(/*! ./Roboto-400-vietnamese12.woff2 */ "./src/fonts/Roboto-400-vietnamese12.woff2"));
var ___CSS_LOADER_URL___12___ = urlEscape(__webpack_require__(/*! ./Roboto-400-latin-ext13.woff2 */ "./src/fonts/Roboto-400-latin-ext13.woff2"));
var ___CSS_LOADER_URL___13___ = urlEscape(__webpack_require__(/*! ./Roboto-400-latin14.woff2 */ "./src/fonts/Roboto-400-latin14.woff2"));
var ___CSS_LOADER_URL___14___ = urlEscape(__webpack_require__(/*! ./Roboto-500-cyrillic-ext15.woff2 */ "./src/fonts/Roboto-500-cyrillic-ext15.woff2"));
var ___CSS_LOADER_URL___15___ = urlEscape(__webpack_require__(/*! ./Roboto-500-cyrillic16.woff2 */ "./src/fonts/Roboto-500-cyrillic16.woff2"));
var ___CSS_LOADER_URL___16___ = urlEscape(__webpack_require__(/*! ./Roboto-500-greek-ext17.woff2 */ "./src/fonts/Roboto-500-greek-ext17.woff2"));
var ___CSS_LOADER_URL___17___ = urlEscape(__webpack_require__(/*! ./Roboto-500-greek18.woff2 */ "./src/fonts/Roboto-500-greek18.woff2"));
var ___CSS_LOADER_URL___18___ = urlEscape(__webpack_require__(/*! ./Roboto-500-vietnamese19.woff2 */ "./src/fonts/Roboto-500-vietnamese19.woff2"));
var ___CSS_LOADER_URL___19___ = urlEscape(__webpack_require__(/*! ./Roboto-500-latin-ext20.woff2 */ "./src/fonts/Roboto-500-latin-ext20.woff2"));
var ___CSS_LOADER_URL___20___ = urlEscape(__webpack_require__(/*! ./Roboto-500-latin21.woff2 */ "./src/fonts/Roboto-500-latin21.woff2"));
var ___CSS_LOADER_URL___21___ = urlEscape(__webpack_require__(/*! ./Roboto-700-cyrillic-ext22.woff2 */ "./src/fonts/Roboto-700-cyrillic-ext22.woff2"));
var ___CSS_LOADER_URL___22___ = urlEscape(__webpack_require__(/*! ./Roboto-700-cyrillic23.woff2 */ "./src/fonts/Roboto-700-cyrillic23.woff2"));
var ___CSS_LOADER_URL___23___ = urlEscape(__webpack_require__(/*! ./Roboto-700-greek-ext24.woff2 */ "./src/fonts/Roboto-700-greek-ext24.woff2"));
var ___CSS_LOADER_URL___24___ = urlEscape(__webpack_require__(/*! ./Roboto-700-greek25.woff2 */ "./src/fonts/Roboto-700-greek25.woff2"));
var ___CSS_LOADER_URL___25___ = urlEscape(__webpack_require__(/*! ./Roboto-700-vietnamese26.woff2 */ "./src/fonts/Roboto-700-vietnamese26.woff2"));
var ___CSS_LOADER_URL___26___ = urlEscape(__webpack_require__(/*! ./Roboto-700-latin-ext27.woff2 */ "./src/fonts/Roboto-700-latin-ext27.woff2"));
var ___CSS_LOADER_URL___27___ = urlEscape(__webpack_require__(/*! ./Roboto-700-latin28.woff2 */ "./src/fonts/Roboto-700-latin28.woff2"));

// Module
exports.push([module.i, "/* cyrillic-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___0___ + ") format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___1___ + ") format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___2___ + ") format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___3___ + ") format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___4___ + ") format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___5___ + ") format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Light'), local('Roboto-Light'), url(" + ___CSS_LOADER_URL___6___ + ") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n/* cyrillic-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___7___ + ") format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___8___ + ") format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___9___ + ") format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___10___ + ") format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___11___ + ") format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___12___ + ") format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(" + ___CSS_LOADER_URL___13___ + ") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n/* cyrillic-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___14___ + ") format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___15___ + ") format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___16___ + ") format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___17___ + ") format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___18___ + ") format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___19___ + ") format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Medium'), local('Roboto-Medium'), url(" + ___CSS_LOADER_URL___20___ + ") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n/* cyrillic-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___21___ + ") format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___22___ + ") format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___23___ + ") format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___24___ + ") format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___25___ + ") format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___26___ + ") format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 700;\n  src: local('Roboto Bold'), local('Roboto-Bold'), url(" + ___CSS_LOADER_URL___27___ + ") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n", ""]);



/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_dist_js_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/js/bootstrap.js */ "./node_modules/bootstrap/dist/js/bootstrap.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_js_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css");
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Scheduler */ "./src/Scheduler.js");
/* harmony import */ var _ProjectManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProjectManager */ "./src/ProjectManager.js");
/* harmony import */ var _FlashMessageManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FlashMessageManager */ "./src/FlashMessageManager.js");
/* harmony import */ var _ControlBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ControlBar */ "./src/ControlBar.js");
/* harmony import */ var reconnecting_eventsource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reconnecting-eventsource */ "./node_modules/reconnecting-eventsource/lib/index.js");
/* harmony import */ var reconnecting_eventsource__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(reconnecting_eventsource__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Repository */ "./src/Repository.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/App.js";











class App extends react__WEBPACK_IMPORTED_MODULE_3___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      noConnection: true,
      devices: []
    };
    this.evtSource = new reconnecting_eventsource__WEBPACK_IMPORTED_MODULE_8___default.a("/update", {});
    this.repository = new _Repository__WEBPACK_IMPORTED_MODULE_9__["default"](this.evtSource);
    this.projectManagerRef = react__WEBPACK_IMPORTED_MODULE_3___default.a.createRef();
    this.refreshConnectionState = this.refreshConnectionState.bind(this);
    this.evtSource.onerror = this.refreshConnectionState;
    this.evtSource.onopen = this.refreshConnectionState;
    this.state.noConnection = this.evtSource.readyState === 0;
    this.evtSource.addEventListener("SCHEDULER_OPTIONS", e => {
      const options = JSON.parse(e.data);
      this.setState({
        devices: options.devices
      });
    });
  }

  refreshConnectionState() {
    this.setState({
      noConnection: this.evtSource.readyState === 0
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      id: "page",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FlashMessageManager__WEBPACK_IMPORTED_MODULE_6__["default"], {
      evtSource: this.evtSource,
      noConnection: this.state.noConnection,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "row",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "col-sm-8",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Scheduler__WEBPACK_IMPORTED_MODULE_4__["default"], {
      devices: this.state.devices,
      evtSource: this.evtSource,
      repository: this.repository,
      highlightTask: task => this.projectManagerRef.current.highlightTask(task),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: "col-sm-4",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ProjectManager__WEBPACK_IMPORTED_MODULE_5__["default"], {
      devices: this.state.devices,
      evtSource: this.evtSource,
      ref: this.projectManagerRef,
      repository: this.repository,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    })))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ControlBar__WEBPACK_IMPORTED_MODULE_7__["default"], {
      evtSource: this.evtSource,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/CodeVersionViewer.js":
/*!**********************************!*\
  !*** ./src/CodeVersionViewer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/CodeVersionViewer.js";


class CodeVersionViewer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      choices: {},
      newName: ""
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onNewNameChange = this.onNewNameChange.bind(this);
    this.addCodeVersion = this.addCodeVersion.bind(this);
    this.selectCodeVersion = this.selectCodeVersion.bind(this);
    this.selectCodeVersion = this.selectCodeVersion.bind(this);
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  onNewNameChange(event) {
    this.setState({
      newName: event.target.value
    });
  }

  addCodeVersion() {
    fetch("/add_code_version/" + this.state.newName).then(res => res.json()).then(result => {}, error => {});
    this.setState({
      newName: ""
    });
  }

  selectCodeVersion(code_version) {
    fetch("/select_code_version/" + code_version).then(res => res.json()).then(result => {}, error => {});
  }

  findCodeVersionInTree(tree, code_version_uuid) {
    if (tree.uuid === code_version_uuid) {
      return tree;
    } else {
      for (let child of tree.children) {
        const found = this.findCodeVersionInTree(child, code_version_uuid);
        if (found !== null) return found;
      }
    }

    return null;
  }

  selectBranch(codeVersion, child_index) {
    let choices = Object.assign({}, this.state.choices);
    choices[codeVersion.uuid] = child_index;
    this.setState({
      choices: choices
    });
  }

  render() {
    if (this.state.open && this.props.codeVersionTree !== null) {
      let selectedNode = this.findCodeVersionInTree(this.props.codeVersionTree, this.props.currentCodeVersion);
      let choicesToSelected = {};

      while (selectedNode.base !== null) {
        if (selectedNode.base.children.length > 0) choicesToSelected[selectedNode.base.uuid] = selectedNode.base.children.findIndex(x => x === selectedNode);
        selectedNode = selectedNode.base;
      }

      let codeVersions = [{
        "version": this.props.codeVersionTree,
        "child_index": 0,
        "total_children": 1
      }];
      let currentCodeVersion = this.props.codeVersionTree;

      while (currentCodeVersion.children.length > 0) {
        let index = 0;

        if (currentCodeVersion.uuid in this.state.choices) {
          index = this.state.choices[currentCodeVersion.uuid];
        } else if (currentCodeVersion.uuid in choicesToSelected) {
          index = choicesToSelected[currentCodeVersion.uuid];
        }

        codeVersions.push({
          "version": currentCodeVersion.children[index],
          "child_index": index,
          "total_children": currentCodeVersion.children.length
        });
        currentCodeVersion = currentCodeVersion.children[index];
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-version-viewer slide-editor editor",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, "Code versions", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        class: "fas fa-times",
        onClick: this.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-versions",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, codeVersions.map((entry, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-version-row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, entry.child_index > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-version-branch-arrow",
        onClick: () => this.selectBranch(entry.version.base, entry.child_index - 1),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-chevron-left",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-version-branch-arrow",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.currentCodeVersion === entry.version.uuid ? "code-version current-code-version" : "code-version",
        onClick: () => this.selectCodeVersion(entry.version.uuid),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, entry.version.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "time",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, entry.version.time.toShortStr())), entry.child_index < entry.total_children - 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-version-branch-arrow",
        onClick: () => this.selectBranch(entry.version.base, entry.child_index + 1),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-chevron-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: this
      })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-version-branch-arrow",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      })), i < codeVersions.length - 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "arrow",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-long-arrow-alt-down",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 147
        },
        __self: this
      }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          "flex": "1 1 0"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, "Add code version"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, "Name:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        value: this.state.newName,
        onChange: this.onNewNameChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.addCodeVersion,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, "Add")));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (CodeVersionViewer);

/***/ }),

/***/ "./src/CollapsedTasks.js":
/*!*******************************!*\
  !*** ./src/CollapsedTasks.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Prompt */ "./src/Prompt.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _ReassuringPrompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReassuringPrompt */ "./src/ReassuringPrompt.js");
/* harmony import */ var _PausedTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PausedTask */ "./src/PausedTask.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/CollapsedTasks.js";







class CollapsedTasks extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let tasks = Object.values(this.props.tasks).filter(task => task.task !== null);

    if (tasks.length > 0) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PausedTask__WEBPACK_IMPORTED_MODULE_5__["default"], {
        rerunTask: this.props.rerunTask,
        key: tasks[0].task.uuid,
        task: tasks[0].task,
        name: tasks[0].name,
        showTask: this.props.showTask,
        highlight: tasks[0].task.uuid === this.props.highlightedTask,
        filterLikeTask: this.props.filterLikeTask,
        devices: this.props.devices,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }), tasks.length > 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        class: "collapse-toggle",
        onClick: this.toggleCollapsed,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, this.state.collapsed ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-angle-double-down",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }), " ", "Expand (" + tasks.length + ")") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-angle-double-up",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }), " Collapse")), !this.state.collapsed && tasks.slice(1).map(task => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PausedTask__WEBPACK_IMPORTED_MODULE_5__["default"], {
        rerunTask: this.props.rerunTask,
        key: task.task.uuid,
        task: task.task,
        name: task.name,
        showTask: this.props.showTask,
        highlight: task.task.uuid === this.props.highlightedTask,
        filterLikeTask: this.props.filterLikeTask,
        devices: this.props.devices,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      })));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (CollapsedTasks);

/***/ }),

/***/ "./src/ConfigEditor.js":
/*!*****************************!*\
  !*** ./src/ConfigEditor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _JsonEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JsonEditor */ "./src/JsonEditor.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ConfigEditor.js";



class ConfigEditor extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      inheritedConfig: {},
      loadedUrl: null,
      dataJsonString: ''
    };
    this.jsonEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url || JSON.stringify(prevProps.bases) !== JSON.stringify(this.props.bases)) this.reload();
  }

  componentDidMount() {
    this.setState({
      loadedUrl: null
    });
    this.reload();
  }

  reload() {
    if (this.props.url === "") {
      if (this.state.loadedUrl !== this.props.url) {
        this.setState({
          config: {},
          inheritedConfig: {},
          loadedUrl: this.props.url
        });
        if (this.jsonEditor.current !== null) this.jsonEditor.current.updateEditor();
      }
    } else {
      var dataJson = {};
      dataJson['bases'] = this.props.bases;
      let dataJsonString = JSON.stringify(dataJson);

      if (this.state.loadedUrl !== this.props.url || this.state.dataJsonString !== dataJsonString) {
        var data = new FormData();
        data.append("data", dataJsonString);
        fetch(this.props.url, {
          method: "POST",
          body: data
        }).then(res => res.json()).then(result => {
          this.setState({
            inheritedConfig: result['inherited_config'],
            config: result['config'] !== null ? result['config'] : this.state.config,
            loadedUrl: this.props.url,
            dataJsonString: dataJsonString
          });
          this.jsonEditor.current.updateEditor();
          if (this.props.onDynamicChange !== undefined) this.props.onDynamicChange(result['dynamic']);
        }, error => {});
      }
    }
  }

  onChange(data) {
    this.setState({
      config: data
    });
  }

  render() {
    if (this.state.loadedUrl === this.props.url) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_JsonEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ref: this.jsonEditor,
      json: this.state.config,
      inheritedJson: this.state.inheritedConfig,
      onChange: this.onChange,
      options: this.props.preview ? {
        mode: 'code',
        modes: ['code'],
        readOnly: true,
        mainMenuBar: false,
        statusBar: false
      } : {},
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    });else return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "editor-loading",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-sync fa-spin fa-2x",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ConfigEditor);

/***/ }),

/***/ "./src/ControlBar.js":
/*!***************************!*\
  !*** ./src/ControlBar.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ControlBar.js";


class ControlBar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.openGlobalLog = this.openGlobalLog.bind(this);
    this.pauseAll = this.pauseAll.bind(this);
  }

  openGlobalLog() {
    window.open("/log", '_blank');
  }

  pauseAll() {
    fetch("/pause_all/").then(res => res.json()).then(result => {}, error => {});
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "controlbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      id: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, "TaskPlan"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.pauseAll,
      title: "Pause all running tasks",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-pause",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.openGlobalLog,
      title: "Open the global log",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-file-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ControlBar);

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
    this.disconnect = this.disconnect.bind(this);
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

/***/ }),

/***/ "./src/FlashMessageManager.js":
/*!************************************!*\
  !*** ./src/FlashMessageManager.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/FlashMessageManager.js";


class FlashMessage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "state" in props ? props.state : 0
    };
  }

  render() {
    let style = {};
    if (this.state.state === 0) style = {
      marginLeft: -400
    };else if (this.state.state === 1) style = {
      marginLeft: 0
    };else if (this.state.state === 2) style = {
      marginLeft: 0,
      marginTop: -26
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: 'flash-message level-' + this.props.flashMessage.level,
      style: style,
      title: this.props.flashMessage.message,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, this.props.flashMessage.short);
  }

}

class FlashMessageManager extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMessages: []
    };
    this.flashMessagesRefs = [];
    this.nextId = 0;
    var fm = this;
    this.props.evtSource.addEventListener("FLASH_MESSAGE", function (e) {
      const flashMessages = fm.state.flashMessages.slice();
      const newFlashMessage = JSON.parse(e.data);
      newFlashMessage.id = fm.nextId++;
      flashMessages.push(newFlashMessage);
      fm.flashMessagesRefs.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());
      let flashMessageRef = fm.flashMessagesRefs[fm.flashMessagesRefs.length - 1];
      setTimeout(() => fm.nextState(flashMessageRef), 100);
      fm.setState({
        flashMessages: flashMessages
      });
    });
  }

  nextState(flashMessage) {
    if (flashMessage.current.state.state === 0) {
      flashMessage.current.setState({
        state: 1
      });
      setTimeout(() => this.nextState(flashMessage), 10000);
    } else if (flashMessage.current.state.state === 1) {
      flashMessage.current.setState({
        state: 2
      });
      setTimeout(() => this.nextState(flashMessage), 1000);
    } else if (flashMessage.current.state.state === 2) {
      const flashMessages = this.state.flashMessages.slice();
      const messageIndex = this.flashMessagesRefs.findIndex(function (e) {
        return e === flashMessage;
      });
      flashMessages.splice(messageIndex, 1);
      this.flashMessagesRefs.splice(messageIndex, 1);
      this.setState({
        flashMessages: flashMessages
      });
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "flash-messages",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81
      },
      __self: this
    }, this.state.flashMessages.map((flashMessage, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FlashMessage, {
      key: flashMessage.id,
      flashMessage: flashMessage,
      ref: this.flashMessagesRefs[index],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83
      },
      __self: this
    })), this.props.noConnection && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FlashMessage, {
      key: "-1",
      flashMessage: {
        "short": "No connection to server",
        "level": "40"
      },
      state: "1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (FlashMessageManager);

/***/ }),

/***/ "./src/Global.js":
/*!***********************!*\
  !*** ./src/Global.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var State = {
  INIT: 0,
  QUEUED: 1,
  RUNNING: 2,
  STOPPED: 3
};

Date.prototype.toShortStr = function () {
  function pad(n) {
    n = parseInt(n);
    return n < 10 ? "0" + n : n;
  }

  return this.getDate() + "." + (this.getMonth() + 1) + " - " + pad(this.getHours()) + ":" + pad(this.getMinutes());
};

/* harmony default export */ __webpack_exports__["default"] = (State);

/***/ }),

/***/ "./src/GroupedTasks.js":
/*!*****************************!*\
  !*** ./src/GroupedTasks.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Prompt */ "./src/Prompt.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _ReassuringPrompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReassuringPrompt */ "./src/ReassuringPrompt.js");
/* harmony import */ var _PausedTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PausedTask */ "./src/PausedTask.js");
/* harmony import */ var _CollapsedTasks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CollapsedTasks */ "./src/CollapsedTasks.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/GroupedTasks.js";








class GroupedTasks extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: {}
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed(group) {
    let collapsed = Object.assign({}, this.state.collapsed);
    if (!(group in collapsed)) collapsed[group] = true;else collapsed[group] = !collapsed[group];
    this.setState({
      collapsed: collapsed
    });
  }

  render() {
    if (Object.values(this.props.tasks).length > 0) {
      if (this.props.tasks instanceof Array) {
        console.log(this.props.tasks);
        return this.props.tasks.map((tasks, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CollapsedTasks__WEBPACK_IMPORTED_MODULE_6__["default"], {
          tasks: tasks,
          key: tasks[0] !== null ? tasks[0].uuid : i,
          rerunTask: this.rerunTask,
          showTask: this.props.showTask,
          filterLikeTask: this.props.filterLikeTask,
          devices: this.props.devices,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }));
      } else {
        return Object.keys(this.props.tasks).sort((a, b) => a.localeCompare(b)).map(group => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: group,
          className: "param-group",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "group-header",
          onClick: () => this.toggleCollapsed(group),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "title",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          },
          __self: this
        }, !(group in this.state.collapsed) || !this.state.collapsed[group] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-caret-down",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-caret-right",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        }), group)), (!(group in this.state.collapsed) || !this.state.collapsed[group]) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "group-tasks",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GroupedTasks, {
          tasks: this.props.tasks[group],
          rerunTask: this.props.rerunTask,
          showTask: this.props.showTask,
          filterLikeTask: this.props.filterLikeTask,
          devices: this.props.devices,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 63
          },
          __self: this
        }))));
      }
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (GroupedTasks);

/***/ }),

/***/ "./src/JsonEditor.js":
/*!***************************!*\
  !*** ./src/JsonEditor.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isEqual */ "./node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jsoneditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jsoneditor */ "./node_modules/jsoneditor/index.js");
/* harmony import */ var jsoneditor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jsoneditor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jsoneditor_react_es_editor_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jsoneditor-react/es/editor.min.css */ "./node_modules/jsoneditor-react/es/editor.min.css");
/* harmony import */ var jsoneditor_react_es_editor_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jsoneditor_react_es_editor_min_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var brace__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! brace */ "./node_modules/brace/index.js");
/* harmony import */ var brace__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(brace__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var brace_mode_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! brace/mode/json */ "./node_modules/brace/mode/json.js");
/* harmony import */ var brace_mode_json__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(brace_mode_json__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/JsonEditor.js";










var stringify = __webpack_require__(/*! json-stable-stringify */ "./node_modules/json-stable-stringify/index.js");

var Node = __webpack_require__(/*! jsoneditor/src/js/Node */ "./node_modules/jsoneditor/src/js/Node.js");

var originalUpdateDom = Node.prototype.updateDom;

Node.prototype.updateDom = function (options) {
  originalUpdateDom.call(this, options);
  var tdRevert = this.dom.tdRevert;

  if (!tdRevert && this.dom && this.dom.tr && this.fieldEditable && (this.type === "auto" || this.type === "array" || this.type === "string")) {
    tdRevert = document.createElement('td');
    this.dom.tdRevert = tdRevert;
    this.dom.tdValue.parentNode.appendChild(tdRevert);
    var icon = document.createElement('i');
    icon.type = 'i';
    icon.className = 'fas fa-undo-alt';
    var button = document.createElement('div');
    button.type = 'div';
    button.className = 'revert';

    button.onclick = () => {
      this.editor.options.onRevert({
        path: this.getPath(),
        field: this.field,
        value: this.value
      });
    };

    button.appendChild(icon);
    tdRevert.appendChild(button);
  }
};

jsoneditor__WEBPACK_IMPORTED_MODULE_5___default.a.VALID_OPTIONS.push('onRevert');
console.log(Node);

class JsonEditor extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  componentDidMount() {
    const options = {};

    options.onModeChange = mode => {
      this.updateEditor();
      if (mode === "tree") this.jsoneditor.expandAll();
    };

    options.onClassName = node => {
      if (this.pathExistsInJson(node.path, this.props.inheritedJson) && !this.pathExistsInJson(node.path, this.props.json)) {
        return 'inherited-value';
      } else if (!this.pathExistsInJson(node.path, this.props.inheritedJson) && this.pathExistsInJson(node.path, this.props.json)) {
        return 'new-value';
      }

      return undefined;
    };

    options.onEditable = node => {
      if (this.pathExistsInJson(node.path, this.props.inheritedJson)) {
        return {
          "field": false,
          "value": true
        };
      } else {
        return {
          "field": true,
          "value": true
        };
      }
    };

    options.onChange = () => {
      if (this.jsoneditor.getMode() === "code") {
        try {
          const currentJson = this.jsoneditor.get();

          if (this.props.json !== currentJson) {
            this.props.onChange(currentJson);
          }
        } catch (err) {
          this.err = err;
        }
      }
    };

    options.onChangeJSON = json => {
      if (this.jsoneditor.getMode() === "tree") {
        var newJson = {};
        this.updateFromJsonEditor(newJson, this.props.json, this.props.inheritedJson, json, []);
        this.props.onChange(newJson);
        console.log(newJson);
      }
    };

    options.onRevert = node => {
      var newJson = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(this.props.json);
      var currentBlock = newJson;
      var prevBlocks = [newJson];

      for (var i = 0; i < node.path.length; i++) {
        if (i === node.path.length - 1) {
          delete currentBlock[node.path[i]];
        } else {
          currentBlock = currentBlock[node.path[i]];
          prevBlocks.push(currentBlock);
        }
      }

      for (var i = node.path.length - 2; i >= 0; i--) {
        if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_3___default()(prevBlocks[i][node.path[i]])) {
          delete prevBlocks[i][node.path[i]];
        } else {
          break;
        }
      }

      this.props.onChange(newJson);
      this.updateEditor();
    };

    options.mode = 'mode' in this.props.options ? this.props.options.mode : 'code';
    options.modes = 'modes' in this.props.options ? this.props.options.modes : ['code', 'tree'];
    options.ace = brace__WEBPACK_IMPORTED_MODULE_7___default.a;
    options.history = false;
    options.enableSort = false;
    options.enableTransform = false;
    options.mainMenuBar = 'mainMenuBar' in this.props.options ? this.props.options.mainMenuBar : true;
    options.statusBar = 'statusBar' in this.props.options ? this.props.options.statusBar : true;
    this.jsoneditor = new jsoneditor__WEBPACK_IMPORTED_MODULE_5___default.a(this.container, options);

    if ('readOnly' in this.props.options && this.props.options.readOnly) {
      this.jsoneditor.aceEditor.setReadOnly(true);
    }

    if ('json' in this.props) {
      this.updateEditor();
      if (options.mode === 'tree') this.jsoneditor.expandAll();
    }
  }

  updateFromJsonEditor(newJson, oldJson, inheritedJson, editorJson, path) {
    for (var prop in editorJson) {
      if (typeof editorJson[prop] === "object" && !Array.isArray(editorJson[prop]) && Object.keys(editorJson[prop]).length > 0) {
        this.updateFromJsonEditor(newJson, prop in oldJson ? oldJson[prop] : {}, prop in inheritedJson ? inheritedJson[prop] : {}, editorJson[prop], path.concat([prop]));
      } else {
        if (prop in inheritedJson && !lodash_isEqual__WEBPACK_IMPORTED_MODULE_4___default()(inheritedJson[prop], editorJson[prop]) || !(prop in inheritedJson) || prop in oldJson) {
          this.setValueAtPath(newJson, path.concat([prop]), editorJson[prop]);
        }
      }
    }
  }

  pathExistsInJson(path, json) {
    if (!path) {
      return false;
    }

    var currentBlock = json;

    for (var i = 0; i < path.length; i++) {
      if (i === path.length - 1) {
        return path[i] in currentBlock;
      } else {
        if (!(path[i] in currentBlock)) {
          return false;
        }

        currentBlock = currentBlock[path[i]];
      }
    }

    return false;
  }

  setValueAtPath(json, path, value) {
    var currentBlock = json;

    for (var i = 0; i < path.length; i++) {
      if (i === path.length - 1) {
        currentBlock[path[i]] = value;
      } else {
        if (!(path[i] in currentBlock)) {
          currentBlock[path[i]] = {};
        }

        currentBlock = currentBlock[path[i]];
      }
    }
  }

  componentDidUpdate() {}

  updateEditor() {
    if (this.jsoneditor.getMode() === "code") {
      this.jsoneditor.setText(stringify(this.props.json, {
        space: '  '
      }));
    } else {
      var mergedJson = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(this.props.inheritedJson);
      lodash_merge__WEBPACK_IMPORTED_MODULE_2___default()(mergedJson, this.props.json);
      this.jsoneditor.setText(stringify(mergedJson, {
        space: '  '
      }));
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "jsoneditor-react-container" + ('readOnly' in this.props.options && this.props.options.readOnly ? ' jsoneditor-readOnly' : ''),
      ref: elem => this.container = elem,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 212
      },
      __self: this
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (JsonEditor);

/***/ }),

/***/ "./src/Param.js":
/*!**********************!*\
  !*** ./src/Param.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ParamValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParamValue */ "./src/ParamValue.js");
/* harmony import */ var _ReassuringPrompt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReassuringPrompt */ "./src/ReassuringPrompt.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/Param.js";




class Param extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideParamValues: true
    };
    this.toggleHideParamValues = this.toggleHideParamValues.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.reassuringRemovePromptRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.paramRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.dragEnterCounter = 0;
  }

  toggleHideParamValues() {
    this.setState({
      hideParamValues: !this.state.hideParamValues
    });
  }

  onDragStart(e) {
    e.dataTransfer.setData("text/plain", this.props.param.uuid);
  }

  onDragOver(e) {
    if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
    }
  }

  onDrop(e) {
    if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
      fetch("/reorder_param/" + this.props.project_name + "/" + e.dataTransfer.getData("text/plain") + "/" + this.props.param.sorting).then(res => res.json()).then(result => {}, error => {});
      this.dragEnterCounter = 0;
      this.paramRef.current.className = "item item-param";
    }
  }

  onDragEnter(e) {
    if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
      this.paramRef.current.className = "item item-param on-drag-over";
      this.dragEnterCounter++;
    }
  }

  onDragLeave(e) {
    if (this.props.sortMode && this.props.param.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
      this.dragEnterCounter--;
      if (this.dragEnterCounter === 0) this.paramRef.current.className = "item item-param";
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      ref: this.paramRef,
      className: "item item-param",
      onDragOver: this.onDragOver,
      onDragLeave: this.onDragLeave,
      onDragEnter: this.onDragEnter,
      onDrop: this.onDrop,
      onDragStart: this.onDragStart,
      draggable: this.props.sortMode ? "true" : "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "header",
      onClick: () => this.toggleHideParamValues(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80
      },
      __self: this
    }, this.props.param.name), !this.props.sortMode ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: e => {
        this.props.newParamValueFunc(this.props.param, this.props.param.values);
        e.stopPropagation();
      },
      title: "New parameter value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-plus",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: e => {
        this.props.editParamFunc(this.props.param);
        e.stopPropagation();
      },
      title: "Edit parameter",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-edit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    })), this.props.param.values.length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.reassuringRemovePromptRefs.current.openDialog(),
      title: "Remove parameter",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-trash-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action action-disabled",
      title: "Parameter cannot be removed, as it still has values.",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-trash-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95
      },
      __self: this
    }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "grip-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-bars",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    })))), !this.state.hideParamValues && !this.props.sortMode && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108
      },
      __self: this
    }, this.props.param.values.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }).map(value => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: value.uuid,
      paramValue: value,
      param: this.props.param,
      editFunc: this.props.editParamValueFunc,
      removable: !(value.uuid in this.props.numberOfTasksPerParamValue) || this.props.numberOfTasksPerParamValue[value.uuid].length === 0,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReassuringPrompt__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref: this.reassuringRemovePromptRefs,
      header: "Really want to delete?",
      text: "Do you really want to remove this parameter?",
      url: "/remove_param/" + this.props.param.project_name + "/" + this.props.param.uuid,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Param);

/***/ }),

/***/ "./src/ParamBatchEditor.js":
/*!*********************************!*\
  !*** ./src/ParamBatchEditor.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "./src/ConfigEditor.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamBatchEditor.js";



class ParamBatchEditor extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  open() {
    this.props.closeEditors();
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  save() {
    var data = new FormData();
    var dataJson = {};
    dataJson['config'] = this.configEditor.current.state.config;
    data.append("data", JSON.stringify(dataJson));
    var url = "/add_param_batch";
    fetch(url, {
      method: "POST",
      body: data
    }).then(res => res.json()).then(result => {}, error => {});
    this.close();
  }

  render() {
    if (this.state.open) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-batch-editor editor",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        },
        __self: this
      }, "Add multiple parameters"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfigEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
        ref: this.configEditor,
        url: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.save,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }, "Save"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, "Cancel")));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamBatchEditor);

/***/ }),

/***/ "./src/ParamEditor.js":
/*!****************************!*\
  !*** ./src/ParamEditor.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamEditor.js";


class ParamEditor extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: null,
      name: '',
      deprecatedParamValue: '',
      defaultParamValue: ''
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.new = this.new.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDeprecatedParamValueChange = this.onDeprecatedParamValueChange.bind(this);
    this.onDefaultParamValueChange = this.onDefaultParamValueChange.bind(this);
  }

  open(param) {
    this.props.closeEditors();
    this.setState({
      param: param,
      name: param.name,
      deprecatedParamValue: param.deprecated_param_value.uuid === undefined ? param.values[0].uuid : param.deprecated_param_value.uuid,
      defaultParamValue: param.default_param_value.uuid === undefined ? param.values[0].uuid : param.default_param_value.uuid
    });
  }

  new() {
    this.props.closeEditors();
    this.setState({
      param: {
        name: 'New parameter',
        values: []
      },
      name: '',
      deprecatedParamValue: '',
      defaultParamValue: ''
    });
  }

  close() {
    this.setState({
      param: null
    });
  }

  save() {
    var data = new FormData();
    var dataJson = {};
    dataJson['name'] = this.state.name;
    dataJson['deprecated_param_value'] = this.state.deprecatedParamValue;
    dataJson['default_param_value'] = this.state.defaultParamValue;
    dataJson['config'] = {};
    data.append("data", JSON.stringify(dataJson));
    var url = "";
    if (this.state.param.uuid) url = "/edit_param/" + this.state.param.uuid;else url = "/add_param/";
    fetch(url, {
      method: "POST",
      body: data
    }).then(res => res.json()).then(result => {}, error => {});
    this.close();
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  onDeprecatedParamValueChange(event) {
    this.setState({
      deprecatedParamValue: event.target.value
    });
  }

  onDefaultParamValueChange(event) {
    this.setState({
      defaultParamValue: event.target.value
    });
  }

  render() {
    if (this.state.param !== null) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-editor editor",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }, this.state.param.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, "Name:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        value: this.state.name,
        onChange: this.onNameChange,
        required: "required",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      })), this.state.param.values.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, "Parameter value for deprecated tasks:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        value: this.state.deprecatedParamValue,
        onChange: this.onDeprecatedParamValueChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, this.state.param.values.map(value => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: value.uuid,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, value.name)))), this.state.param.values.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "Default parameter value for new tasks:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        value: this.state.defaultParamValue,
        onChange: this.onDefaultParamValueChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, this.state.param.values.map(value => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: value.uuid,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, value.name)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.save,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, "Save"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "Cancel")));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamEditor);

/***/ }),

/***/ "./src/ParamFilter.js":
/*!****************************!*\
  !*** ./src/ParamFilter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamFilter.js";


class ParamFilterParam extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapValueToValues = this.mapValueToValues.bind(this);
    this.calcParamValueName = this.calcParamValueName.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  calcParamValueName(paramValue, args) {
    let name = paramValue.name;

    for (let i = 0; i < args.length; i++) {
      name = name.replace("$T" + i + "$", args[i]);
    }

    return name;
  }

  calcParamValueClasses(param, value) {
    let classes = "param-value ";

    if (this.props.selectMultiple) {
      const paramValue = [value.uuid, ...value.args];
      if (!(param.uuid in this.props.selectedParamValues) || param.uuid in this.props.selectedParamValues && this.props.selectedParamValues[param.uuid].findIndex(selection => selection.length === paramValue.length && selection.every((value, index) => value === paramValue[index])) !== -1) classes += "param-value-selected ";
    } else {
      if (param.uuid in this.props.selectedParamValues && this.props.selectedParamValues[param.uuid][0] === value.uuid && (!("resolvedName" in value) || this.calcParamValueName(value, this.props.selectedParamValues[param.uuid].slice(1)) === value.resolvedName)) classes += "param-value-selected ";
    }

    if (param.default_param_value.uuid === value.uuid) classes += "param-value-default ";
    return classes;
  }

  mapValueToValues(paramValue, deprecatedKey) {
    let paramValues = [];

    for (let name in paramValue.number_of_tasks) paramValues.push({
      "uuid": paramValue.uuid,
      "name": paramValue.name,
      "resolvedName": name,
      "numberOfTasks": paramValue.number_of_tasks[name][0],
      "args": paramValue.number_of_tasks[name][1]
    });

    return paramValues;

    if (!paramValue.isTemplate) {
      let numberOfTasks = 0;

      if (this.props.numberOfTasksPerParamValue !== undefined) {
        if (paramValue.uuid in this.props.numberOfTasksPerParamValue) numberOfTasks += this.props.numberOfTasksPerParamValue[paramValue.uuid].length;
        if (deprecatedKey !== null && deprecatedKey in this.props.numberOfTasksPerParamValue) numberOfTasks += this.props.numberOfTasksPerParamValue[deprecatedKey].length;
      }

      paramValues.push({
        "uuid": paramValue.uuid,
        "name": paramValue.name,
        "resolvedName": paramValue.name,
        "numberOfTasks": numberOfTasks,
        "args": []
      });
    } else {
      let numbersPerArg = {};

      if (deprecatedKey !== null && deprecatedKey in this.props.numberOfTasksPerParamValue) {
        let name = this.calcParamValueName(paramValue, paramValue.template_deprecated);
        numbersPerArg[name] = [this.props.numberOfTasksPerParamValue[deprecatedKey].length, paramValue.template_deprecated];
      }

      if (paramValue.uuid in this.props.numberOfTasksPerParamValue) {
        for (let task of this.props.numberOfTasksPerParamValue[paramValue.uuid]) {
          const name = this.calcParamValueName(paramValue, task[1]);
          if (!(name in numbersPerArg)) numbersPerArg[name] = [0, task[1]];
          numbersPerArg[name][0]++;
        }
      }

      for (let name in numbersPerArg) paramValues.push({
        "uuid": paramValue.uuid,
        "name": paramValue.name,
        "resolvedName": name,
        "numberOfTasks": numbersPerArg[name][0],
        "args": numbersPerArg[name][1]
      });
    }

    return paramValues;
  }

  toggleAll(evt) {
    this.props.toggleSelection(this.props.param, null, []);
    evt.stopPropagation();
  }

  getSelectedValues() {
    if (!(this.props.param.uuid in this.props.selectedParamValues)) return ["All"];else if (this.props.selectedParamValues[this.props.param.uuid].length === 0) return ["None"];else {
      let selectedParamValues = this.props.selectedParamValues[this.props.param.uuid];
      if (!this.props.selectMultiple) selectedParamValues = [selectedParamValues];
      let values = [];

      for (let selection of selectedParamValues) {
        const paramValue = this.props.param.values.find(value => value.uuid === selection[0]);
        values.push(this.calcParamValueName(paramValue, selection.slice(1)));
      }

      return values;
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: this.props.param.uuid,
      className: "param",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: this.props.expanded ? "param-name param-name-expanded" : "param-name param-name-collapsed",
      onClick: () => this.props.toggleExpandedParam(this.props.param.uuid),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      },
      __self: this
    }, this.props.param.name, this.props.expanded ? this.props.selectMultiple && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: !(this.props.param.uuid in this.props.selectedParamValues) ? "all-button all-button-activated" : "all-button",
      onClick: this.toggleAll,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108
      },
      __self: this
    }, "All") : this.getSelectedValues().map(paramValue => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "param-value-hint",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113
      },
      __self: this
    }, paramValue))), this.props.expanded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "param-values-wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "param-values",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121
      },
      __self: this
    }, this.props.param.values.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }).map(paramValue => !paramValue.isTemplate || !this.props.useTemplateFields ? this.mapValueToValues(paramValue, paramValue.uuid === this.props.param.deprecated_param_value.uuid ? this.props.param.uuid + "_deprecated" : null).map(value => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: value.uuid,
      className: this.calcParamValueClasses(this.props.param, value),
      onClick: () => this.props.toggleSelection(this.props.param, value, value.args),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128
      },
      __self: this
    }, value.resolvedName, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "task-numbers",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: this
    }, value.numberOfTasks)))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: paramValue.uuid,
      className: this.calcParamValueClasses(this.props.param, paramValue),
      onClick: () => this.props.toggleSelection(this.props.param, paramValue, [this.props.getParamValueArg(this.props.param, paramValue)]),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136
      },
      __self: this
    }, paramValue.name.split("$T0$")[0], react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      value: this.props.getParamValueArg(this.props.param, paramValue),
      style: {
        "width": Math.max(10, 10 * this.props.getParamValueArg(this.props.param, paramValue).toString().length) + "px"
      },
      onChange: evt => this.props.onParamValueArgChange(this.props.param, paramValue, evt),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138
      },
      __self: this
    }), paramValue.name.split("$T0$")[1]))))));
  }

}

class ParamFilter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      paramValueArguments: {},
      expandedParam: null
    };
    this.onParamValueArgChange = this.onParamValueArgChange.bind(this);
    this.getParamValueArg = this.getParamValueArg.bind(this);
    this.toggleExpandedParam = this.toggleExpandedParam.bind(this);
  }

  onParamValueArgChange(param, value, evt) {
    const paramValueArguments = Object.assign({}, this.state.paramValueArguments);
    paramValueArguments[value.uuid] = evt.target.value;
    this.props.toggleSelection(param, value, evt.target.value);
    this.setState({
      paramValueArguments: paramValueArguments
    });
  }

  getParamValueArg(param, value) {
    if (param.uuid in this.props.selectedParamValues && this.props.selectedParamValues[param.uuid].length > 1) {
      if (!(value.uuid in this.state.paramValueArguments) || this.state.paramValueArguments[value.uuid] !== this.props.selectedParamValues[param.uuid][1]) {
        const paramValueArguments = Object.assign({}, this.state.paramValueArguments);
        paramValueArguments[value.uuid] = this.props.selectedParamValues[param.uuid][1];
        this.setState({
          paramValueArguments: paramValueArguments
        });
      }

      return this.props.selectedParamValues[param.uuid][1];
    } else if (value.uuid in this.state.paramValueArguments) return this.state.paramValueArguments[value.uuid];else if (value.template_defaults.length > 0) return value.template_defaults[0];else return null;
  }

  toggleExpandedParam(param) {
    this.setState({
      expandedParam: param === this.state.expandedParam ? null : param
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "param-filter",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205
      },
      __self: this
    }, Object.keys(this.props.paramsByGroup).sort((a, b) => a.localeCompare(b)).map(group => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: group,
      className: "param-group",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207
      },
      __self: this
    }, group !== "" && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-header",
      onClick: () => this.toggleHideParamValues(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 209
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 210
      },
      __self: this
    }, group)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "params",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 213
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "params",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 214
      },
      __self: this
    }, this.props.paramsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).filter(param => param.values.length > 0).map(param => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ParamFilterParam, {
      param: param,
      useTemplateFields: this.props.useTemplateFields,
      toggleSelection: this.props.toggleSelection,
      selectedParamValues: this.props.selectedParamValues,
      getParamValueArg: this.getParamValueArg,
      numberOfTasksPerParamValue: this.props.numberOfTasksPerParamValue,
      selectMultiple: this.props.selectMultiple,
      expanded: param.uuid === this.state.expandedParam,
      toggleExpandedParam: this.toggleExpandedParam,
      onParamValueArgChange: this.onParamValueArgChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 216
      },
      __self: this
    })))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamFilter);

/***/ }),

/***/ "./src/ParamGroup.js":
/*!***************************!*\
  !*** ./src/ParamGroup.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Param__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Param */ "./src/Param.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamGroup.js";



class ParamGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideParamValue: false
    };
    this.toggleHideParamValues = this.toggleHideParamValues.bind(this);
  }

  toggleHideParamValues() {
    this.setState({
      hideParamValue: !this.state.hideParamValue
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "item item-param",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, this.props.group !== "" && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-header",
      onClick: () => this.toggleHideParamValues(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, this.props.group)), !this.state.hideParamValue && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, this.props.params.sort((a, b) => a.name.localeCompare(b.name)).map(param => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Param__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: param.uuid,
      param: param,
      editParamFunc: this.props.editParamFunc,
      editParamValueFunc: this.props.editParamValueFunc,
      newParamValueFunc: this.props.newParamValueFunc,
      numberOfTasksPerParamValue: this.props.numberOfTasksPerParamValue,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamGroup);

/***/ }),

/***/ "./src/ParamSelection.js":
/*!*******************************!*\
  !*** ./src/ParamSelection.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "./src/ConfigEditor.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamSelection.js";



class ParamSelection extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedParams: []
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.selectParam = this.selectParam.bind(this);
    this.sendSelection = this.sendSelection.bind(this);
  }

  selectParam(param) {
    if (this.props.selectMultiple) {
      let selectedParams = this.state.selectedParams.slice();
      let index = selectedParams.indexOf(param);

      if (index === -1) {
        selectedParams.push(param);
      } else {
        selectedParams.splice(index, 1);
      }

      this.setState({
        selectedParams: selectedParams
      });
    } else {
      this.props.onSelect(param);
      this.closeDialog();
    }
  }

  openDialog() {
    this.setState({
      dialogOpen: true,
      device: this.props.devices ? this.props.devices[0].uuid : null,
      selectedParams: []
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    });
  }

  sendSelection() {
    this.props.onSelect(this.state.selectedParams);
    this.closeDialog();
  }

  render() {
    if (this.state.dialogOpen) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-wrapper",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.paramEditor ? 'prompt param-prompt' : 'prompt',
        style: {
          "width": "300px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, this.props.header), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, Object.keys(this.props.paramsByGroup).sort((a, b) => a.localeCompare(b)).map(group => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: group,
        className: "param-group",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, group !== "" && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "group-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, group)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }, this.props.paramsByGroup[group].sort((a, b) => a.name.localeCompare(b.name)).filter(param => param.values.length > 0).map(param => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: param.uuid,
        className: "param",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-name param-name-collapsed " + (this.state.selectedParams.indexOf(param) !== -1 ? " param-name-selected" : ""),
        onClick: () => this.selectParam(param),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, param.name)))))))), this.props.selectMultiple && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.sendSelection,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, "Ok"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.closeDialog,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, "Cancel"))));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamSelection);

/***/ }),

/***/ "./src/ParamTab.js":
/*!*************************!*\
  !*** ./src/ParamTab.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Param__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Param */ "./src/Param.js");
/* harmony import */ var _ParamEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParamEditor */ "./src/ParamEditor.js");
/* harmony import */ var _ParamValueEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ParamValueEditor */ "./src/ParamValueEditor.js");
/* harmony import */ var _ParamBatchEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ParamBatchEditor */ "./src/ParamBatchEditor.js");
/* harmony import */ var _ParamGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ParamGroup */ "./src/ParamGroup.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamTab.js";







class ParamTab extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbstract: true
    };
    this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
    this.addParam = this.addParam.bind(this);
    this.addParamBatch = this.addParamBatch.bind(this);
    this.closeEditors = this.closeEditors.bind(this);
    this.paramEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.paramBatchEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.paramValueEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  toggleShowAbstract() {
    this.setState({
      showAbstract: !this.state.showAbstract
    });
  }

  closeEditors() {
    this.paramEditor.current.close();
    this.paramBatchEditor.current.close();
    this.paramValueEditor.current.close();
  }

  addParam() {
    this.paramEditor.current.new();
  }

  addParamBatch() {
    this.paramBatchEditor.current.open();
  }

  addParamValue(param) {
    this.paramValueEditor.current.new(param);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab",
      style: {
        'display': this.props.active ? 'flex' : 'none'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "params-tab",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, this.props.paramSortingMode ? this.props.params.sort((a, b) => a.sorting - b.sorting).map(param => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Param__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: param.uuid,
      param: param,
      sortMode: true,
      numberOfTasksPerParamValue: this.props.numberOfTasksPerParamValue,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    })) : Object.keys(this.props.paramsByGroup).sort((a, b) => a.localeCompare(b)).map(group => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamGroup__WEBPACK_IMPORTED_MODULE_5__["default"], {
      key: group,
      params: this.props.paramsByGroup[group],
      group: group,
      sorting: this.props.sorting[0],
      sortingDescending: this.props.sorting[1],
      editParamFunc: this.paramEditor.current.open,
      editParamValueFunc: this.paramValueEditor.current.open,
      newParamValueFunc: this.paramValueEditor.current.new,
      numberOfTasksPerParamValue: this.props.numberOfTasksPerParamValue,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamEditor__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref: this.paramEditor,
      closeEditors: this.closeEditors,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamValueEditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ref: this.paramValueEditor,
      closeEditors: this.closeEditors,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamBatchEditor__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ref: this.paramBatchEditor,
      closeEditors: this.closeEditors,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      defaultChecked: this.state.showAbstract,
      onChange: this.toggleShowAbstract,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82
      },
      __self: this
    }, "Show abstract parameter values")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "buttons",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.addParam,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85
      },
      __self: this
    }, "Add parameter"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.addParamBatch,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    }, "Add batch"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamTab);

/***/ }),

/***/ "./src/ParamValue.js":
/*!***************************!*\
  !*** ./src/ParamValue.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReassuringPrompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReassuringPrompt */ "./src/ReassuringPrompt.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamValue.js";



class ParamValue extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.reassuringRemovePromptRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: this.props.paramValue.abstract ? "item item-abstract item-param-value" : "item item-param-value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, this.props.paramValue.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "footer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, this.props.paramValue.base !== "" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, "Inherits from:"), " ", this.props.paramValue.base) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, "-"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, "Created:"), " ", this.props.paramValue.creation_time.toShortStr()))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.props.editFunc(this.props.paramValue, true, this.props.param, this.props.param.values),
      title: "Clone parameter value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-copy",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.props.editFunc(this.props.paramValue, false, this.props.param, this.props.param.values),
      title: "Edit parameter value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-edit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action dropdown-toggle",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-ellipsis-h",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, this.props.removable ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.reassuringRemovePromptRefs.current.openDialog(),
      title: "Remove parameter value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-trash-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action action-disabled",
      title: "Parameter value cannot be removed, as there are tasks using it.",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-trash-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReassuringPrompt__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ref: this.reassuringRemovePromptRefs,
      header: "Really want to delete?",
      text: "Do you really want to remove this parameter value?",
      url: "/remove_param_value/" + this.props.paramValue.project_name + "/" + this.props.paramValue.uuid,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamValue);

/***/ }),

/***/ "./src/ParamValueEditor.js":
/*!*********************************!*\
  !*** ./src/ParamValueEditor.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "./src/ConfigEditor.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamValueEditor.js";



class ParamValueEditor extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      paramValue: null,
      name: '',
      base: '',
      abstract: false,
      dynamic: false,
      forceDynamic: false,
      possible_base_param_values: [],
      uuid_to_load: null,
      param: null,
      templateDefaults: "",
      templateDeprecated: ""
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.new = this.new.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onBaseChange = this.onBaseChange.bind(this);
    this.onAbstractChange = this.onAbstractChange.bind(this);
    this.onDynamicChange = this.onDynamicChange.bind(this);
    this.onIsBaseDynamic = this.onIsBaseDynamic.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onTemplateDefaultsChange = this.onTemplateDefaultsChange.bind(this);
    this.onTemplateDeprecatedChange = this.onTemplateDeprecatedChange.bind(this);
  }

  open(paramValue, duplicate, param, possible_base_param_values) {
    this.props.closeEditors();

    if (duplicate) {
      this.setState({
        paramValue: {
          name: paramValue.name
        },
        name: paramValue.name,
        base: paramValue.base_uuid,
        uuid_to_load: paramValue.uuid,
        abstract: paramValue.abstract,
        dynamic: paramValue.dynamic,
        template: paramValue.isTemplate,
        templateDefaults: paramValue.template_defaults,
        templateDeprecated: paramValue.template_deprecated,
        forceDynamic: false,
        param: param,
        possible_base_param_values: possible_base_param_values
      });
    } else {
      this.setState({
        paramValue: paramValue,
        name: paramValue.name,
        base: paramValue.base_uuid,
        uuid_to_load: paramValue.uuid,
        abstract: paramValue.abstract,
        dynamic: paramValue.dynamic,
        template: paramValue.isTemplate,
        templateDefaults: paramValue.template_defaults,
        templateDeprecated: paramValue.template_deprecated,
        forceDynamic: false,
        param: param,
        possible_base_param_values: possible_base_param_values
      });
    }
  }

  new(param, possible_base_param_values) {
    this.props.closeEditors();
    this.setState({
      paramValue: {
        name: 'New parameter value'
      },
      name: '',
      base: '',
      abstract: false,
      dynamic: false,
      uuid_to_load: null,
      forceDynamic: false,
      param: param,
      possible_base_param_values: possible_base_param_values
    });
  }

  close() {
    this.setState({
      paramValue: null
    });
  }

  save() {
    var data = new FormData();
    var dataJson = {};
    if (this.state.name !== "") dataJson['name'] = this.state.name;
    if (this.state.base !== '') dataJson['base'] = this.state.base;
    if (this.state.abstract) dataJson['abstract'] = this.state.abstract;
    if (this.state.dynamic) dataJson['dynamic'] = this.state.dynamic;

    if (this.state.template) {
      dataJson['isTemplate'] = this.state.template;
      dataJson['template_defaults'] = this.state.templateDefaults;
      dataJson['template_deprecated'] = this.state.templateDeprecated;
    }

    dataJson['config'] = this.configEditor.current.state.config;
    data.append("data", JSON.stringify(dataJson));
    var url = "";
    if (this.state.paramValue.uuid) url = "/edit_param_value/" + this.state.param.uuid + "/" + this.state.paramValue.uuid;else url = "/add_param_value/" + this.state.param.uuid;
    fetch(url, {
      method: "POST",
      body: data
    }).then(res => res.json()).then(result => {}, error => {});
    this.close();
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  onBaseChange(event) {
    this.setState({
      base: event.target.value
    });
  }

  onAbstractChange(event) {
    this.setState({
      abstract: event.target.checked
    });
  }

  onDynamicChange(event) {
    this.setState({
      dynamic: event.target.checked
    });
  }

  onIsBaseDynamic(isDynamic) {
    if (isDynamic) {
      this.setState({
        dynamic: true,
        forceDynamic: true
      });
    } else if (this.state.forceDynamic) {
      this.setState({
        dynamic: false,
        forceDynamic: false
      });
    }
  }

  onTemplateChange(event) {
    this.setState({
      template: event.target.checked
    });
  }

  onTemplateDefaultsChange(event) {
    this.setState({
      templateDefaults: [event.target.value]
    });
  }

  onTemplateDeprecatedChange(event) {
    this.setState({
      templateDeprecated: [event.target.value]
    });
  }

  render() {
    if (this.state.paramValue !== null) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-value-editor editor",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }, this.state.paramValue.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 200
        },
        __self: this
      }, "Name:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        value: this.state.name,
        onChange: this.onNameChange,
        required: "required",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 201
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 203
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        },
        __self: this
      }, "Base:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        value: this.state.base,
        onChange: this.onBaseChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 205
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 206
        },
        __self: this
      }, "None"), this.state.possible_base_param_values.filter(value => value.uuid !== this.state.uuid_to_load).map(paramValue => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: paramValue.uuid,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208
        },
        __self: this
      }, paramValue.name)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 212
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 213
        },
        __self: this
      }, "Abstract:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        checked: this.state.abstract,
        onChange: this.onAbstractChange,
        type: "checkbox",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 214
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 216
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 217
        },
        __self: this
      }, "Dynamic:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        checked: this.state.dynamic,
        onChange: this.onDynamicChange,
        type: "checkbox",
        disabled: this.state.forceDynamic,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 218
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 220
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 221
        },
        __self: this
      }, "Template:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        checked: this.state.template,
        onChange: this.onTemplateChange,
        type: "checkbox",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 222
        },
        __self: this
      })), this.state.template && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 225
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      }, "Template default:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        value: this.state.templateDefaults[0],
        onChange: this.onTemplateDefaultsChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        },
        __self: this
      })), this.state.template && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "field",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 231
        },
        __self: this
      }, "Template deprecated:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        value: this.state.templateDeprecated[0],
        onChange: this.onTemplateDeprecatedChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfigEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
        ref: this.configEditor,
        onDynamicChange: this.onIsBaseDynamic,
        url: "/config/param_value" + (this.state.uuid_to_load !== null ? "/" + this.state.uuid_to_load : ""),
        bases: [this.state.base],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 234
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.save,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        },
        __self: this
      }, "Save"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237
        },
        __self: this
      }, "Cancel")));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamValueEditor);

/***/ }),

/***/ "./src/ParamViewer.js":
/*!****************************!*\
  !*** ./src/ParamViewer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ParamFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParamFilter */ "./src/ParamFilter.js");
/* harmony import */ var _ParamSelection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParamSelection */ "./src/ParamSelection.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ParamViewer.js";




class Column extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.colRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.dragEnterCounter = 0;
  }

  getClassName() {
    return this.props.isDummy ? "table-col-dummy" : "table-col-entry";
  }

  onDragStart(e) {
    e.dataTransfer.setData("text/plain", this.props.col);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    if (this.props.allowDrop) {
      e.preventDefault();
      this.props.addCol(e.dataTransfer.getData("text/plain"), this.props.col);
      this.dragEnterCounter = 0;
      this.colRef.current.className = this.getClassName();
    }
  }

  onDragEnter(e) {
    if (this.props.allowDrop) {
      e.preventDefault();
      this.colRef.current.className = this.getClassName() + " on-drag-over";
      this.dragEnterCounter++;
    }
  }

  onDragLeave(e) {
    if (this.props.allowDrop) {
      e.preventDefault();
      this.dragEnterCounter--;
      if (this.dragEnterCounter === 0) this.colRef.current.className = this.getClassName();
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: this.getClassName(),
      ref: this.colRef,
      onDragOver: this.onDragOver,
      onDragLeave: this.onDragLeave,
      onDragEnter: this.onDragEnter,
      onDrop: this.onDrop,
      onDragStart: this.onDragStart,
      draggable: "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }, !this.props.isDummy && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, this.props.col), this.props.removeCol && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-times",
      onClick: () => this.props.removeCol(this.props.col),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    })));
  }

}

class ParamViewer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open == true,
      filterSaveName: "",
      viewPath: ""
    };
    this.paramCollapseSelection = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.paramGroupSelection = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.saveFilter = this.saveFilter.bind(this);
    this.deleteFilter = this.deleteFilter.bind(this);
    this.handleFilterSaveNameChange = this.handleFilterSaveNameChange.bind(this);
    this.handleViewPathChange = this.handleViewPathChange.bind(this);
    this.addView = this.addView.bind(this);
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  handleFilterSaveNameChange(event) {
    this.setState({
      filterSaveName: event.target.value
    });
  }

  saveFilter() {
    if (this.state.filterSaveName !== "") {
      this.props.saveFilter(this.state.filterSaveName);
    }
  }

  handleViewPathChange(event) {
    this.setState({
      viewPath: event.target.value
    });
  }

  addView() {
    if (this.state.viewPath !== "") {
      this.props.addView(this.state.viewPath);
    }
  }

  deleteFilter(name) {
    var data = new FormData();
    var dataJson = {};
    dataJson['name'] = name;
    data.append("data", JSON.stringify(dataJson));
    fetch("delete_filter", {
      method: "POST",
      body: data
    });
  }

  deleteView(path) {
    var data = new FormData();
    var dataJson = {};
    dataJson['path'] = path;
    data.append("data", JSON.stringify(dataJson));
    fetch("delete_view", {
      method: "POST",
      body: data
    });
  }

  render() {
    if (this.state.open) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-viewer slide-editor editor",
        style: this.props.style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: this
      }, "Save / Load"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params-to-group param-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        },
        __self: this
      }, Object.keys(this.props.saved_filters).map(savedFilterName => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: () => this.props.loadFilter(this.props.saved_filters[savedFilterName]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173
        },
        __self: this
      }, savedFilterName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-times",
        onClick: () => this.deleteFilter(savedFilterName),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        name: "filterSaveName",
        value: this.state.filterSaveName,
        onChange: this.handleFilterSaveNameChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.saveFilter,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        },
        __self: this
      }, "Save")), !this.props.hideViews && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        },
        __self: this
      }, "Filesystem"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params-to-group param-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        },
        __self: this
      }, Object.keys(this.props.views).map(path => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: () => this.props.loadFilter(this.props.views[path]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191
        },
        __self: this
      }, path), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-times",
        onClick: () => this.deleteView(path),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        name: "viewPath",
        value: this.state.viewPath,
        onChange: this.handleViewPathChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.addView,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 200
        },
        __self: this
      }, "Add"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 205
        },
        __self: this
      }, "Parameter filter", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-times",
        onClick: this.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 205
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 206
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: this.props.paramFilterEnabled,
        onChange: () => this.props.toggleParamFilter(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208
        },
        __self: this
      }, "Enabled")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamFilter__WEBPACK_IMPORTED_MODULE_1__["default"], {
        selectMultiple: true,
        paramsByGroup: this.props.paramsByGroup,
        selectedParamValues: this.props.selectedParamValues,
        toggleSelection: this.props.toggleSelection,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 210
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 212
        },
        __self: this
      }, "Collapsing"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params-to-collapse param-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 213
        },
        __self: this
      }, this.props.collapsedParams.map(param_uuid => this.props.params.find(p => p.uuid === param_uuid)).map(param => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 215
        },
        __self: this
      }, param.name, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-times",
        onClick: () => this.props.removeParamCollapse(param),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 215
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamSelection__WEBPACK_IMPORTED_MODULE_2__["default"], {
        header: "Select param to collapse",
        ref: this.paramCollapseSelection,
        paramsByGroup: this.props.paramsByGroup,
        onSelect: this.props.addParamCollapse,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 218
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: () => this.paramCollapseSelection.current.openDialog(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 220
        },
        __self: this
      }, "Add")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 223
        },
        __self: this
      }, "Grouping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params-to-group param-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 224
        },
        __self: this
      }, this.props.groupedParams.map(params => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "param-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      }, params.map(param_uuid => this.props.params.find(p => p.uuid === param_uuid)).map(param => param.name).join(" / "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-times",
        onClick: () => this.props.removeParamGroup(params),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 228
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamSelection__WEBPACK_IMPORTED_MODULE_2__["default"], {
        header: "Select params to group",
        selectMultiple: true,
        ref: this.paramGroupSelection,
        paramsByGroup: this.props.paramsByGroup,
        onSelect: this.props.addParamGroup,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 233
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: () => this.paramGroupSelection.current.openDialog(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 234
        },
        __self: this
      }, "Add")), this.props.selectedCols !== undefined && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 239
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 240
        },
        __self: this
      }, "Columns"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-cols",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 241
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 242
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-col-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 243
        },
        __self: this
      }, "Used:"), this.props.selectedCols.map(col => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Column, {
        col: col,
        allowDrop: true,
        removeCol: this.props.removeCol,
        addCol: this.props.addCol,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 245
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Column, {
        col: null,
        allowDrop: true,
        removeCol: this.props.removeCol,
        addCol: this.props.addCol,
        isDummy: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 252
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-col",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 260
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-col-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 261
        },
        __self: this
      }, "Not used:"), this.props.allCols.filter(col => this.props.selectedCols.findIndex(x => x === col) === -1).map(col => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Column, {
        col: col,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263
        },
        __self: this
      }))))));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ParamViewer);

/***/ }),

/***/ "./src/PausedTask.js":
/*!***************************!*\
  !*** ./src/PausedTask.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Prompt */ "./src/Prompt.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _ReassuringPrompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReassuringPrompt */ "./src/ReassuringPrompt.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/PausedTask.js";






class PausedTask extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.reassuringRemovePromptRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.itemRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.promptExtraRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.openExtraDialog = this.openExtraDialog.bind(this);
    this.finish = this.finish.bind(this);
    this.openLog = this.openLog.bind(this);
    this.clone = this.clone.bind(this);
    this.pause = this.pause.bind(this);
    this.queueCancel = this.queueCancel.bind(this);
  }

  openExtraDialog() {
    this.promptExtraRefs.current.openDialog();
  }

  finish() {
    fetch("/finish/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  openLog() {
    window.open("/log/" + this.props.task.uuid, '_blank');
  }

  clone() {
    fetch("/clone_task/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.highlight !== this.props.highlight && this.props.highlight) {
      this.itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  componentDidMount() {
    if (this.props.highlight) {
      this.itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  itemClass() {
    let classname = "item item-task ";
    if (this.props.highlight) classname += "item-highlight ";
    if (this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_3__["default"].RUNNING) classname += "task-running ";else if (this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_3__["default"].QUEUED) classname += "task-queued ";
    return classname;
  }

  pause() {
    fetch("/pause/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  queueCancel() {
    fetch("/cancel/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  createCheckpoint() {
    fetch("/create_checkpoint/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      ref: this.itemRef,
      className: this.itemClass(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "try-number",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: this
    }, this.props.name[this.props.name.length - 1]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task__WEBPACK_IMPORTED_MODULE_2__["TaskName"], {
      name: this.props.name.slice(0, -1),
      is_test: this.props.task.is_test,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "footer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132
      },
      __self: this
    }, "Iterations:"), " ", this.props.task.finished_iterations, " / ", this.props.task.total_iterations), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: this
    }, "Created:"), " ", this.props.task.creation_time.toShortStr()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134
      },
      __self: this
    }, "Last saved:"), " ", this.props.task.saved_time.toShortStr(), " ", this.props.task.had_error == true && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "task-error",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134
      },
      __self: this
    }, "(Error)")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137
      },
      __self: this
    }, this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_3__["default"].RUNNING ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.pause,
      title: "Pause task",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 140
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-pause",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 141
      },
      __self: this
    })) : this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_3__["default"].QUEUED ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.queueCancel,
      title: "Remove this task from queue",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-times",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147
      },
      __self: this
    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.openExtraDialog,
      title: "Run for more iterations",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-play",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 151
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.props.showTask(this.props.task),
      title: "Show detail information",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-info",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action dropdown-toggle",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-ellipsis-h",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 162
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.props.rerunTask(this.props.task),
      title: "Run new task with the exact same config",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 163
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-redo",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164
      },
      __self: this
    })), !this.props.task.is_test && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.props.filterLikeTask(this.props.task),
      title: "Filter for similar tasks",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 167
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-sliders-h",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 168
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.clone,
      title: "Clone task",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 171
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-copy",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 172
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.openLog,
      title: "View log",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 174
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-file-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 175
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.createCheckpoint(),
      title: "Create checkpoint",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 177
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-flag",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 178
      },
      __self: this
    })), this.props.task.state !== _Global__WEBPACK_IMPORTED_MODULE_3__["default"].RUNNING && this.props.task.state !== _Global__WEBPACK_IMPORTED_MODULE_3__["default"].QUEUED && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: () => this.reassuringRemovePromptRefs.current.openDialog(),
      title: "Remove task",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 181
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-trash-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 182
      },
      __self: this
    }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Prompt__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ref: this.promptExtraRefs,
      devices: this.props.devices,
      defaultValue: this.props.task.total_iterations,
      header: "Change total iterations?",
      text: "Specify the new number of iterations, you want the task to run:",
      url: "/continue/" + this.props.task.uuid,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 189
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReassuringPrompt__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ref: this.reassuringRemovePromptRefs,
      header: "Really want to delete?",
      text: "Do you really want to remove this task?",
      url: "/remove_task/" + this.props.task.uuid,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 190
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PausedTask);

/***/ }),

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/View.js");
/* harmony import */ var _ParamTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParamTab */ "./src/ParamTab.js");
/* harmony import */ var _TaskTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskTab */ "./src/TaskTab.js");
/* harmony import */ var _ParamViewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ParamViewer */ "./src/ParamViewer.js");
/* harmony import */ var _TaskContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TaskContainer */ "./src/TaskContainer.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/Project.js";







class Project extends _TaskContainer__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor(props) {
    super(props);
    this.state = {
      params: [],
      paramsByGroup: {},
      tasks: {},
      task_lookup: {},
      activeTab: 0,
      sorting_tasks: [0, true],
      sorting_params: ["saved", false],
      selectedParamValues: {},
      collapsedParams: [],
      groupedParams: [],
      paramFilterEnabled: false,
      paramSortingMode: false
    };
    this.toggleShowAbstract = this.toggleShowAbstract.bind(this);
    this.showTab = this.showTab.bind(this);
    this.onChangeSorting = this.onChangeSorting.bind(this);
    this.switchSortingDirection = this.switchSortingDirection.bind(this);
    this.openParamViewer = this.openParamViewer.bind(this);
    this.toggleParamFilter = this.toggleParamFilter.bind(this);
    this.toggleParamSortingMode = this.toggleParamSortingMode.bind(this);
    this.filterLikeTask = this.filterLikeTask.bind(this);
    this.addView = this.addView.bind(this);
    this.paramViewerRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  addView(path) {
    var data = new FormData();
    var dataJson = {};

    if (this.state.paramFilterEnabled) {
      dataJson['filter'] = this.state.selectedParamValues;
    } else {
      dataJson['filter'] = {};
    }

    dataJson['collapse'] = this.state.collapsedParams;
    dataJson['group'] = this.state.groupedParams;
    dataJson['path'] = path;
    data.append("data", JSON.stringify(dataJson));
    fetch("add_view", {
      method: "POST",
      body: data
    });
  }

  toggleShowAbstract() {
    this.setState({
      showAbstract: !this.state.showAbstract
    });
  }

  showTab(tab) {
    this.setState({
      activeTab: tab
    });
  }

  onChangeSorting(e) {
    if (this.state.activeTab === 0) {
      const sorting_params = this.state.sorting_params.slice();
      sorting_params[0] = parseInt(e.target.value);
      this.setState({
        sorting_params: sorting_params
      });
    } else {
      const sorting_tasks = this.state.sorting_tasks.slice();
      sorting_tasks[0] = e.target.value;
      this.setState({
        sorting_tasks: sorting_tasks
      }, () => this.filterHasUpdated());
    }
  }

  switchSortingDirection() {
    if (this.state.activeTab === 0) {
      const sorting_params = this.state.sorting_params.slice();
      sorting_params[1] = !sorting_params[1];
      this.setState({
        sorting_params: sorting_params
      });
    } else {
      const sorting_tasks = this.state.sorting_tasks.slice();
      sorting_tasks[1] = !sorting_tasks[1];
      this.setState({
        sorting_tasks: sorting_tasks
      }, () => this.filterHasUpdated());
    }
  }

  filterLikeTask(task) {
    const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

    for (const param of this.state.params) {
      let value = this.filterView.getValueToParam(task, param);
      selectedParamValues[param.uuid] = [[value[0].uuid, ...value[1]]];
    }

    this.setState({
      selectedParamValues: selectedParamValues,
      paramFilterEnabled: true
    }, () => this.filterHasUpdated());
    this.openParamViewer();
  }

  toggleParamFilter() {
    let paramFilterEnabled = !this.state.paramFilterEnabled;
    this.setState({
      paramFilterEnabled: paramFilterEnabled
    }, () => this.filterHasUpdated());
  }

  openParamViewer() {
    this.props.closeViewer();
    this.paramViewerRef.current.open();
  }

  toggleParamSortingMode() {
    this.setState({
      paramSortingMode: !this.state.paramSortingMode
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "project",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tabs",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: this.state.activeTab === 0 ? "tab-active" : "",
      onClick: () => this.showTab(0),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134
      },
      __self: this
    }, "Parameters"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: this.state.activeTab === 1 ? "tab-active" : "",
      onClick: () => this.showTab(1),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135
      },
      __self: this
    }, "Tasks")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sorting",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137
      },
      __self: this
    }, this.state.activeTab === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 139
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: this.toggleParamSortingMode,
      className: "fas fa-sort",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 140
      },
      __self: this
    })), this.state.activeTab === 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 144
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 145
      },
      __self: this
    }, "Sorting:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      value: this.state.sorting_tasks[0],
      onChange: this.onChangeSorting,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "saved",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147
      },
      __self: this
    }, "Saved"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148
      },
      __self: this
    }, "Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "created",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149
      },
      __self: this
    }, "Created"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "iterations",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150
      },
      __self: this
    }, "Iterations"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "started",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 151
      },
      __self: this
    }, "Started")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: this.switchSortingDirection,
      className: this.state.sorting_tasks[1] ? "fa fa-sort-amount-down" : "fa fa-sort-amount-up",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 153
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: this.state.paramFilterEnabled ? "fas fa-sliders-h filter-enabled" : "fas fa-sliders-h",
      onClick: this.openParamViewer,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamTab__WEBPACK_IMPORTED_MODULE_2__["default"], {
      active: this.state.activeTab === 0,
      paramsByGroup: this.state.paramsByGroup,
      sorting: this.state.sorting_params,
      paramSortingMode: this.state.paramSortingMode,
      params: this.state.params,
      numberOfTasksPerParamValue: this.state.numberOfTasksPerParamValue,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TaskTab__WEBPACK_IMPORTED_MODULE_3__["default"], {
      active: this.state.activeTab === 1,
      params: this.state.params,
      tasks: this.state.tasks,
      selectedParamValues: this.state.selectedParamValues,
      paramFilterEnabled: this.state.paramFilterEnabled,
      showTask: this.props.showTask,
      paramsByGroup: this.state.paramsByGroup,
      highlightedTask: this.props.highlightedTask,
      filterLikeTask: this.filterLikeTask,
      devices: this.props.devices,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 167
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamViewer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ref: this.paramViewerRef,
      paramsByGroup: this.state.paramsByGroup,
      selectedParamValues: this.state.selectedParamValues,
      toggleSelection: this.toggleSelection,
      toggleParamFilter: this.toggleParamFilter,
      paramFilterEnabled: this.state.paramFilterEnabled,
      params: this.state.params,
      collapsedParams: this.state.collapsedParams,
      addParamCollapse: this.addParamCollapse,
      removeParamCollapse: this.removeParamCollapse,
      groupedParams: this.state.groupedParams,
      addParamGroup: this.addParamGroup,
      removeParamGroup: this.removeParamGroup,
      saveFilter: this.saveFilter,
      loadFilter: this.loadFilter,
      saved_filters: this.props.saved_filters,
      views: this.props.views,
      addView: this.addView,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 179
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Project);

/***/ }),

/***/ "./src/ProjectManager.js":
/*!*******************************!*\
  !*** ./src/ProjectManager.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _CodeVersionViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CodeVersionViewer */ "./src/CodeVersionViewer.js");
/* harmony import */ var _TaskViewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskViewer */ "./src/TaskViewer.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ProjectManager.js";





class ProjectManager extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeVersionTree: null,
      highlightedTask: null
    };
    this.gotoTB = this.gotoTB.bind(this);
    this.addVersion = this.addVersion.bind(this);
    this.addCodeVersions = this.addCodeVersions.bind(this);
    this.openTaskViewer = this.openTaskViewer.bind(this);
    this.openCodeVersionViewer = this.openCodeVersionViewer.bind(this);
    this.closeViewer = this.closeViewer.bind(this);
    this.reload = this.reload.bind(this);
    this.promptRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.codeVersionViewerRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.taskViewerRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.props.evtSource.addEventListener("PROJECT_CHANGED", e => {
      const data = JSON.parse(e.data);
      this.setState({
        current_code_version: data.current_code_version,
        saved_filters: data.saved_filters,
        views: data.views,
        tensorboard_port: data.tensorboard_port
      });
    });
  }

  componentDidMount() {
    this.props.repository.onAdd("codeVersions", this.addCodeVersions);

    for (let codeVersion in this.props.repository.codeVersions) this.addCodeVersions(this.props.repository.codeVersions[codeVersion]);
  }

  componentWillUnmount() {
    this.props.repository.removeOnAdd("codeVersions", this.addCodeVersions);
  }

  addCodeVersions(codeVersion) {
    let newNode = {
      "uuid": codeVersion.uuid,
      "name": codeVersion.name,
      "base": codeVersion.base,
      "time": codeVersion.time,
      "children": []
    };
    let codeVersionTree = this.state.codeVersionTree;

    if (codeVersionTree === null) {
      codeVersionTree = newNode;
      this.setState({
        codeVersionTree: codeVersionTree
      });
    } else {
      this.insertCodeVersionNode(codeVersionTree, newNode);
      this.setState({
        codeVersionTree: codeVersionTree
      });
    }
  }

  insertCodeVersionNode(root, newNode) {
    if (root.uuid === newNode.base) {
      root.children.push(newNode);
      newNode.base = root;
    } else {
      for (let child of root.children) {
        this.insertCodeVersionNode(child, newNode);
      }
    }
  }

  updateCodeVersionNode(root, newNode) {
    if (root.uuid === newNode.uuid) {
      root.name = newNode.name;
      root.time = newNode.time;
    } else {
      for (let child of root.children) {
        this.updateCodeVersionNode(child, newNode);
      }
    }
  }

  gotoTB() {
    if (this.state.tensorboard_port === -1) {
      fetch("/tensorboard").then(res => res.json()).then(result => {
        if (result !== -1) {
          window.open("//" + window.location.hostname + ":" + result, '_blank');
        }
      }, error => {});
    } else {
      window.open("//" + window.location.hostname + ":" + this.state.tensorboard_port, '_blank');
    }
  }

  addVersion() {
    this.promptRefs.current.openDialog();
  }

  closeViewer() {
    this.codeVersionViewerRef.current.close();
    this.taskViewerRef.current.close();
  }

  openTaskViewer(task) {
    this.closeViewer();
    this.taskViewerRef.current.open(task);
  }

  openCodeVersionViewer() {
    this.closeViewer();
    this.codeVersionViewerRef.current.open();
  }

  highlightTask(task) {
    this.setState({
      highlightedTask: task.uuid
    });
    setTimeout(() => {
      this.setState({
        highlightedTask: null
      });
    }, 1500);
  }

  reload() {
    fetch("/reload").then(res => res.json()).then(result => {}, error => {});
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "project-manager",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "projects-toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155
      },
      __self: this
    }, this.state.current_code_version in this.props.repository.codeVersions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      id: "project-toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "code-version",
      title: "Add new code version",
      onClick: this.openCodeVersionViewer,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158
      },
      __self: this
    }, this.props.repository.codeVersions[this.state.current_code_version].name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "tb-link",
      onClick: this.gotoTB,
      title: "Start and open tensorboard",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159
      },
      __self: this
    }, "TB"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "reload-tasks",
      onClick: this.reload,
      title: "Reload tasks",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-sync-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      id: "open-table",
      href: "/table",
      target: "_blank",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 163
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-table",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164
      },
      __self: this
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "projects",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 169
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Project__WEBPACK_IMPORTED_MODULE_1__["default"], {
      repository: this.props.repository,
      showTask: this.openTaskViewer,
      closeViewer: this.closeViewer,
      highlightedTask: this.state.highlightedTask,
      devices: this.props.devices,
      current_code_version: this.state.current_code_version,
      saved_filters: this.state.saved_filters,
      views: this.state.views,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 170
      },
      __self: this
    })), this.state.codeVersionTree !== null && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CodeVersionViewer__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref: this.codeVersionViewerRef,
      codeVersionTree: this.state.codeVersionTree,
      currentCodeVersion: this.state.current_code_version,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 182
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TaskViewer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ref: this.taskViewerRef,
      repository: this.props.repository,
      codeVersions: this.props.repository.codeVersions,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 188
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ProjectManager);

/***/ }),

/***/ "./src/Prompt.js":
/*!***********************!*\
  !*** ./src/Prompt.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "./src/ConfigEditor.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/Prompt.js";



class Prompt extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      inputValue: this.props.defaultValue,
      device: null
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.start = this.start.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeviceChange = this.onDeviceChange.bind(this);
  }

  start() {
    this.setState({
      dialogOpen: false
    });

    if (this.props.paramEditor) {
      var data = new FormData();
      data.append("data", JSON.stringify(this.configEditor.current.state.config));
      fetch(this.props.url, {
        method: "POST",
        body: data
      }).then(res => res.json()).then(result => {}, error => {});
    } else {
      fetch(this.props.url + (this.props.devices ? "/" + this.state.device : "") + "/" + this.state.inputValue).then(res => res.json()).then(result => {}, error => {});
    }
  }

  onDeviceChange(event) {
    this.setState({
      device: event.target.value
    });
  }

  openDialog() {
    this.setState({
      dialogOpen: true,
      device: this.props.devices ? this.props.devices[0].uuid : null
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    });
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.start();
    }

    if (e.keyCode === 27) {
      e.preventDefault();
      this.closeDialog();
    }
  }

  onChange(data) {
    this.setState({
      inputValue: data
    });
  }

  render() {
    if (this.state.dialogOpen) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-wrapper",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.paramEditor ? 'prompt param-prompt' : 'prompt',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }, this.props.header), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, this.props.text), !this.props.paramEditor && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        autoFocus: true,
        onFocus: e => {
          e.target.select();
        },
        type: "text",
        name: "iterations",
        value: this.state.inputValue,
        onChange: evt => this.updateInputValue(evt),
        onKeyDown: this.onKeyDown,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }), this.props.paramEditor && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfigEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
        ref: this.configEditor,
        url: this.props.paramEditorUrl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), this.props.devices && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        value: this.state.device,
        onChange: this.onDeviceChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, this.props.devices.map(device => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: device.uuid,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, device.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.start,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, "Ok"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.closeDialog,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "Cancel"))));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Prompt);

/***/ }),

/***/ "./src/ReassuringPrompt.js":
/*!*********************************!*\
  !*** ./src/ReassuringPrompt.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/ReassuringPrompt.js";


class ReassuringPrompt extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
    this.execute = this.execute.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  execute() {
    this.setState({
      dialogOpen: false
    });
    fetch(this.props.url).then(res => res.json()).then(result => {}, error => {});
  }

  openDialog() {
    this.setState({
      dialogOpen: true
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    });
  }

  render() {
    if (this.state.dialogOpen) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-wrapper",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, this.props.header), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "prompt-text",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, this.props.text), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.execute,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }, "Yes"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.closeDialog,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, "No"))));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ReassuringPrompt);

/***/ }),

/***/ "./src/Repository.js":
/*!***************************!*\
  !*** ./src/Repository.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scheduler */ "./src/Scheduler.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./src/View.js");




class Repository {
  constructor(evtSource) {
    this.evtSource = evtSource;
    this.params = {};
    this.paramValues = {};
    this.tasks = {};
    this.codeVersions = {};
    this.onChangeListeners = {
      "params": [],
      "paramValues": [],
      "tasks": [],
      "codeVersions": []
    };
    this.onAddListeners = {
      "params": [],
      "paramValues": [],
      "tasks": [],
      "codeVersions": []
    };
    this.onRemoveListeners = {
      "params": [],
      "paramValues": [],
      "tasks": [],
      "codeVersions": []
    };
    this.evtSource.addEventListener("CODE_VERSION_CHANGED", e => {
      const changedCodeVersion = JSON.parse(e.data);
      changedCodeVersion.time = new Date(changedCodeVersion.time * 1000);
      this.updateEntity(this.codeVersions, changedCodeVersion, "codeVersions");
    });
    this.evtSource.addEventListener("PARAM_CHANGED", e => {
      const changedParam = JSON.parse(e.data);

      if (changedParam.uuid in this.params) {
        changedParam.values = this.params[changedParam.uuid].values;
      } else {
        changedParam.values = [];
      }

      if (changedParam.deprecated_param_value in this.paramValues) changedParam.deprecated_param_value = this.paramValues[changedParam.deprecated_param_value];
      if (changedParam.default_param_value in this.paramValues) changedParam.default_param_value = this.paramValues[changedParam.default_param_value];
      this.updateEntity(this.params, changedParam, "params");
    });
    this.evtSource.addEventListener("PARAM_VALUE_CHANGED", e => {
      const changedParamValue = JSON.parse(e.data);
      changedParamValue.creation_time = new Date(changedParamValue.creation_time * 1000);
      this.updateEntity(this.paramValues, changedParamValue, "paramValues");
      let param = this.params[changedParamValue.param];
      const previousIndex = param.values.findIndex(function (e) {
        return e.uuid === changedParamValue.uuid;
      });

      if (previousIndex >= 0) {
        param.values[previousIndex] = changedParamValue;
      } else {
        param.values.push(changedParamValue);
      }

      this.updateEntity(this.params, param, "params");
      param = Object.values(this.params).find(param => param.deprecated_param_value === changedParamValue.uuid);

      if (param !== undefined) {
        param.deprecated_param_value = changedParamValue;
        this.updateEntity(this.params, param, "params");
      }

      param = Object.values(this.params).find(param => param.default_param_value === changedParamValue.uuid);

      if (param !== undefined) {
        param.default_param_value = changedParamValue;
        this.updateEntity(this.params, param, "params");
      }
    });
    this.evtSource.addEventListener("TASK_CHANGED", e => {
      const changedTask = JSON.parse(e.data);
      changedTask.creation_time = new Date(changedTask.creation_time * 1000);
      changedTask.saved_time = new Date(changedTask.saved_time * 1000);
      changedTask.paramValues = changedTask.paramValues.map(e => [this.paramValues[e[0]]].concat(e.slice(1)));

      for (let checkpoint of changedTask.checkpoints) {
        checkpoint.time = new Date(checkpoint.time * 1000);
      }

      if (changedTask.state === _Global__WEBPACK_IMPORTED_MODULE_0__["default"].RUNNING) {
        if (changedTask.uuid in this.tasks) {
          if (changedTask.finished_iterations !== this.tasks[changedTask.uuid].finished_iterations) {
            changedTask.mean_iteration_time = (changedTask.iteration_update_time - (this.tasks[changedTask.uuid].iteration_update_time === 0 ? changedTask.start_time : this.tasks[changedTask.uuid].iteration_update_time)) / (changedTask.finished_iterations - this.tasks[changedTask.uuid].finished_iterations);
            changedTask.total_time = parseInt(changedTask.iteration_update_time - changedTask.start_time + changedTask.mean_iteration_time * (changedTask.total_iterations - changedTask.finished_iterations));
          } else {
            changedTask.mean_iteration_time = this.tasks[changedTask.uuid].mean_iteration_time;
            changedTask.total_time = this.tasks[changedTask.uuid].total_time;
          }
        }

        changedTask.start_time_timestamp = changedTask.start_time;
        changedTask.start_time = new Date(changedTask.start_time * 1000);
        _Scheduler__WEBPACK_IMPORTED_MODULE_1__["default"].refreshRunTime(changedTask);
      }

      if (changedTask.uuid in this.tasks) {
        changedTask.name = this.tasks[changedTask.uuid].name;
        changedTask.try = this.tasks[changedTask.uuid].try;
        changedTask.nameParamValues = this.tasks[changedTask.uuid].nameParamValues;
      }

      this.updateEntity(this.tasks, changedTask, "tasks");
    });
    this.evtSource.addEventListener("TASK_REMOVED", e => {
      const changedTask = JSON.parse(e.data);
      this.removeEntity(this.tasks, changedTask, "tasks");
    });
    this.evtSource.addEventListener("PARAM_VALUE_REMOVED", e => {
      const changedParamValue = JSON.parse(e.data);
      this.removeEntity(this.paramValues, changedParamValue, "paramValues");
      let param = this.params[changedParamValue.param];
      const previousIndex = param.values.findIndex(function (e) {
        return e.uuid === changedParamValue.uuid;
      });

      if (previousIndex >= 0) {
        param.values.splice(previousIndex, 1);
        this.updateEntity(this.params, param, "params");
      }
    });
    this.evtSource.addEventListener("PARAM_REMOVED", e => {
      const changedParam = JSON.parse(e.data);
      this.removeEntity(this.params, changedParam, "params");
    });
    this.standardView = new _View__WEBPACK_IMPORTED_MODULE_2__["default"](true);

    let updateTaskNames = () => {
      for (const key of Object.keys(this.tasks)) {
        if (!this.tasks[key].is_test) {
          let node = this.standardView.taskByUuid[key];
          this.tasks[key].nameParamValues = this.standardView.getNodeParamValuePath(node, this.tasks[key]);
          this.tasks[key].try = this.standardView.keyInDict(node.children, key);
        } else {
          this.tasks[key].nameParamValues = [];
          this.tasks[key].try = 0;
        }
      }
    };

    this.onAdd("tasks", task => {
      if (!task.is_test) this.standardView.addTask(task);
      updateTaskNames();
    });
    this.onRemove("tasks", task => {
      if (!task.is_test) this.standardView.removeTask(task);
      updateTaskNames();
    });
    this.onChange("params", params => {
      this.standardView.updateParams(Object.values(params));
      updateTaskNames();
    });
    this.onChange("tasks", tasks => {
      this.standardView.updateTasks(tasks);
    });
  }

  updateEntity(entities, newEntity, entityType, key = "uuid") {
    const isNew = !(newEntity[key] in entities);
    entities[newEntity[key]] = newEntity;
    if (isNew) this.throwOnAddEvent(newEntity, entityType);
    this.throwOnChangeEvent(entities, entityType, newEntity[key]);
  }

  removeEntity(entities, entityToRemove, entityType, key = "uuid") {
    let entity = entities[entityToRemove[key]];
    delete entities[entityToRemove[key]];
    this.throwOnRemoveEvent(entity, entityType);
    this.throwOnChangeEvent(entities, entityType, entityToRemove[key]);
  }

  throwOnChangeEvent(entities, entityType, key) {
    let entitiesClone = Object.assign({}, entities);

    for (let listener of this.onChangeListeners[entityType]) {
      listener(entitiesClone, key);
    }
  }

  throwOnAddEvent(entity, entityType) {
    for (let listener of this.onAddListeners[entityType]) {
      listener(entity);
    }
  }

  throwOnRemoveEvent(entity, entityType) {
    for (let listener of this.onRemoveListeners[entityType]) {
      listener(entity);
    }
  }

  onChange(entityType, listener) {
    this.onChangeListeners[entityType].push(listener);
  }

  removeOnChange(entityType, listener) {
    const listenerIndex = this.onChangeListeners[entityType].findIndex(listener);
    if (listenerIndex >= 0) this.onChangeListeners[entityType].splice(listenerIndex, 1);
  }

  onAdd(entityType, listener) {
    this.onAddListeners[entityType].push(listener);
  }

  removeOnAdd(entityType, listener) {
    const listenerIndex = this.onAddListeners[entityType].findIndex(listener);
    if (listenerIndex >= 0) this.onAddListeners[entityType].splice(listenerIndex, 1);
  }

  onRemove(entityType, listener) {
    this.onRemoveListeners[entityType].push(listener);
  }

  removeOnRemove(entityType, listener) {
    const listenerIndex = this.onRemoveListeners[entityType].findIndex(listener);
    if (listenerIndex >= 0) this.onRemoveListeners[entityType].splice(listenerIndex, 1);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Repository);

/***/ }),

/***/ "./src/Scheduler.js":
/*!**************************!*\
  !*** ./src/Scheduler.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Device__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Device */ "./src/Device.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Prompt */ "./src/Prompt.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/Scheduler.js";





class Scheduler extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      max_running: 1,
      hiddenDevices: {}
    };
    this.props.evtSource.addEventListener("SCHEDULER_OPTIONS", e => {
      const options = JSON.parse(e.data);
      this.setState({
        max_running: options.max_running
      });
    });
    this.promptAddDeviceRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.openMaxRunningDialogRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.updateTasks = this.updateTasks.bind(this);
    this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
    this.hideDevice = this.hideDevice.bind(this);
    this.shouldShowDevice = this.shouldShowDevice.bind(this);
  }

  static refreshRunTime(task) {
    task.run_time = parseInt((Date.now() - task.start_time) / 1000);
  }

  componentDidMount() {
    var pm = this;
    this.timerID = setInterval(function () {
      const tasks = pm.state.tasks.slice();
      tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_2__["default"].RUNNING).forEach(task => Scheduler.refreshRunTime(task));
      pm.setState({
        tasks: tasks
      });
    }, 1000);
    this.props.repository.onChange("tasks", this.updateTasks);
    this.updateTasks(this.props.repository.tasks);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.props.repository.removeOnChange("tasks", this.updateTasks);
  }

  updateTasks(tasks) {
    this.setState({
      tasks: Object.values(tasks).filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_2__["default"].RUNNING || task.state === _Global__WEBPACK_IMPORTED_MODULE_2__["default"].QUEUED)
    });
  }

  openMaxRunningDialog() {
    this.openMaxRunningDialogRefs.current.openDialog();
  }

  hideDevice(device) {
    const hiddenDevices = Object.assign({}, this.state.hiddenDevices);
    hiddenDevices[device.uuid] = true;
    this.setState({
      hiddenDevices: hiddenDevices
    });
  }

  showDevice(device) {
    const hiddenDevices = Object.assign({}, this.state.hiddenDevices);
    hiddenDevices[device.uuid] = false;
    this.setState({
      hiddenDevices: hiddenDevices
    });
    fetch("/connect_device/" + device.uuid).then(res => res.json()).then(result => {});
  }

  shouldShowDevice(device) {
    return device.uuid in this.state.hiddenDevices && !this.state.hiddenDevices[device.uuid] || !(device.uuid in this.state.hiddenDevices) && device.is_connected !== 0;
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "scheduler",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, "Add device"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu",
      "aria-labelledby": "dropdownMenuButton",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, this.props.devices.filter(device => !this.shouldShowDevice(device)).map(device => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-item",
      onClick: () => this.showDevice(device),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106
      },
      __self: this
    }, device.name)), this.props.devices.filter(device => !this.shouldShowDevice(device)).length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-divider",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-item",
      onClick: () => this.promptAddDeviceRefs.current.openDialog(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111
      },
      __self: this
    }, "Add new device"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Prompt__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ref: this.promptAddDeviceRefs,
      header: "Add new device",
      text: "Specify the ip address and the port of the new device:",
      url: "/add_device",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mock-device",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 116
      },
      __self: this
    }), this.props.devices.filter(this.shouldShowDevice).map(device => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Device__WEBPACK_IMPORTED_MODULE_1__["default"], {
      device: device,
      tasks: this.state.tasks.filter(task => task.device === device.uuid),
      hideDevice: this.hideDevice,
      highlightTask: this.props.highlightTask,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mock-device",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Scheduler);

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/*! exports provided: TaskName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskName", function() { return TaskName; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prompt */ "./src/Prompt.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/Task.js";




class TaskName extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  componentDidMount() {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.wrapperRef.current).find('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.wrapperRef.current).find('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    if (this.props.is_test) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        ref: this.wrapperRef,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }, "Test");
    } else {
      if (this.props.name.length > 0) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          ref: this.wrapperRef,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          },
          __self: this
        }, this.props.name.map((name, i) => {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            key: i,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          }, i !== 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "separator",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            },
            __self: this
          }, "/"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            "data-toggle": "tooltip",
            "data-placement": "bottom",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 38
            },
            __self: this
          }, name));
        }));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          ref: this.wrapperRef,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }, "Default config");
      }
    }
  }

}

function TaskStatus(props) {
  if (props.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING) {
    function pad(n) {
      n = parseInt(n);
      return n < 10 ? "0" + n : n;
    }

    function renderTime(time) {
      if (time > 0) {
        if (time >= 3600) return pad(time / 3600) + ":" + pad(time % 3600 / 60) + ":" + pad(time % 60);else return pad(time / 60) + ":" + pad(time % 60);
      } else return "--:--";
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "time",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      },
      __self: this
    }, renderTime(props.run_time), " / ", renderTime(props.total_time));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "time",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      },
      __self: this
    }, props.index + 1);
  }
}

function TaskProgress(props) {
  if (props.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING) {
    var style = {
      width: (props.mean_iteration_time > 0 ? Math.min(1, ((props.run_time + props.start_time - props.iteration_update_time) / props.mean_iteration_time + props.finished_iterations) / props.total_iterations) * 100 : 0) + '%'
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "progress",
      style: style,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80
      },
      __self: this
    });
  } else {
    return "";
  }
}

class TaskToolbar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.pause = this.pause.bind(this);
    this.saveNow = this.saveNow.bind(this);
    this.cancel = this.cancel.bind(this);
    this.runNow = this.runNow.bind(this);
    this.openExtraDialog = this.openExtraDialog.bind(this);
    this.promptExtraRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.openLog = this.openLog.bind(this);
    this.clone = this.clone.bind(this);
    this.terminate = this.terminate.bind(this);
    this.createCheckpoint = this.createCheckpoint.bind(this);
  }

  pause() {
    fetch("/pause/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  saveNow() {
    fetch("/save_now/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  createCheckpoint() {
    fetch("/create_checkpoint/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  cancel() {
    fetch("/cancel/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  runNow() {
    fetch("/run_now/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  openExtraDialog() {
    this.promptExtraRefs.current.openDialog();
  }

  openLog() {
    window.open("/log/" + this.props.task.uuid, '_blank');
  }

  clone() {
    fetch("/clone_task/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  terminate() {
    fetch("/terminate/" + this.props.task.uuid).then(res => res.json()).then(result => {}, error => {});
  }

  render() {
    let currentAction = "";

    if (this.props.task.is_pausing) {
      currentAction = "pausing...";
    } else if (this.props.task.is_saving) {
      currentAction = "saving...";
    } else if (this.props.task.creating_checkpoint) {
      currentAction = "checkpoint...";
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 211
      },
      __self: this
    }, this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 213
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.pause,
      title: "Pause the task after the current iteration",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 214
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-pause",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 215
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 215
      },
      __self: this
    }, "Pause")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.saveNow,
      title: "Force the task to save after the current iteration",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 217
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-save",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218
      },
      __self: this
    }, "Save now!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.openExtraDialog,
      title: "Change the scheduled number of total iterations",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 220
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-edit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 221
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 221
      },
      __self: this
    }, "Change")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 223
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action dropdown-toggle",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 224
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-ellipsis-v",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 225
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 227
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.openLog,
      title: "View the log",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-file-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 229
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 229
      },
      __self: this
    }, "Log")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.terminate,
      title: "Terminate task",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 231
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-skull-crossbones",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 232
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 232
      },
      __self: this
    }, "Terminate")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.createCheckpoint,
      title: "Create checkpoint",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 234
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "far fa-flag",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 235
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 235
      },
      __self: this
    }, "Checkpoint")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "current-action",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 239
      },
      __self: this
    }, currentAction)), this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 245
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.runNow,
      title: "Pause one of the running tasks and start this one instead",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 246
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-exclamation-triangle",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 247
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 247
      },
      __self: this
    }, "Run now!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.openExtraDialog,
      title: "Change the scheduled number of total iterations",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-edit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 250
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 250
      },
      __self: this
    }, "Change")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 252
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action dropdown-toggle",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 253
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-ellipsis-v",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 254
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 256
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.cancel,
      title: "Remove this task from the queue",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 257
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-times",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 258
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 258
      },
      __self: this
    }, "Cancel"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Prompt__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref: this.promptExtraRefs,
      defaultValue: this.props.task.total_iterations,
      header: "Change total iterations?",
      text: "Specify the new number of iterations, you want the task to run:",
      url: "/change/" + this.props.task.uuid,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 264
      },
      __self: this
    }));
  }

}

class Task extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.taskRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.dragEnterCounter = 0;
  }

  onMouseDown(e) {
    this.target = e.target;
  }

  onDragStart(e) {
    e.dataTransfer.setData("text/plain", this.props.task.uuid);
  }

  onDragOver(e) {
    if (this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
    }
  }

  onDrop(e) {
    if (this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
      fetch("/reorder_task/" + e.dataTransfer.getData("text/plain") + "/" + this.props.index).then(res => res.json()).then(result => {}, error => {});
      this.dragEnterCounter = 0;
      this.taskRef.current.className = "task";
    }
  }

  onDragEnter(e) {
    if (this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
      this.taskRef.current.className = "task on-drag-over";
      this.dragEnterCounter++;
    }
  }

  onDragLeave(e) {
    if (this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED && this.props.task.uuid !== e.dataTransfer.getData("text/plain")) {
      e.preventDefault();
      this.dragEnterCounter--;
      if (this.dragEnterCounter === 0) this.taskRef.current.className = "task";
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      ref: this.taskRef,
      className: "task",
      onDragOver: this.onDragOver,
      onDragLeave: this.onDragLeave,
      onDragEnter: this.onDragEnter,
      onDrop: this.onDrop,
      onDragStart: this.onDragStart,
      onMouseDown: this.onMouseDown,
      draggable: this.props.task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED ? "true" : "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 335
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 336
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 337
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "project-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 338
      },
      __self: this
    }, "Task"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "status",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 339
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TaskStatus, {
      index: this.props.index,
      state: this.props.task.state,
      total_time: this.props.task.total_time,
      run_time: this.props.task.run_time,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 340
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "iterations",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 341
      },
      __self: this
    }, this.props.task.finished_iterations, " / ", this.props.task.total_iterations))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TaskProgress, {
      state: this.props.task.state,
      total_iterations: this.props.task.total_iterations,
      run_time: this.props.task.run_time,
      start_time: this.props.task.start_time_timestamp,
      mean_iteration_time: this.props.task.mean_iteration_time,
      finished_iterations: this.props.task.finished_iterations,
      iteration_update_time: this.props.task.iteration_update_time,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 344
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "param-name",
      onClick: () => this.props.highlightTask(this.props.task),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 345
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "try-number",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 345
      },
      __self: this
    }, this.props.task.try), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TaskName, {
      task: this.props.task,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 345
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TaskToolbar, {
      task: this.props.task,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 347
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Task);

/***/ }),

/***/ "./src/TaskContainer.js":
/*!******************************!*\
  !*** ./src/TaskContainer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/View.js");
/* harmony import */ var _ParamTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParamTab */ "./src/ParamTab.js");
/* harmony import */ var _TaskTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskTab */ "./src/TaskTab.js");
/* harmony import */ var _ParamViewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ParamViewer */ "./src/ParamViewer.js");






class TaskContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.filterHasUpdated = this.filterHasUpdated.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.addParamCollapse = this.addParamCollapse.bind(this);
    this.removeParamCollapse = this.removeParamCollapse.bind(this);
    this.addParamGroup = this.addParamGroup.bind(this);
    this.removeParamGroup = this.removeParamGroup.bind(this);
    this.replaceUuidsWithTasks = this.replaceUuidsWithTasks.bind(this);
    this.loadFilter = this.loadFilter.bind(this);
    this.saveFilter = this.saveFilter.bind(this);
  }

  componentDidMount() {
    this.props.repository.onChange("tasks", this.updateTasks);
    this.props.repository.onChange("params", this.updateParams);
    this.updateParams(this.props.repository.params);
    this.updateTasks(this.props.repository.task_list);
    this.filterHasUpdated();
  }

  componentWillUnmount() {
    this.props.repository.removeOnChange("tasks", this.updateTasks);
    this.props.repository.removeOnChange("params", this.updateParams);
  }

  replaceUuidsWithTasks(tasks, task_lookup) {
    for (let key in tasks) {
      if (tasks[key] instanceof Object && !("uuid" in tasks[key])) {
        this.replaceUuidsWithTasks(tasks[key], task_lookup);
      } else {
        let task = tasks[key];
        let replacement = {
          "name": task.name,
          "metrics": task.metrics
        };
        if (task.uuid in this.props.repository.tasks) replacement["task"] = this.props.repository.tasks[task.uuid];else {
          replacement["task"] = null;
          fetch("/task_details/" + task.uuid).then(res => res.json()).then(result => {});
        }
        task_lookup[task.uuid] = replacement;
        tasks[key] = replacement;
      }
    }
  }

  filterHasUpdated() {
    var data = new FormData();
    var dataJson = {};

    if (this.state.paramFilterEnabled) {
      dataJson['filter'] = this.state.selectedParamValues;
    } else {
      dataJson['filter'] = {};
    }

    dataJson['collapse'] = this.state.collapsedParams;
    dataJson['group'] = this.state.groupedParams;
    dataJson['sort_col'] = this.state.sorting_tasks[0];
    dataJson['sort_dir'] = this.state.sorting_tasks[1] ? "DESC" : "ASC";
    data.append("data", JSON.stringify(dataJson));
    let self = this;
    fetch("filter_tasks", {
      method: "POST",
      body: data
    }).then(res => res.json()).then(result => {
      let task_lookup = {};
      console.log(result);
      this.replaceUuidsWithTasks(result[0], task_lookup);
      console.log(result);
      self.setState({
        tasks: result[0],
        metric_superset: result[1].sort(),
        task_lookup: task_lookup
      });
    }, error => {});
  }

  saveFilter(saveName) {
    var data = new FormData();
    var dataJson = {};

    if (this.state.paramFilterEnabled) {
      dataJson['filter'] = this.state.selectedParamValues;
    } else {
      dataJson['filter'] = {};
    }

    dataJson['collapse'] = this.state.collapsedParams;
    dataJson['group'] = this.state.groupedParams;
    dataJson['saveName'] = saveName;
    data.append("data", JSON.stringify(dataJson));
    fetch("save_filter", {
      method: "POST",
      body: data
    });
  }

  loadFilter(data) {
    this.setState({
      selectedParamValues: data.filter,
      collapsedParams: data.collapse,
      groupedParams: data.group
    }, () => this.filterHasUpdated());
  }

  updateParams(params) {
    params = Object.values(params); // this.filterView.updateParams(params);

    let paramsByGroup = {};

    for (const param of params) {
      const group = param.group.length > 0 ? param.group[0] : '';
      if (!(group in paramsByGroup)) paramsByGroup[group] = [];
      paramsByGroup[group].push(param);
    }

    this.setState({
      params: params,
      paramsByGroup: paramsByGroup
    });
  }

  updateTasks(all_tasks, changed) {
    let task_lookup = Object.assign({}, this.state.task_lookup);

    if (changed in task_lookup) {
      task_lookup[changed].task = all_tasks[changed];
    }

    this.setState({
      task_lookup: task_lookup,
      tasks: this.state.tasks instanceof Array ? this.state.tasks.slice() : Object.assign({}, this.state.tasks)
    });
  }

  toggleSelection(param, value, args) {
    const selectedParamValues = Object.assign({}, this.state.selectedParamValues);

    if (value === null) {
      if (param.uuid in selectedParamValues) {
        delete selectedParamValues[param.uuid];
      } else {
        selectedParamValues[param.uuid] = [];
      }
    } else {
      const newValue = [value.uuid, ...args];

      if (param.uuid in selectedParamValues) {
        const existingIndex = selectedParamValues[param.uuid].findIndex(paramValue => newValue.length === paramValue.length && newValue.every((value, index) => value === paramValue[index]));
        if (existingIndex !== -1) selectedParamValues[param.uuid].splice(existingIndex, 1);else selectedParamValues[param.uuid].push(newValue);
      } else {
        selectedParamValues[param.uuid] = [newValue];
      }
    }

    this.setState({
      selectedParamValues: selectedParamValues
    }, () => this.filterHasUpdated());
  }

  addParamCollapse(param) {
    let collapsedParams = this.state.collapsedParams.slice();
    let index = collapsedParams.indexOf(param.uuid);

    if (index === -1) {
      collapsedParams.push(param.uuid);
    }

    this.setState({
      collapsedParams: collapsedParams
    }, () => this.filterHasUpdated());
  }

  removeParamCollapse(param) {
    let collapsedParams = this.state.collapsedParams.slice();
    let index = collapsedParams.indexOf(param.uuid);

    if (index !== -1) {
      collapsedParams.splice(index, 1);
      ;
    }

    this.setState({
      collapsedParams: collapsedParams
    }, () => this.filterHasUpdated());
  }

  addParamGroup(params) {
    if (params.length === 0) return;

    for (let i = 0; i < params.length; i++) params[i] = params[i].uuid;

    let groupedParams = this.state.groupedParams.slice();
    groupedParams.push(params);
    this.setState({
      groupedParams: groupedParams
    }, () => this.filterHasUpdated());
  }

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  removeParamGroup(params) {
    let groupedParams = this.state.groupedParams.slice();
    let index = -1;

    for (let i = 0; i < groupedParams.length; i++) {
      if (this.arraysEqual(groupedParams[i], params)) {
        index = i;
      }
    }

    if (index !== -1) {
      groupedParams.splice(index, 1);
    }

    this.setState({
      groupedParams: groupedParams
    }, () => this.filterHasUpdated());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TaskContainer);

/***/ }),

/***/ "./src/TaskEditor.js":
/*!***************************!*\
  !*** ./src/TaskEditor.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "./src/ConfigEditor.js");
/* harmony import */ var _ParamFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParamFilter */ "./src/ParamFilter.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/TaskEditor.js";





class TaskEditor extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    let selectedParamValues = {};

    for (const param of props.params) {
      if (param.values.length > 0) selectedParamValues[param.uuid] = [param.values[0].uuid];
    }

    this.state = {
      selectedParamValues: selectedParamValues,
      uuid_to_load: null,
      total_iterations: "",
      save_interval: "0",
      checkpoint_interval: "0",
      open: false,
      command: "",
      commandHint: "",
      isTest: false,
      device: null
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.run = this.run.bind(this);
    this.new = this.new.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onTotalIterationsChange = this.onTotalIterationsChange.bind(this);
    this.onCheckpointIntervalChange = this.onCheckpointIntervalChange.bind(this);
    this.onSaveIntervalChange = this.onSaveIntervalChange.bind(this);
    this.copyCommand = this.copyCommand.bind(this);
    this.onIsTestChange = this.onIsTestChange.bind(this);
    this.onDeviceChange = this.onDeviceChange.bind(this);
    this.wrapperRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.commandInput = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  open(task) {
    let selectedParamValues = Object.assign({}, this.state.selectedParamValues);

    for (const param of this.props.params) {
      if (param.values.length > 0) {
        let suitableParamValue = null;
        let args = [];

        for (const value of task.paramValues) {
          if (value[0].param === param.uuid) {
            suitableParamValue = value[0];
            args = value.slice(1);
            break;
          }
        }

        if (suitableParamValue === null) selectedParamValues[param.uuid] = [param.deprecated_param_value.uuid, ...param.deprecated_param_value.template_deprecated];else selectedParamValues[param.uuid] = [suitableParamValue.uuid, ...args];
      }
    }

    this.setState({
      selectedParamValues: selectedParamValues,
      open: true,
      isTest: task.is_test,
      device: this.state.device === null ? this.props.devices[0].uuid : this.state.device,
      total_iterations: task.total_iterations
    }, () => this.updateCommand(selectedParamValues));
  }

  new() {
    let selectedParamValues = Object.assign({}, this.state.selectedParamValues);

    for (const param of this.props.params) {
      if (!(param.uuid in selectedParamValues) && param.values.length > 0) selectedParamValues[param.uuid] = [param.default_param_value.uuid, ...param.default_param_value.template_defaults];
    }

    this.setState({
      selectedParamValues: selectedParamValues,
      open: true,
      device: this.state.device === null ? this.props.devices[0].uuid : this.state.device
    });
    this.updateCommand(selectedParamValues);
  }

  close() {
    this.setState({
      param_value: null,
      open: false
    });
  }

  run() {
    var data = new FormData();
    var dataJson = {};
    dataJson['params'] = this.state.selectedParamValues;
    dataJson['config'] = {
      "save_interval": parseInt(this.state.save_interval),
      "checkpoint_interval": parseInt(this.state.checkpoint_interval)
    };
    dataJson['device'] = this.state.device;
    data.append("data", JSON.stringify(dataJson));
    var url = "/" + (this.state.isTest ? "test" : "start") + "/" + this.state.total_iterations;
    fetch(url, {
      method: "POST",
      body: data
    }).then(res => res.json()).then(result => {}, error => {});
    this.close();
  }

  onSelectionChange(param, value, arg = []) {
    const selectedParamValues = Object.assign({}, this.state.selectedParamValues);
    selectedParamValues[param.uuid] = [value.uuid];
    selectedParamValues[param.uuid] = selectedParamValues[param.uuid].concat(arg);
    this.setState({
      selectedParamValues: selectedParamValues
    });
    this.updateCommand(selectedParamValues);
  }

  onTotalIterationsChange(event) {
    this.setState({
      total_iterations: event.target.value
    });
    this.updateCommand(null, event.target.value);
  }

  onSaveIntervalChange(event) {
    this.setState({
      save_interval: event.target.value
    });
  }

  onCheckpointIntervalChange(event) {
    this.setState({
      checkpoint_interval: event.target.value
    });
  }

  updateCommand(selectedParamValues = null, total_iterations = null) {
    if (selectedParamValues === null) selectedParamValues = this.state.selectedParamValues;
    if (total_iterations === null) total_iterations = this.state.total_iterations;
    let paramValues = "";

    for (const param of this.props.params) {
      if (param.uuid in selectedParamValues) {
        paramValues += param.uuid + " " + selectedParamValues[param.uuid][0];

        for (let i = 1; i < selectedParamValues[param.uuid].length; i++) paramValues += ":\"" + selectedParamValues[param.uuid][i] + "\"";

        paramValues += " ";
      }
    }

    if (total_iterations !== "") {
      this.setState({
        command: "taskplan " + (this.state.isTest ? "test " : "start ") + total_iterations + " " + paramValues,
        commandHint: "Click to copy"
      });
    } else {
      this.setState({
        command: "",
        commandHint: "Total iterations missing"
      });
    }
  }

  componentDidMount() {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.wrapperRef.current).find('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.wrapperRef.current).find('[data-toggle="tooltip"]').tooltip();
  }

  copyCommand() {
    this.commandInput.current.select();
    document.execCommand("copy");
    this.setState({
      commandHint: "Copied!"
    }, () => jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.commandInput.current).tooltip('show'));
  }

  onIsTestChange(event) {
    this.setState({
      isTest: event.target.checked
    }, () => this.updateCommand());
  }

  onDeviceChange(event) {
    this.setState({
      device: event.target.value
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      ref: this.wrapperRef,
      style: {
        'display': this.state.open ? 'block' : 'none'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 226
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "task-editor slide-editor editor",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 227
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228
      },
      __self: this
    }, "Start task", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-times",
      onClick: this.close,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 229
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 230
      },
      __self: this
    }, "Total iterations:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      value: this.state.total_iterations,
      onChange: this.onTotalIterationsChange,
      required: "required",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 231
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 233
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 234
      },
      __self: this
    }, "Save interval:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      value: this.state.save_interval,
      onChange: this.onSaveIntervalChange,
      required: "required",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 235
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 237
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 238
      },
      __self: this
    }, "Checkpoint interval:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      value: this.state.checkpoint_interval,
      onChange: this.onCheckpointIntervalChange,
      required: "required",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 239
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 241
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 242
      },
      __self: this
    }, "Is test:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      checked: this.state.isTest,
      onChange: this.onIsTestChange,
      type: "checkbox",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 243
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ParamFilter__WEBPACK_IMPORTED_MODULE_2__["default"], {
      selectMultiple: false,
      paramsByGroup: this.props.paramsByGroup,
      selectedParamValues: this.state.selectedParamValues,
      toggleSelection: this.onSelectionChange,
      useTemplateFields: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 245
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfigEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ref: this.configEditor,
      url: "/config/task",
      bases: Object.values(this.state.selectedParamValues),
      preview: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 246
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 247
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 248
      },
      __self: this
    }, "Device:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      value: this.state.device,
      onChange: this.onDeviceChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: this
    }, this.props.devices.map(device => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: device.uuid,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 251
      },
      __self: this
    }, device.name)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 255
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 256
      },
      __self: this
    }, "Command:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "command",
      ref: this.commandInput,
      onClick: this.copyCommand,
      "data-toggle": "tooltip",
      "data-placement": "bottom",
      "data-original-title": this.state.commandHint,
      value: this.state.command,
      readOnly: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 257
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "buttons",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 259
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.run,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 260
      },
      __self: this
    }, "Run"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TaskEditor);

/***/ }),

/***/ "./src/TaskTab.js":
/*!************************!*\
  !*** ./src/TaskTab.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PausedTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PausedTask */ "./src/PausedTask.js");
/* harmony import */ var _TaskEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskEditor */ "./src/TaskEditor.js");
/* harmony import */ var _CollapsedTasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CollapsedTasks */ "./src/CollapsedTasks.js");
/* harmony import */ var _GroupedTasks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GroupedTasks */ "./src/GroupedTasks.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/TaskTab.js";






class TaskTab extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newTask = this.newTask.bind(this);
    this.rerunTask = this.rerunTask.bind(this);
    this.closeEditors = this.closeEditors.bind(this);
    this.paramValueToName = this.paramValueToName.bind(this);
    this.taskEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  closeEditors() {
    this.taskEditor.current.close();
  }

  newTask() {
    this.taskEditor.current.new();
  }

  rerunTask(task) {
    this.taskEditor.current.open(task);
  }

  paramValueToName(paramValue) {
    let paramValueName = paramValue[1].name;

    for (let i = 2; i < paramValue.length; i++) paramValueName = paramValueName.replace("$T" + (i - 2) + "$", paramValue[i]);

    return paramValueName;
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab",
      style: {
        'display': this.props.active ? 'flex' : 'none'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "tasks-tab",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GroupedTasks__WEBPACK_IMPORTED_MODULE_4__["default"], {
      tasks: this.props.tasks,
      rerunTask: this.rerunTask,
      showTask: this.props.showTask,
      filterLikeTask: this.props.filterLikeTask,
      devices: this.props.devices,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TaskEditor__WEBPACK_IMPORTED_MODULE_2__["default"], {
      devices: this.props.devices,
      ref: this.taskEditor,
      params: this.props.params,
      paramsByGroup: this.props.paramsByGroup,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-toolbar",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "buttons",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.newTask,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    }, "New task"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TaskTab);

/***/ }),

/***/ "./src/TaskViewer.js":
/*!***************************!*\
  !*** ./src/TaskViewer.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigEditor */ "./src/ConfigEditor.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global */ "./src/Global.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/TaskViewer.js";





class TaskViewer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      selectedParamValues: {},
      notes: ""
    };
    this.configEditor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.extractCheckpoint = this.extractCheckpoint.bind(this);
    this.notesTextarea = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.updateNotes = this.updateNotes.bind(this);
    this.timer = null;
  }

  componentDidMount() {
    this.props.repository.onChange("tasks", this.updateTasks);
    this.props.repository.onChange("params", this.updateParams);
  }

  componentWillUnmount() {
    this.props.repository.removeOnChange("tasks", this.updateTasks);
    this.props.repository.removeOnChange("params", this.updateParams);
  }

  open(task) {
    let selectedParamValues = {};

    for (const param of this.state.params) {
      if (param.values.length > 0) {
        let suitableParamValue = null;
        let args = [];

        for (const value of task.paramValues) {
          if (value[0].param === param.uuid) {
            suitableParamValue = value[0];
            args = value.slice(1);
            break;
          }
        }

        if (suitableParamValue === null) {
          selectedParamValues[param.uuid] = param.deprecated_param_value.name;
          args = param.deprecated_param_value.template_deprecated;
        } else {
          selectedParamValues[param.uuid] = suitableParamValue.name;
        }

        for (let i = 0; i < args.length; i++) selectedParamValues[param.uuid] = selectedParamValues[param.uuid].replace("$T" + i + "$", args[i]);
      }
    }

    this.setState({
      task: task,
      selectedParamValues: selectedParamValues,
      notes: task.notes
    });
  }

  updateTasks(tasks) {
    if (this.state.task !== null) {
      this.setState({
        task: this.state.task.uuid in tasks ? tasks[this.state.task.uuid] : null
      });
    }
  }

  updateParams(params) {
    this.setState({
      params: Object.values(params)
    });
  }

  close() {
    this.setState({
      task: null
    });
  }

  extractCheckpoint(i) {
    fetch("/extract_checkpoint/" + this.state.task.uuid + "/" + i).then(res => res.json()).then(result => {}, error => {});
  }

  updateNotes(evt) {
    const newValue = evt.target.value;
    const task_uuid = this.state.task.uuid;
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      var data = new FormData();
      var dataJson = {};
      dataJson['notes'] = newValue;
      data.append("data", JSON.stringify(dataJson));
      var url = "set_task_notes/" + task_uuid;
      fetch(url, {
        method: "POST",
        body: data
      }).then(res => res.json()).then(result => {}, error => {});
    }, 1000);
    this.setState({
      notes: newValue
    });
  }

  render() {
    if (this.state.task !== null) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "task-viewer slide-editor editor",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }, "Task details", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        class: "fas fa-times",
        onClick: this.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "try-number",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }, this.state.task.try), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task__WEBPACK_IMPORTED_MODULE_2__["TaskName"], {
        task: this.state.task,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "metadata",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 147
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        },
        __self: this
      }, this.state.task.uuid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }, "Status:"), " ", this.state.task.state === _Global__WEBPACK_IMPORTED_MODULE_3__["default"].RUNNING ? "Running" : this.state.task.state === _Global__WEBPACK_IMPORTED_MODULE_3__["default"].QUEUED ? "Queued" : "Stopped"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, "Iterations:"), " ", this.state.task.finished_iterations, " / ", this.state.task.total_iterations), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, "Started:"), " ", this.state.task.creation_time.toShortStr()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, "Paused:"), " ", this.state.task.saved_time.toShortStr(), " ", this.state.task.had_error == true && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "task-error",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        },
        __self: this
      }, "(Error)")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        },
        __self: this
      }, "Code version:"), " ", this.props.codeVersions[this.state.task.version].name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfigEditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
        ref: this.configEditor,
        url: "/config/existing_task/" + this.state.task.uuid,
        bases: [],
        preview: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, "Notes:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "notes",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        ref: this.notesTextarea,
        value: this.state.notes,
        onChange: evt => this.updateNotes(evt),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, "Parameters"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "params",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, this.state.params.sort((a, b) => {
        return a.name.localeCompare(b.name);
      }).map(param => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }, param.name, ":"), this.state.selectedParamValues[param.uuid]))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        },
        __self: this
      }, "Checkpoints"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "checkpoints",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: this
      }, this.state.task.checkpoints.length > 0 ? this.state.task.checkpoints.map((checkpoint, i) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "iteration",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173
        },
        __self: this
      }, checkpoint.finished_iterations), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "time",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        },
        __self: this
      }, checkpoint.time.toShortStr()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "action",
        onClick: () => this.extractCheckpoint(i),
        title: "Add task based on checkpoint",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-arrow-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        },
        __self: this
      })))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      }, "No checkpoints exist")));
    } else {
      return "";
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TaskViewer);

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Node {
  constructor() {
    this.children = {};
    this.parent = null;
    this.parentKey = "";
  }

  setChild(key, child) {
    this.children[key] = child;
    child.parent = this;
    child.parentKey = key;
  }

  insertAsParent(key, newParent) {
    this.parent.setChild(this.parentKey, newParent);
    newParent.setChild(key, this);
  }

  remove() {
    const key = Object.keys(this.children)[0];
    let child = this.children[key];
    this.parent.children[this.parentKey] = child;
    child.parent = this.parent;
    child.parentKey = this.parentKey;
    return key;
  }

  removeSubtree() {
    delete this.parent.children[this.parentKey];
  }

  getFirstTaskIn() {
    if (Object.keys(this.children).length > 0) return this.children[Object.keys(this.children)[0]].getFirstTaskIn();else return null;
  }

  getAllContainedTasks() {
    let tasks = [];

    for (let child of Object.values(this.children)) {
      tasks = tasks.concat(child.getAllContainedTasks());
    }

    return tasks;
  }

}

class RootNode extends Node {}

class ParamNode extends Node {
  constructor(param) {
    super();
    this.param = param;
  }

}

class CodeVersionNode extends Node {
  constructor() {
    super();
  }

}

class TasksNode extends Node {
  getFirstTaskIn() {
    if (Object.keys(this.children).length > 0) return this.children["0"];else return null;
  }

  getAllContainedTasks() {
    return Object.values(this.children);
  }

}

class View {
  constructor(includeCodeVersion) {
    this.root = new RootNode();
    this.root.setChild("default", new TasksNode());
    this.taskByUuid = {};
    this.tasks = {};
    this.params = [];
    this.paramsByUuid = {};
    this.includeCodeVersion = includeCodeVersion;
  }

  paramCompare(a, b) {
    if (a.sorting !== b.sorting) return a.sorting - b.sorting;else return a.uuid.localeCompare(b.uuid);
  }

  updateParams(params) {
    for (let param of params) {
      this.paramsByUuid[param.uuid] = param;
    }

    let sortedParams = params.slice().sort((a, b) => this.paramCompare(a, b));

    for (let i = 0; i < this.params.length; i++) {
      if (sortedParams.findIndex(x => x.uuid === this.params[i].uuid) === -1) {
        this.removeParam(this.params[i]);
        i--;
      }
    }

    for (let i = 0; i < sortedParams.length; i++) {
      if (i >= this.params.length) {
        this.addParam(sortedParams[i], i);
        continue;
      }

      if (this.params[i].uuid !== sortedParams[i].uuid) {
        if (this.params.findIndex(x => x.uuid === sortedParams[i].uuid) !== -1) {
          const param = this.params.find(x => x.uuid === sortedParams[i].uuid);
          this.removeParam(param);
        }

        this.addParam(sortedParams[i], i);
        if (this.params[i].uuid !== sortedParams[i].uuid) throw new Error("Error with the params in the view");
      } else {
        this.params[i] = sortedParams[i];
      }
    }
  }

  addParam(param, insert_index) {
    this.params.splice(insert_index, 0, param);
    this.addNodeWithParam(param, this.root.children["default"]);
  }

  addNodeWithParam(param, root) {
    if (root instanceof ParamNode && this.paramCompare(this.paramsByUuid[root.param], param) > 0 || root instanceof TasksNode) {
      const firstTask = root.getFirstTaskIn();

      if (firstTask !== null) {
        const formerValueKey = this.getValueKeyToParam(this.tasks[firstTask], param);
        const tasks = root.getAllContainedTasks();
        let tasksWithDifferentParamValue = [];

        for (let task of tasks) {
          if (this.getValueKeyToParam(this.tasks[task], param) !== formerValueKey) tasksWithDifferentParamValue.push(task);
        }

        if (tasksWithDifferentParamValue.length > 0) {
          let newNode = new ParamNode(param.uuid);
          this.addParamBeforeNode(root, newNode, formerValueKey);

          for (let task of tasksWithDifferentParamValue) {
            this.removeTask(this.tasks[task]);
            this.addTask(this.tasks[task]);
          }
        }
      }
    } else {
      for (let key in root.children) this.addNodeWithParam(param, root.children[key]);
    }
  }

  removeParam(param) {
    if (this.params.includes(param)) {
      this.params.splice(this.params.indexOf(param), 1);
      this.removeNodesWithParam(param, this.root.children["default"]);
    }
  }

  removeNodesWithParam(param, root) {
    if (root instanceof ParamNode && root.param === param.uuid) {
      let tasks = [];

      for (let key of Object.keys(root.children).slice(1)) {
        tasks = tasks.concat(this.removeSubtree(root.children[key]));
      }

      root.remove();

      for (let task of tasks) this.addTask(this.tasks[task]);
    } else if (!(root instanceof TasksNode)) {
      for (let key in root.children) this.removeNodesWithParam(param, root.children[key]);
    }
  }

  removeSubtree(root) {
    const tasks = root.getAllContainedTasks();

    for (let task of tasks) {
      delete this.taskByUuid[task.uuid];
    }

    root.removeSubtree();
    return tasks;
  }

  updateTasks(tasks) {
    this.tasks = tasks;
  }

  updateTask(task) {
    this.tasks[task.uuid] = task;
  }

  addTasks(tasks) {
    for (const task of tasks) this.addTask(task);
  }

  addTask(task) {
    this.tasks[task.uuid] = task;
    let node = this.root.children["default"];
    let branching_options = [];
    if (this.includeCodeVersion) branching_options.push("code_version");
    branching_options = branching_options.concat(this.params);

    for (const branching_option of branching_options) {
      let key, nodeExists, suitableParamValue;

      if (typeof branching_option === "object") {
        if (branching_option.deprecated_param_value === '') continue;
        key = this.getValueKeyToParam(task, branching_option);
        nodeExists = node instanceof ParamNode && node.param === branching_option.uuid;
      } else if (branching_option === "code_version") {
        key = task.version;
        nodeExists = node instanceof CodeVersionNode;
      } else {
        throw new Error("Invalid branching option");
      }

      if (!nodeExists) {
        const firstTask = node.getFirstTaskIn();
        if (firstTask === null) continue;
        let newNode, formerKey;

        if (typeof branching_option === "object") {
          formerKey = this.getValueKeyToParam(this.tasks[firstTask], branching_option);
          if (formerKey === key) continue;else {
            newNode = new ParamNode(branching_option.uuid);
          }
        } else if (branching_option === "code_version") {
          if (this.tasks[firstTask].version === key) continue;else {
            newNode = new CodeVersionNode();
            formerKey = this.tasks[firstTask].version;
          }
        } else {
          throw "";
        }

        node = this.addParamBeforeNode(node, newNode, formerKey);
      }

      if (!(key in node.children)) {
        node.setChild(key, new TasksNode());
      }

      node = node.children[key];
    }

    this.insertTask(node, task);
  }

  removeTask(task) {
    let node = this.taskByUuid[task.uuid];
    const key = parseInt(this.keyInDict(node.children, task.uuid));
    delete node.children[key];
    let i = key;

    while (i + 1 in node.children) {
      node.children[i] = node.children[i + 1];
      delete node.children[i + 1];
      i++;
    }

    this.checkNodeForRemoval(node);
    delete this.taskByUuid[task.uuid];
  }

  keyInDict(dict, value) {
    return Object.keys(dict).find(key => dict[key] === value);
  }

  checkNodeForRemoval(node) {
    if (Object.keys(node.children).length === 0 && !(node.parent instanceof RootNode)) {
      delete node.parent.children[node.parentKey];
      this.checkNodeForRemoval(node.parent);
    } else if (Object.keys(node.children).length === 1 && (node instanceof ParamNode || node instanceof CodeVersionNode)) {
      node.remove();
    }
  }

  addParamBeforeNode(node, newNode, formerKey) {
    node.insertAsParent(formerKey, newNode);
    return newNode;
  }

  getValueToParam(task, param) {
    let suitableValue = null;
    let args = [];

    for (const paramValue of task.paramValues) {
      if (paramValue[0].param === param.uuid) {
        suitableValue = paramValue[0];
        args = paramValue.slice(1);
        break;
      }
    }

    if (suitableValue === null) return [param.deprecated_param_value, param.deprecated_param_value.template_deprecated !== undefined ? param.deprecated_param_value.template_deprecated : []];else return [suitableValue, args];
  }

  getValueKeyToParam(task, param) {
    let value = this.getValueToParam(task, param);
    return this.getKeyToParamValue(value);
  }

  getKeyToParamValue(paramValue) {
    let key = paramValue[0].name;

    for (let i = 0; i < paramValue[1].length; i++) {
      key = key.replace("$T" + i + "$", paramValue[1][i]);
    }

    return key;
  }

  compTasks(firstTask, secondTask) {
    return this.tasks[firstTask].creation_time < this.tasks[secondTask].creation_time;
  }

  insertTask(node, task) {
    this.taskByUuid[task.uuid] = node;
    const keys = Object.keys(node.children);
    let targetKey = keys.length;

    for (let i = 0; i < keys.length; i++) {
      if (!this.compTasks(node.children[i], task.uuid)) {
        targetKey = i;
        break;
      }
    }

    for (let i = keys.length - 1; i >= targetKey; i--) {
      node.children[i + 1] = node.children[i];
    }

    node.children[targetKey] = task.uuid;
  }

  getNodeParamValuePath(node, task) {
    let values = [];

    while (!(node instanceof RootNode) && !(node.parent instanceof RootNode) && !(node instanceof CodeVersionNode) && !(node.parent instanceof CodeVersionNode)) {
      values.unshift([this.paramsByUuid[node.parent.param], ...this.getValueToParam(task, this.paramsByUuid[node.parent.param])]);
      node = node.parent;
    }

    return values;
  }

  getSelectedTask(selectedParamValues, codeVersion = null) {
    let node = this.root.children["default"];

    if (node instanceof CodeVersionNode) {
      if (!(codeVersion in node.children)) {
        return [];
      }

      node = node.children[codeVersion];
    }

    for (const param of this.params) {
      if (param.deprecated_param_value !== '') {
        const suitableParamValue = param.values.find(value => value.uuid === selectedParamValues[param.uuid][0]);

        if (suitableParamValue !== undefined) {
          const suitableKey = this.getKeyToParamValue([suitableParamValue, selectedParamValues[param.uuid].slice(1)]);

          if (node instanceof TasksNode || node.param !== param.uuid) {
            const firstTask = node.getFirstTaskIn();
            if (firstTask === null) return [];
            const formerParamValueKey = this.getValueKeyToParam(this.tasks[firstTask], param);
            if (formerParamValueKey === suitableKey) continue;else return [];
          }

          if (!(suitableKey in node.children)) {
            return [];
          }

          node = node.children[suitableKey];
        }
      }
    }

    if (!(node instanceof TasksNode)) throw new Error("Error in selecting tasks");
    return Object.values(node.children);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (View);

/***/ }),

/***/ "./src/fonts/Roboto-300-cyrillic-ext1.woff2":
/*!**************************************************!*\
  !*** ./src/fonts/Roboto-300-cyrillic-ext1.woff2 ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-cyrillic-ext1.d69a2de8.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-300-cyrillic2.woff2":
/*!**********************************************!*\
  !*** ./src/fonts/Roboto-300-cyrillic2.woff2 ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-cyrillic2.a5383450.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-300-greek-ext3.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/Roboto-300-greek-ext3.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-greek-ext3.d4a587db.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-300-greek4.woff2":
/*!*******************************************!*\
  !*** ./src/fonts/Roboto-300-greek4.woff2 ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-greek4.f7059272.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-300-latin-ext6.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/Roboto-300-latin-ext6.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-latin-ext6.e83b8f97.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-300-latin7.woff2":
/*!*******************************************!*\
  !*** ./src/fonts/Roboto-300-latin7.woff2 ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-latin7.ef7c6637.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-300-vietnamese5.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-300-vietnamese5.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-300-vietnamese5.484cddf4.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-cyrillic-ext8.woff2":
/*!**************************************************!*\
  !*** ./src/fonts/Roboto-400-cyrillic-ext8.woff2 ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-cyrillic-ext8.4743c758.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-cyrillic9.woff2":
/*!**********************************************!*\
  !*** ./src/fonts/Roboto-400-cyrillic9.woff2 ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-cyrillic9.8bb64952.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-greek-ext10.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-400-greek-ext10.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-greek-ext10.182ee6a4.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-greek11.woff2":
/*!********************************************!*\
  !*** ./src/fonts/Roboto-400-greek11.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-greek11.c1e9793c.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-latin-ext13.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-400-latin-ext13.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-latin-ext13.455200cb.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-latin14.woff2":
/*!********************************************!*\
  !*** ./src/fonts/Roboto-400-latin14.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-latin14.479970ff.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-400-vietnamese12.woff2":
/*!*************************************************!*\
  !*** ./src/fonts/Roboto-400-vietnamese12.woff2 ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-400-vietnamese12.a8be5b46.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-cyrillic-ext15.woff2":
/*!***************************************************!*\
  !*** ./src/fonts/Roboto-500-cyrillic-ext15.woff2 ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-cyrillic-ext15.378698af.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-cyrillic16.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/Roboto-500-cyrillic16.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-cyrillic16.7fd643e6.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-greek-ext17.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-500-greek-ext17.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-greek-ext17.0f80978b.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-greek18.woff2":
/*!********************************************!*\
  !*** ./src/fonts/Roboto-500-greek18.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-greek18.665639f6.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-latin-ext20.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-500-latin-ext20.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-latin-ext20.b1b80843.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-latin21.woff2":
/*!********************************************!*\
  !*** ./src/fonts/Roboto-500-latin21.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-latin21.020c97dc.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-500-vietnamese19.woff2":
/*!*************************************************!*\
  !*** ./src/fonts/Roboto-500-vietnamese19.woff2 ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-500-vietnamese19.16423fb4.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-cyrillic-ext22.woff2":
/*!***************************************************!*\
  !*** ./src/fonts/Roboto-700-cyrillic-ext22.woff2 ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-cyrillic-ext22.2522a38e.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-cyrillic23.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/Roboto-700-cyrillic23.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-cyrillic23.9d484aa9.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-greek-ext24.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-700-greek-ext24.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-greek-ext24.029b92b9.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-greek25.woff2":
/*!********************************************!*\
  !*** ./src/fonts/Roboto-700-greek25.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-greek25.16d9701c.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-latin-ext27.woff2":
/*!************************************************!*\
  !*** ./src/fonts/Roboto-700-latin-ext27.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-latin-ext27.188b3976.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-latin28.woff2":
/*!********************************************!*\
  !*** ./src/fonts/Roboto-700-latin28.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-latin28.2735a3a6.woff2";

/***/ }),

/***/ "./src/fonts/Roboto-700-vietnamese26.woff2":
/*!*************************************************!*\
  !*** ./src/fonts/Roboto-700-vietnamese26.woff2 ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static_main/media/Roboto-700-vietnamese26.d9600d97.woff2";

/***/ }),

/***/ "./src/fonts/fonts.css":
/*!*****************************!*\
  !*** ./src/fonts/fonts.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../node_modules/postcss-loader/src??postcss!./fonts.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/fonts/fonts.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.js");
var _jsxFileName = "/home/domin/Dokumente/taskplan/taskplan/web/src/index.js";




__webpack_require__(/*! ./less/index.less */ "./src/less/index.less");

__webpack_require__(/*! ./fonts/fonts.css */ "./src/fonts/fonts.css");

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: undefined
}), document.getElementById('root'));

/***/ }),

/***/ "./src/less/index.less":
/*!*****************************!*\
  !*** ./src/less/index.less ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./index.less */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./src/less/index.less");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/domin/Dokumente/taskplan/taskplan/web/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /home/domin/Dokumente/taskplan/taskplan/web/src/index.js */"./src/index.js");


/***/ })

},[[0,"runtime~main",1]]]);
//# sourceMappingURL=main.chunk.js.map