webpackHotUpdate("main",{

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
    this.openMaxRunningDialogRefs = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.updateTasks = this.updateTasks.bind(this);
    this.openMaxRunningDialog = this.openMaxRunningDialog.bind(this);
    this.hideDevice = this.hideDevice.bind(this);
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
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "scheduler",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "action",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    }, "Add device"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu",
      "aria-labelledby": "dropdownMenuButton",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, this.props.devices.filter(device => device.uuid in this.state.hiddenDevices && this.state.hiddenDevices[device.uuid]).map(device => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-item",
      onClick: () => this.showDevice(device),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    }, device.name)), this.props.devices.filter(device => device.uuid in this.state.hiddenDevices && this.state.hiddenDevices[device.uuid]).length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-divider",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-item",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96
      },
      __self: this
    }, "Add new device"))), this.props.devices.filter(device => !(device.uuid in this.state.hiddenDevices) || !this.state.hiddenDevices[device.uuid]).map(device => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Device__WEBPACK_IMPORTED_MODULE_1__["default"], {
      device: device,
      tasks: this.state.tasks.filter(task => task.device === device.uuid),
      hideDevice: this.hideDevice,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Scheduler);

/***/ })

})
//# sourceMappingURL=main.e4f7bf2d31f737632f28.hot-update.js.map