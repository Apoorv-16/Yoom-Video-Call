"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(root)/(home)/page",{

/***/ "(app-pages-browser)/./components/MeetingTypeList.tsx":
/*!****************************************!*\
  !*** ./components/MeetingTypeList.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _HomeCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HomeCard */ \"(app-pages-browser)/./components/HomeCard.tsx\");\n/* harmony import */ var _MeetingModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MeetingModal */ \"(app-pages-browser)/./components/MeetingModal.tsx\");\n/* harmony import */ var _stream_io_video_react_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @stream-io/video-react-sdk */ \"(app-pages-browser)/./node_modules/@stream-io/video-react-sdk/dist/index.es.js\");\n/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @clerk/nextjs */ \"(app-pages-browser)/./node_modules/@clerk/clerk-react/dist/index.mjs\");\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loader */ \"(app-pages-browser)/./components/Loader.tsx\");\n/* harmony import */ var _ui_textarea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui/textarea */ \"(app-pages-browser)/./components/ui/textarea.tsx\");\n/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-datepicker */ \"(app-pages-browser)/./node_modules/react-datepicker/dist/react-datepicker.min.js\");\n/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _ui_use_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui/use-toast */ \"(app-pages-browser)/./components/ui/use-toast.ts\");\n/* harmony import */ var _ui_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui/input */ \"(app-pages-browser)/./components/ui/input.tsx\");\n/* eslint-disable camelcase */ /* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\nconst initialValues = {\n    dateTime: new Date(),\n    description: \"\",\n    link: \"\"\n};\nconst MeetingTypeList = ()=>{\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [meetingState, setMeetingState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);\n    const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValues);\n    const [callDetail, setCallDetail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const client = (0,_stream_io_video_react_sdk__WEBPACK_IMPORTED_MODULE_5__.useStreamVideoClient)();\n    const { user } = (0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_10__.useUser)();\n    const { toast } = (0,_ui_use_toast__WEBPACK_IMPORTED_MODULE_8__.useToast)();\n    const createMeeting = async ()=>{\n        if (!client || !user) return;\n        try {\n            if (!values.dateTime) {\n                toast({\n                    title: \"Please select a date and time\"\n                });\n                return;\n            }\n            const id = crypto.randomUUID();\n            const call = client.call(\"default\", id);\n            if (!call) throw new Error(\"Failed to create meeting\");\n            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();\n            const description = values.description || \"Instant Meeting\";\n            await call.getOrCreate({\n                data: {\n                    starts_at: startsAt,\n                    custom: {\n                        description\n                    }\n                }\n            });\n            setCallDetail(call);\n            if (!values.description) {\n                router.push(\"/meeting/\".concat(call.id));\n            }\n            toast({\n                title: \"Meeting Created\"\n            });\n        } catch (error) {\n            console.error(error);\n            toast({\n                title: \"Failed to create Meeting\"\n            });\n        }\n    };\n    if (!client || !user) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Loader__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n        fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n        lineNumber: 68,\n        columnNumber: 32\n    }, undefined);\n    const meetingLink = \"\".concat(\"localhost:3000\", \"/meeting/\").concat(callDetail === null || callDetail === void 0 ? void 0 : callDetail.id);\n    function sanitizeLink(link) {\n        // Remove \"localhost\" patterns with or without port\n        const sanitizedLink = link.replace(/^(https?:\\/\\/)?localhost(:\\d+)?\\/?/i, \"\");\n        // Ensure no trailing slashes or whitespace\n        return sanitizedLink.trim();\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: \"grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_HomeCard__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                img: \"/icons/add-meeting.svg\",\n                title: \"New Meeting\",\n                description: \"Start an instant meeting\",\n                handleClick: ()=>setMeetingState(\"isInstantMeeting\")\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_HomeCard__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                img: \"/icons/join-meeting.svg\",\n                title: \"Join Meeting\",\n                description: \"via invitation link\",\n                className: \"bg-blue-1\",\n                handleClick: ()=>setMeetingState(\"isJoiningMeeting\")\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 87,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_HomeCard__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                img: \"/icons/schedule.svg\",\n                title: \"Schedule Meeting\",\n                description: \"Plan your meeting\",\n                className: \"bg-purple-1\",\n                handleClick: ()=>setMeetingState(\"isScheduleMeeting\")\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 94,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_HomeCard__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                img: \"/icons/recordings.svg\",\n                title: \"View Recordings\",\n                description: \"Meeting Recordings\",\n                className: \"bg-yellow-1\",\n                handleClick: ()=>router.push(\"/recordings\")\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 101,\n                columnNumber: 7\n            }, undefined),\n            !callDetail ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_MeetingModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                isOpen: meetingState === \"isScheduleMeeting\",\n                onClose: ()=>setMeetingState(undefined),\n                title: \"Create Meeting\",\n                handleClick: createMeeting,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col gap-2.5\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"text-base font-normal leading-[22.4px] text-sky-2\",\n                                children: \"Add a description\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                                lineNumber: 117,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_textarea__WEBPACK_IMPORTED_MODULE_7__.Textarea, {\n                                className: \"border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0\",\n                                onChange: (e)=>setValues({\n                                        ...values,\n                                        description: e.target.value\n                                    })\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                                lineNumber: 120,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                        lineNumber: 116,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex w-full flex-col gap-2.5\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"text-base font-normal leading-[22.4px] text-sky-2\",\n                                children: \"Select Date and Time\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                                lineNumber: 128,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_datepicker__WEBPACK_IMPORTED_MODULE_11___default()), {\n                                selected: values.dateTime,\n                                onChange: (date)=>setValues({\n                                        ...values,\n                                        dateTime: date\n                                    }),\n                                showTimeSelect: true,\n                                timeFormat: \"HH:mm\",\n                                timeIntervals: 15,\n                                timeCaption: \"time\",\n                                dateFormat: \"MMMM d, yyyy h:mm aa\",\n                                className: \"w-full rounded bg-dark-3 p-2 focus:outline-none\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                                lineNumber: 131,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                        lineNumber: 127,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 110,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_MeetingModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                isOpen: meetingState === \"isScheduleMeeting\",\n                onClose: ()=>setMeetingState(undefined),\n                title: \"Meeting Created\",\n                handleClick: ()=>{\n                    navigator.clipboard.writeText(meetingLink);\n                    toast({\n                        title: \"Link Copied\"\n                    });\n                },\n                image: \"/icons/checked.svg\",\n                buttonIcon: \"/icons/copy.svg\",\n                className: \"text-center\",\n                buttonText: \"Copy Meeting Link\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 144,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_MeetingModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                isOpen: meetingState === \"isJoiningMeeting\",\n                onClose: ()=>setMeetingState(undefined),\n                title: \"Type the link here\",\n                className: \"text-center\",\n                buttonText: \"Join Meeting\",\n                handleClick: ()=>{\n                    console.log(values.link);\n                    // localhost\n                    // const newlink = `http://${values.link}`;\n                    const sanitizedLink = sanitizeLink(values.link);\n                    console.log(sanitizedLink);\n                    const baseUrl = \"localhost:3000\" || 0;\n                    // const newlink = `${baseUrl}/${sanitizedLink.replace(/^\\//, '')}`;\n                    const newlink = \"\".concat(sanitizedLink.replace(/^\\//, \"\"));\n                    console.log(newlink);\n                    router.push(newlink);\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_input__WEBPACK_IMPORTED_MODULE_9__.Input, {\n                    placeholder: \"Meeting link\",\n                    onChange: (e)=>setValues({\n                            ...values,\n                            link: e.target.value\n                        }),\n                    className: \"border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0\"\n                }, void 0, false, {\n                    fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                    lineNumber: 182,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 159,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_MeetingModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                isOpen: meetingState === \"isInstantMeeting\",\n                onClose: ()=>setMeetingState(undefined),\n                title: \"Start an Instant Meeting\",\n                className: \"text-center\",\n                buttonText: \"Start Meeting\",\n                handleClick: createMeeting\n            }, void 0, false, {\n                fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n                lineNumber: 189,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Apoorv\\\\Zoom Clone\\\\zoom-clone\\\\components\\\\MeetingTypeList.tsx\",\n        lineNumber: 80,\n        columnNumber: 5\n    }, undefined);\n};\n_s(MeetingTypeList, \"tRaUEWSShsUhUsh06Fh6lEXAMm8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _stream_io_video_react_sdk__WEBPACK_IMPORTED_MODULE_5__.useStreamVideoClient,\n        _clerk_nextjs__WEBPACK_IMPORTED_MODULE_10__.useUser,\n        _ui_use_toast__WEBPACK_IMPORTED_MODULE_8__.useToast\n    ];\n});\n_c = MeetingTypeList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MeetingTypeList);\nvar _c;\n$RefreshReg$(_c, \"MeetingTypeList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvTWVldGluZ1R5cGVMaXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNEI7O0FBR0s7QUFDVztBQUVWO0FBQ1E7QUFDOEI7QUFDaEM7QUFDVjtBQUNXO0FBQ007QUFDTDtBQUNQO0FBRW5DLE1BQU1XLGdCQUFnQjtJQUNwQkMsVUFBVSxJQUFJQztJQUNkQyxhQUFhO0lBQ2JDLE1BQU07QUFDUjtBQUVBLE1BQU1DLGtCQUFrQjs7SUFDdEIsTUFBTUMsU0FBU2hCLDBEQUFTQTtJQUN4QixNQUFNLENBQUNpQixjQUFjQyxnQkFBZ0IsR0FBR25CLCtDQUFRQSxDQUU5Q29CO0lBQ0YsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUd0QiwrQ0FBUUEsQ0FBQ1c7SUFDckMsTUFBTSxDQUFDWSxZQUFZQyxjQUFjLEdBQUd4QiwrQ0FBUUE7SUFDNUMsTUFBTXlCLFNBQVNyQixnRkFBb0JBO0lBQ25DLE1BQU0sRUFBRXNCLElBQUksRUFBRSxHQUFHckIsdURBQU9BO0lBQ3hCLE1BQU0sRUFBRXNCLEtBQUssRUFBRSxHQUFHbEIsdURBQVFBO0lBRTFCLE1BQU1tQixnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDSCxVQUFVLENBQUNDLE1BQU07UUFDdEIsSUFBSTtZQUNGLElBQUksQ0FBQ0wsT0FBT1QsUUFBUSxFQUFFO2dCQUNwQmUsTUFBTTtvQkFBRUUsT0FBTztnQkFBZ0M7Z0JBQy9DO1lBQ0Y7WUFDQSxNQUFNQyxLQUFLQyxPQUFPQyxVQUFVO1lBQzVCLE1BQU1DLE9BQU9SLE9BQU9RLElBQUksQ0FBQyxXQUFXSDtZQUNwQyxJQUFJLENBQUNHLE1BQU0sTUFBTSxJQUFJQyxNQUFNO1lBQzNCLE1BQU1DLFdBQ0pkLE9BQU9ULFFBQVEsQ0FBQ3dCLFdBQVcsTUFBTSxJQUFJdkIsS0FBS0EsS0FBS3dCLEdBQUcsSUFBSUQsV0FBVztZQUNuRSxNQUFNdEIsY0FBY08sT0FBT1AsV0FBVyxJQUFJO1lB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QkFDVnVCLFlBQVc7Ozs7OzswQkFJZiw4REFBQzFFLHFEQUFZQTtnQkFDWHNELFFBQVF2QyxpQkFBaUI7Z0JBQ3pCd0MsU0FBUyxJQUFNdkMsZ0JBQWdCQztnQkFDL0JTLE9BQU07Z0JBQ055QixXQUFVO2dCQUNWdUIsWUFBVztnQkFDWHJCLGFBQWE7b0JBRVhaLFFBQVFrQyxHQUFHLENBQUN6RCxPQUFPTixJQUFJO29CQUN2QixZQUFZO29CQUNaLDJDQUEyQztvQkFFM0MsTUFBTW1DLGdCQUFnQkQsYUFBYTVCLE9BQU9OLElBQUk7b0JBQzlDNkIsUUFBUWtDLEdBQUcsQ0FBQzVCO29CQUVaLE1BQU02QixVQUFrQmpDLGdCQUFnQyxJQUFJO29CQUM1RCxvRUFBb0U7b0JBQ3BFLE1BQU1rQyxVQUFVLEdBQW9DLE9BQWpDOUIsY0FBY0MsT0FBTyxDQUFDLE9BQU87b0JBQ2hEUCxRQUFRa0MsR0FBRyxDQUFDRTtvQkFFWi9ELE9BQU95QixJQUFJLENBQUNzQztnQkFBUTswQkFHdEIsNEVBQUN0RSw0Q0FBS0E7b0JBQ0p1RSxhQUFZO29CQUNacEIsVUFBVSxDQUFDQyxJQUFNeEMsVUFBVTs0QkFBRSxHQUFHRCxNQUFNOzRCQUFFTixNQUFNK0MsRUFBRUMsTUFBTSxDQUFDQyxLQUFLO3dCQUFDO29CQUM3RFYsV0FBVTs7Ozs7Ozs7Ozs7MEJBSWQsOERBQUNuRCxxREFBWUE7Z0JBQ1hzRCxRQUFRdkMsaUJBQWlCO2dCQUN6QndDLFNBQVMsSUFBTXZDLGdCQUFnQkM7Z0JBQy9CUyxPQUFNO2dCQUNOeUIsV0FBVTtnQkFDVnVCLFlBQVc7Z0JBQ1hyQixhQUFhNUI7Ozs7Ozs7Ozs7OztBQUlyQjtHQWhMTVo7O1FBQ1dmLHNEQUFTQTtRQU1URyw0RUFBb0JBO1FBQ2xCQyxtREFBT0E7UUFDTkksbURBQVFBOzs7S0FUdEJPO0FBa0xOLCtEQUFlQSxlQUFlQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvTWVldGluZ1R5cGVMaXN0LnRzeD8yMzA4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xyXG4ndXNlIGNsaWVudCc7XHJcblxyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcclxuXHJcbmltcG9ydCBIb21lQ2FyZCBmcm9tICcuL0hvbWVDYXJkJztcclxuaW1wb3J0IE1lZXRpbmdNb2RhbCBmcm9tICcuL01lZXRpbmdNb2RhbCc7XHJcbmltcG9ydCB7IENhbGwsIHVzZVN0cmVhbVZpZGVvQ2xpZW50IH0gZnJvbSAnQHN0cmVhbS1pby92aWRlby1yZWFjdC1zZGsnO1xyXG5pbXBvcnQgeyB1c2VVc2VyIH0gZnJvbSAnQGNsZXJrL25leHRqcyc7XHJcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4vdWkvdGV4dGFyZWEnO1xyXG5pbXBvcnQgUmVhY3REYXRlUGlja2VyIGZyb20gJ3JlYWN0LWRhdGVwaWNrZXInO1xyXG5pbXBvcnQgeyB1c2VUb2FzdCB9IGZyb20gJy4vdWkvdXNlLXRvYXN0JztcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuL3VpL2lucHV0JztcclxuXHJcbmNvbnN0IGluaXRpYWxWYWx1ZXMgPSB7XHJcbiAgZGF0ZVRpbWU6IG5ldyBEYXRlKCksXHJcbiAgZGVzY3JpcHRpb246ICcnLFxyXG4gIGxpbms6ICcnLFxyXG59O1xyXG5cclxuY29uc3QgTWVldGluZ1R5cGVMaXN0ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IFttZWV0aW5nU3RhdGUsIHNldE1lZXRpbmdTdGF0ZV0gPSB1c2VTdGF0ZTxcclxuICAgICdpc1NjaGVkdWxlTWVldGluZycgfCAnaXNKb2luaW5nTWVldGluZycgfCAnaXNJbnN0YW50TWVldGluZycgfCB1bmRlZmluZWRcclxuICA+KHVuZGVmaW5lZCk7XHJcbiAgY29uc3QgW3ZhbHVlcywgc2V0VmFsdWVzXSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZXMpO1xyXG4gIGNvbnN0IFtjYWxsRGV0YWlsLCBzZXRDYWxsRGV0YWlsXSA9IHVzZVN0YXRlPENhbGw+KCk7XHJcbiAgY29uc3QgY2xpZW50ID0gdXNlU3RyZWFtVmlkZW9DbGllbnQoKTtcclxuICBjb25zdCB7IHVzZXIgfSA9IHVzZVVzZXIoKTtcclxuICBjb25zdCB7IHRvYXN0IH0gPSB1c2VUb2FzdCgpO1xyXG5cclxuICBjb25zdCBjcmVhdGVNZWV0aW5nID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFjbGllbnQgfHwgIXVzZXIpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghdmFsdWVzLmRhdGVUaW1lKSB7XHJcbiAgICAgICAgdG9hc3QoeyB0aXRsZTogJ1BsZWFzZSBzZWxlY3QgYSBkYXRlIGFuZCB0aW1lJyB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaWQgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xyXG4gICAgICBjb25zdCBjYWxsID0gY2xpZW50LmNhbGwoJ2RlZmF1bHQnLCBpZCk7XHJcbiAgICAgIGlmICghY2FsbCkgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIG1lZXRpbmcnKTtcclxuICAgICAgY29uc3Qgc3RhcnRzQXQgPVxyXG4gICAgICAgIHZhbHVlcy5kYXRlVGltZS50b0lTT1N0cmluZygpIHx8IG5ldyBEYXRlKERhdGUubm93KCkpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdmFsdWVzLmRlc2NyaXB0aW9uIHx8ICdJbnN0YW50IE1lZXRpbmcnO1xyXG4gICAgICBhd2FpdCBjYWxsLmdldE9yQ3JlYXRlKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBzdGFydHNfYXQ6IHN0YXJ0c0F0LFxyXG4gICAgICAgICAgY3VzdG9tOiB7XHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgc2V0Q2FsbERldGFpbChjYWxsKTtcclxuICAgICAgaWYgKCF2YWx1ZXMuZGVzY3JpcHRpb24pIHtcclxuICAgICAgICByb3V0ZXIucHVzaChgL21lZXRpbmcvJHtjYWxsLmlkfWApO1xyXG4gICAgICB9XHJcbiAgICAgIHRvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ01lZXRpbmcgQ3JlYXRlZCcsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHRvYXN0KHsgdGl0bGU6ICdGYWlsZWQgdG8gY3JlYXRlIE1lZXRpbmcnIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGlmICghY2xpZW50IHx8ICF1c2VyKSByZXR1cm4gPExvYWRlciAvPjtcclxuXHJcbiAgY29uc3QgbWVldGluZ0xpbmsgPSBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vbWVldGluZy8ke2NhbGxEZXRhaWw/LmlkfWA7XHJcbiAgZnVuY3Rpb24gc2FuaXRpemVMaW5rKGxpbms6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyBSZW1vdmUgXCJsb2NhbGhvc3RcIiBwYXR0ZXJucyB3aXRoIG9yIHdpdGhvdXQgcG9ydFxyXG4gICAgY29uc3Qgc2FuaXRpemVkTGluayA9IGxpbmsucmVwbGFjZSgvXihodHRwcz86XFwvXFwvKT9sb2NhbGhvc3QoOlxcZCspP1xcLz8vaSwgJycpO1xyXG4gIFxyXG4gICAgLy8gRW5zdXJlIG5vIHRyYWlsaW5nIHNsYXNoZXMgb3Igd2hpdGVzcGFjZVxyXG4gICAgcmV0dXJuIHNhbml0aXplZExpbmsudHJpbSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTUgbWQ6Z3JpZC1jb2xzLTIgeGw6Z3JpZC1jb2xzLTRcIj5cclxuICAgICAgPEhvbWVDYXJkXHJcbiAgICAgICAgaW1nPVwiL2ljb25zL2FkZC1tZWV0aW5nLnN2Z1wiXHJcbiAgICAgICAgdGl0bGU9XCJOZXcgTWVldGluZ1wiXHJcbiAgICAgICAgZGVzY3JpcHRpb249XCJTdGFydCBhbiBpbnN0YW50IG1lZXRpbmdcIlxyXG4gICAgICAgIGhhbmRsZUNsaWNrPXsoKSA9PiBzZXRNZWV0aW5nU3RhdGUoJ2lzSW5zdGFudE1lZXRpbmcnKX1cclxuICAgICAgLz5cclxuICAgICAgPEhvbWVDYXJkXHJcbiAgICAgICAgaW1nPVwiL2ljb25zL2pvaW4tbWVldGluZy5zdmdcIlxyXG4gICAgICAgIHRpdGxlPVwiSm9pbiBNZWV0aW5nXCJcclxuICAgICAgICBkZXNjcmlwdGlvbj1cInZpYSBpbnZpdGF0aW9uIGxpbmtcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtMVwiXHJcbiAgICAgICAgaGFuZGxlQ2xpY2s9eygpID0+IHNldE1lZXRpbmdTdGF0ZSgnaXNKb2luaW5nTWVldGluZycpfVxyXG4gICAgICAvPlxyXG4gICAgICA8SG9tZUNhcmRcclxuICAgICAgICBpbWc9XCIvaWNvbnMvc2NoZWR1bGUuc3ZnXCJcclxuICAgICAgICB0aXRsZT1cIlNjaGVkdWxlIE1lZXRpbmdcIlxyXG4gICAgICAgIGRlc2NyaXB0aW9uPVwiUGxhbiB5b3VyIG1lZXRpbmdcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImJnLXB1cnBsZS0xXCJcclxuICAgICAgICBoYW5kbGVDbGljaz17KCkgPT4gc2V0TWVldGluZ1N0YXRlKCdpc1NjaGVkdWxlTWVldGluZycpfVxyXG4gICAgICAvPlxyXG4gICAgICA8SG9tZUNhcmRcclxuICAgICAgICBpbWc9XCIvaWNvbnMvcmVjb3JkaW5ncy5zdmdcIlxyXG4gICAgICAgIHRpdGxlPVwiVmlldyBSZWNvcmRpbmdzXCJcclxuICAgICAgICBkZXNjcmlwdGlvbj1cIk1lZXRpbmcgUmVjb3JkaW5nc1wiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiYmcteWVsbG93LTFcIlxyXG4gICAgICAgIGhhbmRsZUNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaCgnL3JlY29yZGluZ3MnKX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHshY2FsbERldGFpbCA/IChcclxuICAgICAgICA8TWVldGluZ01vZGFsXHJcbiAgICAgICAgICBpc09wZW49e21lZXRpbmdTdGF0ZSA9PT0gJ2lzU2NoZWR1bGVNZWV0aW5nJ31cclxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldE1lZXRpbmdTdGF0ZSh1bmRlZmluZWQpfVxyXG4gICAgICAgICAgdGl0bGU9XCJDcmVhdGUgTWVldGluZ1wiXHJcbiAgICAgICAgICBoYW5kbGVDbGljaz17Y3JlYXRlTWVldGluZ31cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtbm9ybWFsIGxlYWRpbmctWzIyLjRweF0gdGV4dC1za3ktMlwiPlxyXG4gICAgICAgICAgICAgIEFkZCBhIGRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxUZXh0YXJlYVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlci1ub25lIGJnLWRhcmstMyBmb2N1cy12aXNpYmxlOnJpbmctMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTBcIlxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cclxuICAgICAgICAgICAgICAgIHNldFZhbHVlcyh7IC4uLnZhbHVlcywgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggdy1mdWxsIGZsZXgtY29sIGdhcC0yLjVcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LW5vcm1hbCBsZWFkaW5nLVsyMi40cHhdIHRleHQtc2t5LTJcIj5cclxuICAgICAgICAgICAgICBTZWxlY3QgRGF0ZSBhbmQgVGltZVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8UmVhY3REYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3ZhbHVlcy5kYXRlVGltZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGRhdGUpID0+IHNldFZhbHVlcyh7IC4uLnZhbHVlcywgZGF0ZVRpbWU6IGRhdGUhIH0pfVxyXG4gICAgICAgICAgICAgIHNob3dUaW1lU2VsZWN0XHJcbiAgICAgICAgICAgICAgdGltZUZvcm1hdD1cIkhIOm1tXCJcclxuICAgICAgICAgICAgICB0aW1lSW50ZXJ2YWxzPXsxNX1cclxuICAgICAgICAgICAgICB0aW1lQ2FwdGlvbj1cInRpbWVcIlxyXG4gICAgICAgICAgICAgIGRhdGVGb3JtYXQ9XCJNTU1NIGQsIHl5eXkgaDptbSBhYVwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQgYmctZGFyay0zIHAtMiBmb2N1czpvdXRsaW5lLW5vbmVcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9NZWV0aW5nTW9kYWw+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPE1lZXRpbmdNb2RhbFxyXG4gICAgICAgICAgaXNPcGVuPXttZWV0aW5nU3RhdGUgPT09ICdpc1NjaGVkdWxlTWVldGluZyd9XHJcbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRNZWV0aW5nU3RhdGUodW5kZWZpbmVkKX1cclxuICAgICAgICAgIHRpdGxlPVwiTWVldGluZyBDcmVhdGVkXCJcclxuICAgICAgICAgIGhhbmRsZUNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KG1lZXRpbmdMaW5rKTtcclxuICAgICAgICAgICAgdG9hc3QoeyB0aXRsZTogJ0xpbmsgQ29waWVkJyB9KTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICBpbWFnZT17Jy9pY29ucy9jaGVja2VkLnN2Zyd9XHJcbiAgICAgICAgICBidXR0b25JY29uPVwiL2ljb25zL2NvcHkuc3ZnXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCJcclxuICAgICAgICAgIGJ1dHRvblRleHQ9XCJDb3B5IE1lZXRpbmcgTGlua1wiXHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxNZWV0aW5nTW9kYWxcclxuICAgICAgICBpc09wZW49e21lZXRpbmdTdGF0ZSA9PT0gJ2lzSm9pbmluZ01lZXRpbmcnfVxyXG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldE1lZXRpbmdTdGF0ZSh1bmRlZmluZWQpfVxyXG4gICAgICAgIHRpdGxlPVwiVHlwZSB0aGUgbGluayBoZXJlXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiXHJcbiAgICAgICAgYnV0dG9uVGV4dD1cIkpvaW4gTWVldGluZ1wiXHJcbiAgICAgICAgaGFuZGxlQ2xpY2s9eygpID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29uc29sZS5sb2codmFsdWVzLmxpbmspO1xyXG4gICAgICAgICAgLy8gbG9jYWxob3N0XHJcbiAgICAgICAgICAvLyBjb25zdCBuZXdsaW5rID0gYGh0dHA6Ly8ke3ZhbHVlcy5saW5rfWA7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnN0IHNhbml0aXplZExpbmsgPSBzYW5pdGl6ZUxpbmsodmFsdWVzLmxpbmspO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coc2FuaXRpemVkTGluayk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnN0IGJhc2VVcmw6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnO1xyXG4gICAgICAgICAgLy8gY29uc3QgbmV3bGluayA9IGAke2Jhc2VVcmx9LyR7c2FuaXRpemVkTGluay5yZXBsYWNlKC9eXFwvLywgJycpfWA7XHJcbiAgICAgICAgICBjb25zdCBuZXdsaW5rID0gYCR7c2FuaXRpemVkTGluay5yZXBsYWNlKC9eXFwvLywgJycpfWA7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhuZXdsaW5rKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcm91dGVyLnB1c2gobmV3bGluayl9XHJcbiAgICAgICAgfVxyXG4gICAgICA+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIk1lZXRpbmcgbGlua1wiXHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFZhbHVlcyh7IC4uLnZhbHVlcywgbGluazogZS50YXJnZXQudmFsdWUgfSl9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJib3JkZXItbm9uZSBiZy1kYXJrLTMgZm9jdXMtdmlzaWJsZTpyaW5nLTAgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0wXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L01lZXRpbmdNb2RhbD5cclxuXHJcbiAgICAgIDxNZWV0aW5nTW9kYWxcclxuICAgICAgICBpc09wZW49e21lZXRpbmdTdGF0ZSA9PT0gJ2lzSW5zdGFudE1lZXRpbmcnfVxyXG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldE1lZXRpbmdTdGF0ZSh1bmRlZmluZWQpfVxyXG4gICAgICAgIHRpdGxlPVwiU3RhcnQgYW4gSW5zdGFudCBNZWV0aW5nXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiXHJcbiAgICAgICAgYnV0dG9uVGV4dD1cIlN0YXJ0IE1lZXRpbmdcIlxyXG4gICAgICAgIGhhbmRsZUNsaWNrPXtjcmVhdGVNZWV0aW5nfVxyXG4gICAgICAvPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZWV0aW5nVHlwZUxpc3Q7XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkhvbWVDYXJkIiwiTWVldGluZ01vZGFsIiwidXNlU3RyZWFtVmlkZW9DbGllbnQiLCJ1c2VVc2VyIiwiTG9hZGVyIiwiVGV4dGFyZWEiLCJSZWFjdERhdGVQaWNrZXIiLCJ1c2VUb2FzdCIsIklucHV0IiwiaW5pdGlhbFZhbHVlcyIsImRhdGVUaW1lIiwiRGF0ZSIsImRlc2NyaXB0aW9uIiwibGluayIsIk1lZXRpbmdUeXBlTGlzdCIsInJvdXRlciIsIm1lZXRpbmdTdGF0ZSIsInNldE1lZXRpbmdTdGF0ZSIsInVuZGVmaW5lZCIsInZhbHVlcyIsInNldFZhbHVlcyIsImNhbGxEZXRhaWwiLCJzZXRDYWxsRGV0YWlsIiwiY2xpZW50IiwidXNlciIsInRvYXN0IiwiY3JlYXRlTWVldGluZyIsInRpdGxlIiwiaWQiLCJjcnlwdG8iLCJyYW5kb21VVUlEIiwiY2FsbCIsIkVycm9yIiwic3RhcnRzQXQiLCJ0b0lTT1N0cmluZyIsIm5vdyIsImdldE9yQ3JlYXRlIiwiZGF0YSIsInN0YXJ0c19hdCIsImN1c3RvbSIsInB1c2giLCJlcnJvciIsImNvbnNvbGUiLCJtZWV0aW5nTGluayIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19CQVNFX1VSTCIsInNhbml0aXplTGluayIsInNhbml0aXplZExpbmsiLCJyZXBsYWNlIiwidHJpbSIsInNlY3Rpb24iLCJjbGFzc05hbWUiLCJpbWciLCJoYW5kbGVDbGljayIsImlzT3BlbiIsIm9uQ2xvc2UiLCJkaXYiLCJsYWJlbCIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInZhbHVlIiwic2VsZWN0ZWQiLCJkYXRlIiwic2hvd1RpbWVTZWxlY3QiLCJ0aW1lRm9ybWF0IiwidGltZUludGVydmFscyIsInRpbWVDYXB0aW9uIiwiZGF0ZUZvcm1hdCIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsImltYWdlIiwiYnV0dG9uSWNvbiIsImJ1dHRvblRleHQiLCJsb2ciLCJiYXNlVXJsIiwibmV3bGluayIsInBsYWNlaG9sZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/MeetingTypeList.tsx\n"));

/***/ })

});