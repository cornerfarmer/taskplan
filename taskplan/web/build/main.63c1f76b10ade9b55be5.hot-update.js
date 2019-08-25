webpackHotUpdate("main",{

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
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, this.props.device.name), this.props.device.is_connected === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.connect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, "Connect"), this.props.device.is_connected === 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.disconnect,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, "Disconnect"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "hide-device",
      onClick: () => this.props.hideDevice(this.props.device),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-times",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "body",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, this.props.device.is_connected !== 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "tasks",
      id: "tasks-running",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70
      },
      __self: this
    }, this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING).length === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "mock-task",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }, "Idle"), this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING).map((task, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: task.uuid,
      task: task,
      index: index,
      highlightTask: this.props.highlightTask,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "queue-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      onClick: this.toggleQueue,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, this.state.showQueue ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-minus",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-plus",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93
      },
      __self: this
    })), "Waiting (", this.props.tasks.filter(task => task.state === _Global__WEBPACK_IMPORTED_MODULE_1__["default"].QUEUED).length, ")"), this.state.showQueue && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "tasks tasks-queued",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
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
        lineNumber: 103
      },
      __self: this
    })))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Device);

/***/ })

})
//# sourceMappingURL=main.63c1f76b10ade9b55be5.hot-update.js.map