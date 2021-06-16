(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{101:function(e,t,a){e.exports=a(131)},106:function(e,t,a){},128:function(e,t,a){},131:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),i=a.n(r);a(106),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,l,u=a(59),s=a(35),d=a(7),f=a(184),m=a(80),b=a.n(m).a.create(Object(d.a)({},{baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"42c688ff-b242-4cda-ac99-6e02679c3ff4"}})),O=function(e,t){return b.put("todo-lists/".concat(e),{title:t})},E=function(e){return b.delete("todo-lists/".concat(e))},g=function(e){return b.post("todo-lists",{title:e})},T=function(){return b.get("todo-lists")},p=function(e){return b.post("auth/login",e)},j=function(){return b.delete("auth/login")},h=function(){return b.get("auth/me")},v=function(e,t){e.messages.length?t(C(e.messages[0])):t(C("Some error occurred")),t(A("failed"))},S=function(e,t){t(C(e.message?e.message:"Some error occurred")),t(A("failed"))},k={isLoggedIn:!1},I=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},y={status:"idle",error:null,isInitialized:!1},C=function(e){return{type:"APP/SET-ERROR",error:e}},A=function(e){return{type:"APP/SET-STATUS",status:e}},w=(Object(f.a)(),Object(f.a)(),[]),L=function(e,t){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",id:e,entityStatus:t}},D=function(e){return b.get("todo-lists/".concat(e,"/tasks"))},P=function(e,t){return b.delete("todo-lists/".concat(e,"/tasks/").concat(t))},N=function(e,t){return b.post("todo-lists/".concat(e,"/tasks"),{title:t})},R=function(e,t,a){return b.put("todo-lists/".concat(e,"/tasks/").concat(t),a)};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(o||(o={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(l||(l={}));var x,F={};!function(e){e[e.success=0]="success",e[e.failed=1]="failed",e[e.captcha=2]="captcha"}(x||(x={}));var G=function(e,t,a){return function(n,c){n(A("loading")),n(L(a,"loading"));var r=c().tasks[a].find((function(t){return t.id===e}));if(r){var i=Object(d.a)({deadline:r.deadline,description:r.description,priority:l.Low,startDate:r.startDate,title:r.title,status:r.status},t);R(a,e,i).then((function(c){c.data.resultCode===x.success?(n(function(e,t,a){return{type:"UPDATE-TASK",id:e,model:t,todolistId:a}}(e,t,a)),n(L(a,"succeeded")),n(A("succeeded"))):v(c.data,n)})).catch((function(e){S(e,n)}))}else console.warn("task not found in the state")}},K=a(40),M=a(81),H=Object(K.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!==t.taskId}))));case"ADD-TASK":return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},t.task.todoListId,[t.task].concat(Object(u.a)(e[t.task.todoListId]))));case"UPDATE-TASK":return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.id?Object(d.a)(Object(d.a)({},e),t.model):e}))));case"ADD-TODOLIST":return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(d.a)({},e);return delete a[t.todolistId],a;case"SET-TODOLISTS":var n=Object(d.a)({},e);return t.todolists.forEach((function(e){n[e.id]=[]})),n;case"SET-TASKS":return Object(d.a)(Object(d.a)({},e),{},Object(s.a)({},t.todolistId,t.tasks));default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.todolistId}));case"ADD-TODOLIST":return[Object(d.a)(Object(d.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(u.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.todolistId?Object(d.a)(Object(d.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.todolistId?Object(d.a)(Object(d.a)({},e),{},{filter:t.filter}):e}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.id?Object(d.a)(Object(d.a)({},e),{},{entityStatus:t.entityStatus}):e}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(d.a)(Object(d.a)({},e),{},{filter:"all",entityStatus:"idle"})}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(d.a)(Object(d.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(d.a)(Object(d.a)({},e),{},{error:t.error});case"APP/SET-IS-INITIALIED":return Object(d.a)(Object(d.a)({},e),{},{isInitialized:t.value});default:return Object(d.a)({},e)}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(d.a)(Object(d.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),U=Object(K.d)(H,Object(K.a)(M.a));window.store=U;var V=a(14),q=(a(128),a(176)),z=a(177),B=a(178),Y=a(169),J=a(133),W=a(172),$=a(180),_=a(181),Q=a(179),X=a(173),Z=a(132),ee=a(43),te=a(182),ae=a(170),ne=c.a.memo((function(e){var t=e.addItem,a=e.disabled,r=void 0!==a&&a;console.log("AddItemForm is called");var i=Object(n.useState)(""),o=Object(ee.a)(i,2),l=o[0],u=o[1],s=Object(n.useState)(null),d=Object(ee.a)(s,2),f=d[0],m=d[1],b=function(){""!==l.trim()?(t(l.trim()),u("")):m("Title is required")};return c.a.createElement("div",null,c.a.createElement(te.a,{variant:"outlined",error:!!f,value:l,onChange:function(e){u(e.currentTarget.value)},onKeyPress:function(e){null!==f&&m(null),"Enter"===e.key&&b()},label:"Title",helperText:f,disabled:r}),c.a.createElement(Y.a,{color:"primary",onClick:b,disabled:r},c.a.createElement(ae.a,null)))})),ce=a(90),re=c.a.memo((function(e){console.log("EditableSpan");var t=Object(n.useState)(!1),a=Object(ee.a)(t,2),r=a[0],i=a[1],o=Object(n.useState)(""),l=Object(ee.a)(o,2),u=l[0],s=l[1];return r?c.a.createElement(te.a,{value:u,onChange:function(e){s(e.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),e.onChange(u)}}):c.a.createElement("span",{onDoubleClick:function(){!e.disabled&&i(!0),s(e.title)}},e.title)})),ie=a(171),oe=a(185),le=c.a.memo((function(e){var t=e.task,a=e.changeTaskStatus,r=e.changeTaskTitle,i=e.removeTask,l=e.todolistId,u=Object(n.useCallback)((function(){return i(t.id,l)}),[i,t.id,l]),s=Object(n.useCallback)((function(e){var n=e.currentTarget.checked;a(t.id,n?o.Completed:o.New,l)}),[a,t.id,l]),d=Object(n.useCallback)((function(e){r(t.id,e,l)}),[r,t.id,l]);return c.a.createElement("div",{key:t.id,className:t.status===o.Completed?"is-done":""},c.a.createElement(oe.a,{color:"primary",onChange:s,checked:t.status===o.Completed}),c.a.createElement(re,{title:t.title,onChange:d,disabled:"loading"===e.entityStatus}),c.a.createElement(Y.a,{onClick:u,disabled:"loading"===e.entityStatus},c.a.createElement(ie.a,null)))})),ue=c.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,r=Object(ce.a)(e,["demo"]);console.log("Todolist is called");var i=Object(V.b)();Object(n.useEffect)((function(){var e;a||i((e=r.id,function(t){t(A("loading")),D(e).then((function(a){var n=a.data.items;t(function(e,t){return{type:"SET-TASKS",tasks:e,todolistId:t}}(n,e)),t(A("succeeded"))})).catch((function(e){S(e,t)}))}))}),[]);var l=r.id,u=r.changeFilter,s=r.addTask,d=r.changeTodolistTitle,f=Object(n.useCallback)((function(e){return d(l,e)}),[d,l]),m=Object(n.useCallback)((function(e){return s(e,l)}),[s,l]),b=Object(n.useCallback)((function(){u("all",l)}),[u,l]),O=Object(n.useCallback)((function(){u("active",l)}),[u,l]),E=Object(n.useCallback)((function(){u("completed",l)}),[u,l]),g=r.tasks;return"active"===r.filter&&(g=r.tasks.filter((function(e){return e.status===o.New}))),"completed"===r.filter&&(g=r.tasks.filter((function(e){return e.status===o.Completed}))),c.a.createElement("div",null,c.a.createElement("h3",null,c.a.createElement(re,{title:r.title,onChange:f,disabled:"loading"===r.entityStatus}),c.a.createElement(Y.a,{onClick:function(){return r.removeTodolist(r.id)},disabled:"loading"===r.entityStatus},c.a.createElement(ie.a,null))),c.a.createElement(ne,{addItem:m,disabled:"loading"===r.entityStatus}),c.a.createElement("div",null,g.map((function(e){return c.a.createElement(le,{task:e,changeTaskStatus:r.changeTaskStatus,changeTaskTitle:r.changeTaskTitle,removeTask:r.removeTask,todolistId:r.id,key:e.id,entityStatus:r.entityStatus})}))),c.a.createElement("div",{style:{paddingTop:"10px"}},c.a.createElement(W.a,{variant:"all"===r.filter?"outlined":"text",onClick:b,color:"default"},"All"),c.a.createElement(W.a,{variant:"active"===r.filter?"outlined":"text",onClick:O,color:"primary"},"Active"),c.a.createElement(W.a,{variant:"completed"===r.filter?"outlined":"text",onClick:E,color:"secondary"},"Completed")))})),se=a(13),de=function(e){var t=e.demo,a=void 0!==t&&t,r=Object(V.c)((function(e){return e.todolists})),i=Object(V.c)((function(e){return e.tasks})),o=Object(V.c)((function(e){return e.app.status})),l=Object(V.c)((function(e){return e.auth.isLoggedIn})),u=Object(V.b)();Object(n.useEffect)((function(){!a&&l&&u((function(e){e(A("loading")),T().then((function(t){e({type:"SET-TODOLISTS",todolists:t.data}),e(A("succeeded"))})).catch((function(t){S(t,e)}))}))}),[]);var s=Object(n.useCallback)((function(e,t){u(function(e,t){return function(a){a(A("loading")),a(L(t,"loading")),N(t,e).then((function(e){if(e.data.resultCode===x.success){var n=e.data.data.item;a(function(e){return{type:"ADD-TASK",task:e}}(n)),a(L(t,"succeeded")),a(A("succeeded"))}else v(e.data,a)})).catch((function(e){S(e,a)}))}}(e,t))}),[u]),d=Object(n.useCallback)((function(e,t,a){u(G(e,{status:t},a))}),[u]),f=Object(n.useCallback)((function(e,t,a){u(G(e,{title:t},a))}),[u]),m=Object(n.useCallback)((function(e,t){u(function(e,t){return{type:"CHANGE-TODOLIST-FILTER",filter:e,todolistId:t}}(e,t))}),[u]),b=Object(n.useCallback)((function(e,t){u(function(e,t){return function(a){a(A("loading")),a(L(t,"loading")),P(t,e).then((function(n){n.data.resultCode===x.success?(a(function(e,t){return{type:"REMOVE-TASK",taskId:e,todolistId:t}}(e,t)),a(L(t,"succeeded")),a(A("succeeded"))):v(n.data,a)})).catch((function(e){S(e,a)}))}}(e,t))}),[u]),p=Object(n.useCallback)((function(e){u(function(e){return function(t){t(A("loading")),g(e).then((function(e){0===e.data.resultCode?(t({type:"ADD-TODOLIST",todolist:e.data.data.item}),t(A("succeeded"))):v(e.data,t)})).catch((function(e){S(e,t)}))}}(e))}),[u]),j=Object(n.useCallback)((function(e,t){var a,n;u((a=e,n=t,function(e){e(A("loading")),O(a,n).then((function(t){0===t.data.resultCode?(e(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",title:t,todolistId:e}}(a,n)),e(A("succeeded"))):v(t.data,e)})).catch((function(t){S(t,e)}))}))}),[u]),h=Object(n.useCallback)((function(e){u(function(e){return function(t){t(A("loading")),t(L(e,"loading")),E(e).then((function(a){0===a.data.resultCode?(t(function(e){return{type:"REMOVE-TODOLIST",todolistId:e}}(e)),t(A("succeeded"))):v(a.data,t)})).catch((function(e){S(e,t)}))}}(e))}),[u]);return l?c.a.createElement(c.a.Fragment,null,c.a.createElement(X.a,{container:!0,style:{padding:"15px"}},c.a.createElement(ne,{addItem:p,disabled:"loading"===o})),c.a.createElement(X.a,{container:!0,spacing:5},r.map((function(e){var t=i[e.id];return c.a.createElement(X.a,{item:!0,key:e.id},c.a.createElement(Z.a,{elevation:10,style:{padding:"15px",borderRadius:"10px"}},c.a.createElement(ue,{id:e.id,title:e.title,filter:e.filter,entityStatus:e.entityStatus,tasks:t,removeTask:b,changeFilter:m,addTask:s,changeTaskStatus:d,removeTodolist:h,changeTaskTitle:f,changeTodolistTitle:j,demo:a})))})))):c.a.createElement(se.a,{to:"/login"})},fe=a(187),me=a(183);function be(e){return c.a.createElement(me.a,Object.assign({elevation:6,variant:"filled"},e))}function Oe(){var e=Object(V.c)((function(e){return e.app.error})),t=Object(V.b)(),a=function(e,a){"clickaway"!==a&&t(C(null))},n=null!==e;return c.a.createElement(fe.a,{open:n,autoHideDuration:6e3,onClose:a},c.a.createElement(be,{onClose:a,severity:"error"},e))}var Ee=a(51),ge=a(188),Te=a(168),pe=a(174),je=a(175),he=a(89),ve=function(){var e=Object(V.b)(),t=Object(V.c)((function(e){return e.auth.isLoggedIn})),a=Object(he.a)({validate:function(e){return e.email?e.password?void 0:{password:"Password is required"}:{email:"Email is required"}},initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(t){var a;e((a=t,function(e){e(A("loading")),p(a).then((function(t){0===t.data.resultCode?(e(I(!0)),e(A("succeeded"))):v(t.data,e)})).catch((function(t){S(t,e)}))}))}});return t?c.a.createElement(se.a,{to:"/"}):c.a.createElement(X.a,{container:!0,justify:"center"},c.a.createElement(X.a,{item:!0,xs:4},c.a.createElement("form",{onSubmit:a.handleSubmit},c.a.createElement(ge.a,null,c.a.createElement(Te.a,null,c.a.createElement("p",null,"To log in get registered ",c.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),c.a.createElement("p",null,"or use common test account credentials:"),c.a.createElement("p",null," Email: free@samuraijs.com"),c.a.createElement("p",null,"Password: free")),c.a.createElement(pe.a,null,c.a.createElement(te.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?c.a.createElement("div",null,a.errors.email):null,c.a.createElement(te.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?c.a.createElement("div",null,a.errors.password):null,c.a.createElement(je.a,{label:"Remember me",control:c.a.createElement(oe.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe}))}),c.a.createElement(W.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},Se=c.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,r=Object(V.c)((function(e){return e.app.status})),i=Object(V.c)((function(e){return e.app.isInitialized})),o=Object(V.c)((function(e){return e.auth.isLoggedIn})),l=Object(V.b)();Object(n.useEffect)((function(){l((function(e){h().then((function(t){0===t.data.resultCode&&e(I(!0)),e({type:"APP/SET-IS-INITIALIED",value:!0})}))}))}),[]);var u=Object(n.useCallback)((function(){l((function(e){e(A("loading")),j().then((function(t){0===t.data.resultCode?(e(I(!1)),e(A("succeeded"))):v(t.data,e)})).catch((function(t){S(t,e)}))}))}),[]);return i?c.a.createElement(Ee.a,null,c.a.createElement("div",{className:"App"},c.a.createElement(z.a,{position:"static"},c.a.createElement(B.a,null,c.a.createElement(Y.a,{edge:"start",color:"inherit","aria-label":"menu"},c.a.createElement(Q.a,null)),c.a.createElement(J.a,{variant:"h6"},"News"),o&&c.a.createElement(W.a,{color:"inherit",onClick:u},"Log out"))),"loading"===r&&c.a.createElement($.a,{color:"secondary"}),c.a.createElement(_.a,{fixed:!0},c.a.createElement(se.d,null,c.a.createElement(se.b,{exact:!0,path:"/",render:function(){return c.a.createElement(de,{demo:a})}}),c.a.createElement(se.b,{path:"/login",render:function(){return c.a.createElement(ve,null)}}),c.a.createElement(se.b,{path:"/404",render:function(){return c.a.createElement("h1",null,"404. Page not found")}}),c.a.createElement(se.a,{from:"*",to:"/404"}))),c.a.createElement(Oe,null))):c.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},c.a.createElement(q.a,null))}));i.a.render(c.a.createElement(V.a,{store:U},c.a.createElement(Se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[101,1,2]]]);
//# sourceMappingURL=main.75a40bf9.chunk.js.map