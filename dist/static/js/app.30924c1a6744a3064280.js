webpackJsonp([1],{"+z/S":function(t,e){},"60Ey":function(t,e){},KPp9:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=s("VU/8")({name:"App"},i,!1,function(t){s("biFK")},null,null).exports,o=s("/ocq"),r=s("XILU"),c=s.n(r),d=new a.a,l={name:"ProjectCard",props:["project"],data:function(){return{selectTaskModal:!1,addTaskModal:!1,creatingTaskLoader:!1,selectedProject:{},searchItem:"",newTask:{name:"",description:"",priority:"",due_date:"",project_id:""},dropdownButton:!1,orderOptions:[{name:"Descending Name",value:{order:"name",direction:-1}},{name:"Ascending Name",value:{order:"name",direction:1}},{name:"Descending Priority",value:{order:"priority",direction:-1}},{name:"Ascending Priority",value:{order:"priority",direction:1}},{name:"Descending Due Date",value:{order:"due_date",direction:-1}},{name:"Ascending Due Date ",value:{order:"due_date",direction:1}},{name:"Descending Created Date",value:{order:"createdAt",direction:-1}},{name:"Ascending Created Date",value:{order:"createdAt",direction:1}}]}},methods:{getTasks:function(t){var e=this;this.$axios.get("/project/"+t._id+"/tasks").then(function(s){e.selectedProject={name:t.name,data:s.data.data},e.selectTaskModal=!e.selectTaskModal}).catch(function(t){e.$modalResponse({type:t.response.data.status,title:"Oops...",text:t.response.data.message,footer:"<p>No Tasks Created Under This Project</p>"})})},viewTask:function(t){this.$router.push({name:"Task",params:{id:t._id}})},openTaskModal:function(t){this.addTaskModal=!0,this.newTask.project_id=t._id},closeTaskModal:function(){this.addTaskModal=!1,this.newTask={name:"",description:"",priority:"",due_date:"",project_id:""}},addTask:function(){var t=this;this.creatingTaskLoader=!this.creatingTaskLoader,this.$axios.post("/task",this.newTask).then(function(e){"success"==e.data.status&&(t.creatingTaskLoader=!t.creatingTaskLoader,t.closeTaskModal(),t.$modalResponse(e.data.status.toUpperCase(),e.data.message,e.data.status),d.$emit("added-task",e))}).catch(function(e){t.creatingTaskLoader=!t.creatingTaskLoader,t.closeTaskModal(),t.$modalResponse({type:e.response.data.status,title:"Oops...",text:e.response.data.message,footer:"<p>Task Name Has Been Taken</p>"})})},sortBy:function(t){var e=this;this.$axios.get("/project/"+this.project._id+"/tasks",{params:{sort:t.value}}).then(function(t){e.selectedProject.data=t.data.data,e.dropdownButton=!1})}},computed:{search:function(){var t=this;return this.selectedProject.data.filter(function(e){if(e.name.toLowerCase().indexOf(t.searchItem.toLowerCase())>=0)return e})}},components:{Datepicker:c.a}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"projectCard"},[s("div",{staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[t._v("\n        "+t._s(t.project.name)+"\n      ")])]),t._v(" "),s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[t._v("\n        Desc: "+t._s(t.project.description)+"\n        "),s("hr"),t._v(" Completed: "+t._s(t.project.is_completed)+"\n      ")])]),t._v(" "),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(e){t.getTasks(t.project)}}},[t._v("View Tasks")]),t._v(" "),s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(e){t.openTaskModal(t.project)}}},[t._v("Add Tasks")])])]),t._v(" "),s("div",{staticClass:"modal",class:{"is-active":t.addTaskModal}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v("Add a Task")]),t._v(" "),s("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.closeTaskModal()}}})]),t._v(" "),s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.name,expression:"newTask.name"}],staticClass:"input ",attrs:{type:"text",placeholder:"Name"},domProps:{value:t.newTask.name},on:{input:function(e){e.target.composing||t.$set(t.newTask,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newTask.description,expression:"newTask.description"}],staticClass:"input",staticStyle:{"min-height":"100px"},attrs:{type:"textarea",placeholder:"Description"},domProps:{value:t.newTask.description},on:{input:function(e){e.target.composing||t.$set(t.newTask,"description",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("div",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.newTask.priority,expression:"newTask.priority"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.newTask,"priority",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",selected:"",disabled:"",hidden:""}},[t._v("Set Task Priority")]),t._v(" "),t._l(5,function(e){return s("option",[t._v(t._s(e))])})],2)])])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("datepicker",{attrs:{placeholder:"Select date due"},model:{value:t.newTask.due_date,callback:function(e){t.$set(t.newTask,"due_date",e)},expression:"newTask.due_date"}})],1)])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-success",class:{"is-loading":t.creatingTaskLoader},on:{click:function(e){t.addTask()}}},[t._v("Add Task")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(e){t.closeTaskModal()}}},[t._v("Cancel")])])])]),t._v(" "),s("div",{staticClass:"modal",class:{"is-active":t.selectTaskModal}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v(t._s(t.selectedProject.name))]),t._v(" "),s("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.selectTaskModal=!1}}})]),t._v(" "),s("section",{staticClass:"modal-card-body"},[t._v("\n        Search:\n        "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchItem,expression:"searchItem"}],attrs:{type:"text",placeholder:"search tasks"},domProps:{value:t.searchItem},on:{input:function(e){e.target.composing||(t.searchItem=e.target.value)}}}),t._v(" "),s("div",{staticClass:"dropdown",class:{"is-active":t.dropdownButton}},[s("div",{staticClass:"dropdown-trigger"},[s("button",{staticClass:"button",attrs:{"aria-haspopup":"true","aria-controls":"dropdown-menu"},on:{click:function(e){t.dropdownButton=!t.dropdownButton}}},[s("span",[t._v("Order by")]),t._v(" "),t._m(0)])]),t._v(" "),s("div",{staticClass:"dropdown-menu",attrs:{id:"dropdown-menu",role:"menu"}},[s("div",{staticClass:"dropdown-content"},t._l(t.orderOptions,function(e){return s("a",{staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(s){t.sortBy(e)}}},[t._v("\n                "+t._s(e.name)+"\n              ")])}))])]),t._v(" "),s("hr"),t._v(" "),t.selectedProject.data?s("div",{staticClass:"columns is-multiline"},t._l(t.search,function(e){return s("div",{staticClass:"column"},[s("div",{staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[t._v("\n                  "+t._s(e.name)+"\n                ")])]),t._v(" "),s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[t._v("\n                  "+t._s(e.description)+"\n                ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n                  Priority: "+t._s(e.priority)+"\n                ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n                  Due Date: "+t._s(t._f("moment")(e.due_date,"dddd, MMMM Do YYYY"))+"\n                ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n                  Completed: "+t._s(e.is_completed)+"\n                ")])]),t._v(" "),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(s){t.viewTask(e)}}},[t._v("View Task")])])])])})):t._e()]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button",on:{click:function(e){t.selectTaskModal=!1}}},[t._v("Cancel")])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fas fa-angle-down",attrs:{"aria-hidden":"true"}})])}]};var v={name:"Home",data:function(){return{newProject:{},addProjectModal:!1,createProjectLoading:!1,existingProjects:null,selectedProject:null}},methods:{openAddProject:function(){this.addProjectModal=!this.addProjectModal},createProject:function(){var t=this;this.createProjectLoading=!this.createProjectLoading,this.$axios.post("/project",this.newProject).then(function(e){t.createProjectLoading=!t.createProjectLoading,t.newProject={},t.openAddProject(),t.$modalResponse(e.data.status.toUpperCase(),e.data.message,e.data.status),t.getProjects()}).catch(function(e){t.$modalResponse({type:e.response.data.status,title:"Oops...",text:e.response.data.message,footer:"<p>Project Name Has Been Taken</p>"}),t.createProjectLoading=!t.createProjectLoading,t.openAddProject(),t.getProjects()})},getProjects:function(){var t=this;this.$axios.get("/project").then(function(e){console.log(e),t.existingProjects=e.data.data})}},components:{projectCard:s("VU/8")(l,u,!1,function(t){s("+z/S")},"data-v-786f7dba",null).exports},computed:{},mounted:function(){var t=this;this.getProjects(),d.$on("added-task",function(e){t.getProjects()})}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("nav",{staticClass:"navbar "},[s("div",{staticClass:"navbar-menu",attrs:{id:"navbarExampleTransparentExample"}},[s("div",{staticClass:"navbar-start"},[s("a",{staticClass:"navbar-item"},[s("router-link",{staticClass:"button",attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),s("a",{staticClass:"navbar-item"},[s("a",{staticClass:"button",on:{click:function(e){t.openAddProject()}}},[t._v("Create a project")])]),t._v(" "),s("a",{staticClass:"navbar-item"},[s("router-link",{staticClass:"button",attrs:{to:"/task"}},[t._v("View All Tasks")])],1)]),t._v(" "),t._m(0)])]),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"columns is-multiline"},t._l(t.existingProjects,function(t){return s("div",[s("div",{staticClass:"column "},[s("projectCard",{attrs:{project:t}})],1)])}))]),t._v(" "),s("div",[s("div",{staticClass:"modal",class:{"is-active":t.addProjectModal}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[t._m(1),t._v(" "),s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newProject.name,expression:"newProject.name"}],staticClass:"input ",attrs:{type:"text",placeholder:"Name"},domProps:{value:t.newProject.name},on:{input:function(e){e.target.composing||t.$set(t.newProject,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newProject.description,expression:"newProject.description"}],staticClass:"input",staticStyle:{"min-height":"100px"},attrs:{type:"textarea",placeholder:"Description"},domProps:{value:t.newProject.description},on:{input:function(e){e.target.composing||t.$set(t.newProject,"description",e.target.value)}}})])])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-success",class:{"is-loading":t.createProjectLoading},on:{click:function(e){t.createProject()}}},[t._v("Create Project")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(e){t.addProjectModal=!1}}},[t._v("Cancel")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navbar-item is-centered"},[e("h1",[this._v("Projects")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"modal-card-head"},[e("p",{staticClass:"modal-card-title"},[this._v("Add a project")]),this._v(" "),e("button",{staticClass:"delete",attrs:{"aria-label":"close"}})])}]};var m=s("VU/8")(v,p,!1,function(t){s("ZuSC")},"data-v-109a1046",null).exports,_={name:"Task",data:function(){return{presentTask:"",presentSubTask:"",subtasks:"",addSubTaskModal:!1,taskLoading:!1,newSubtask:{name:"",description:"",priority:"",due_date:""},editTaskModal:!1,editSubTaskModal:!1}},methods:{getTask:function(){var t=this;this.$axios.get("/task/"+this.$route.params.id).then(function(e){t.presentTask=e.data.data})},editTask:function(){var t=this;this.taskLoading=!0,this.$axios.put("/task/"+this.$route.params.id,this.presentTask).then(function(e){t.presentTask=e.data.data,t.taskLoading=!1,t.editTaskModal=!1,t.$modalResponse(e.data.status,e.data.message,e.data.status)})},deleteTask:function(){var t=this;this.$modalResponse({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(function(e){e.value&&t.$axios.delete("/task/"+t.$route.params.id).then(function(e){t.$modalResponse("Deleted!",e.data.message,"success"),setTimeout(function(){t.$router.push("/")},1500)})})},getSubTask:function(){var t=this;this.$axios.get("task/"+this.$route.params.id+"/subtask").then(function(e){t.subtasks=e.data.data}).catch(function(e){t.subtasks=""})},addSubtask:function(){var t=this;this.taskLoading=!0,this.newSubtask.task_id=this.$route.params.id,this.$axios.post("/subtask",this.newSubtask).then(function(e){t.taskLoading=!1,t.addSubTaskModal=!1,t.$modalResponse(e.data.status,e.data.message,e.data.status),t.getSubTask(),t.newSubtask={name:"",description:"",priority:"",due_date:""}}).catch(function(e){t.taskLoading=!1,t.addSubTaskModal=!1,t.$modalResponse({type:e.response.data.status,title:"Oops...",text:e.response.data.message,footer:"<p>Subtask Name Has Been Taken</p>"}),t.newSubtask={name:"",description:"",priority:"",due_date:""}})},openEditSubTaskModal:function(t){this.presentSubTask=t,this.editSubTaskModal=!this.editSubTaskModal},editSubTask:function(){var t=this;this.taskLoading=!this.taskLoading,this.$axios.put("/subtask/"+this.presentSubTask._id,this.presentSubTask).then(function(e){t.taskLoading=!t.taskLoading,t.editSubTaskModal=!1,t.$modalResponse(e.data.status,e.data.message,e.data.status)}).catch(function(e){t.$modalResponse({type:e.response.data.status,title:"Oops...",text:e.response.data.message,footer:"<p>Error While Editing Subtask</p>"})})},deleteSubTask:function(t){var e=this;this.$modalResponse({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(function(s){s.value&&e.$axios.delete("/subtask/"+t._id).then(function(t){e.$modalResponse("Deleted!",t.data.message,"success"),setTimeout(function(){e.getSubTask()},500)}).catch(function(t){return t})})}},components:{Datepicker:c.a},mounted:function(){this.getTask(),this.getSubTask()}},k={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task"},[s("nav",{staticClass:"navbar "},[s("div",{staticClass:"navbar-menu",attrs:{id:"navbarExampleTransparentExample"}},[s("div",{staticClass:"navbar-start"},[s("a",{staticClass:"navbar-item"},[s("router-link",{staticClass:"button",attrs:{to:"/"}},[t._v("Home")])],1)]),t._v(" "),t._m(0)])]),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"columns "},[s("div",{staticClass:"column is-one-third"},[s("div",{staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[t._v("\n              "+t._s(t.presentTask.name)+"\n            ")])]),t._v(" "),s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[t._v("\n              "+t._s(t.presentTask.description)+"\n            ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n              Priority: "+t._s(t.presentTask.priority)+"\n            ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n              Due Date: "+t._s(t._f("moment")(t.presentTask.due_date,"dddd, MMMM Do YYYY"))+"\n            ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n              Completed: "+t._s(t.presentTask.is_completed)+"\n            ")])]),t._v(" "),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(e){t.addSubTaskModal=!0}}},[t._v("Add SubTask")]),t._v(" "),s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(e){t.editTaskModal=!0}}},[t._v("Edit Task")]),t._v(" "),s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(e){t.deleteTask()}}},[t._v("Delete Task")])])])]),t._v(" "),s("div",{staticClass:"column is-two-third"},[s("div",{staticClass:"card"},[t._m(1),t._v(" "),s("div",{staticClass:"card-content"},[s("div",{staticClass:"columns is-multiline"},t._l(t.subtasks,function(e){return s("div",{staticClass:"column is-one-third"},[s("div",{staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[t._v("\n                      "+t._s(e.name)+"\n                    ")])]),t._v(" "),s("div",{staticClass:"card-content"},[s("div",{staticClass:"content"},[t._v("\n                      "+t._s(e.description)+"\n                    ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n                      Priority: "+t._s(e.priority)+"\n                    ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n                      Due Date: "+t._s(t._f("moment")(e.due_date,"dddd, MMMM Do YYYY"))+"\n                    ")]),t._v(" "),s("div",{staticClass:"content"},[t._v("\n                      Completed: "+t._s(e.is_completed)+"\n                    ")])]),t._v(" "),s("footer",{staticClass:"card-footer"},[s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(s){t.openEditSubTaskModal(e)}}},[t._v("Edit SubTask")]),t._v(" "),s("a",{staticClass:"card-footer-item",attrs:{href:"#"},on:{click:function(s){t.deleteSubTask(e)}}},[t._v("Delete SubTask")])])])])}))])])])])]),t._v(" "),s("div",[s("div",{staticClass:"modal",class:{"is-active":t.addSubTaskModal}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v("Add a Subtask")]),t._v(" "),s("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.addSubTaskModal=!1}}})]),t._v(" "),s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newSubtask.name,expression:"newSubtask.name"}],staticClass:"input ",attrs:{type:"text",placeholder:"Name"},domProps:{value:t.newSubtask.name},on:{input:function(e){e.target.composing||t.$set(t.newSubtask,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newSubtask.description,expression:"newSubtask.description"}],staticClass:"input",staticStyle:{"min-height":"100px"},attrs:{type:"textarea",placeholder:"Description"},domProps:{value:t.newSubtask.description},on:{input:function(e){e.target.composing||t.$set(t.newSubtask,"description",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("div",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.newSubtask.priority,expression:"newSubtask.priority"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.newSubtask,"priority",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",selected:"",disabled:"",hidden:""}},[t._v("Set Task Priority")]),t._v(" "),t._l(5,function(e){return s("option",[t._v(t._s(e))])})],2)])])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("datepicker",{attrs:{placeholder:"Select date due"},model:{value:t.newSubtask.due_date,callback:function(e){t.$set(t.newSubtask,"due_date",e)},expression:"newSubtask.due_date"}})],1)])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-success",class:{"is-loading":t.taskLoading},on:{click:function(e){t.addSubtask()}}},[t._v("Add SubTask")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(e){t.addSubTaskModal=!1}}},[t._v("Cancel")])])])]),t._v(" "),s("div",{staticClass:"modal",class:{"is-active":t.editTaskModal}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v("Edit Task - "+t._s(t.presentTask.name))]),t._v(" "),s("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.editTaskModal=!1}}})]),t._v(" "),s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.presentTask.name,expression:"presentTask.name"}],staticClass:"input ",attrs:{type:"text",placeholder:"Name"},domProps:{value:t.presentTask.name},on:{input:function(e){e.target.composing||t.$set(t.presentTask,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.presentTask.description,expression:"presentTask.description"}],staticClass:"input",staticStyle:{"min-height":"100px"},attrs:{type:"textarea",placeholder:"Description"},domProps:{value:t.presentTask.description},on:{input:function(e){e.target.composing||t.$set(t.presentTask,"description",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("div",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.presentTask.priority,expression:"presentTask.priority"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.presentTask,"priority",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",selected:"",disabled:"",hidden:""}},[t._v("Set Task Priority")]),t._v(" "),t._l(5,function(e){return s("option",[t._v(t._s(e))])})],2)])])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("datepicker",{attrs:{placeholder:"Select date due"},model:{value:t.presentTask.due_date,callback:function(e){t.$set(t.presentTask,"due_date",e)},expression:"presentTask.due_date"}})],1)]),t._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.presentTask.is_completed,expression:"presentTask.is_completed"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.presentTask.is_completed)?t._i(t.presentTask.is_completed,null)>-1:t.presentTask.is_completed},on:{change:function(e){var s=t.presentTask.is_completed,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&t.$set(t.presentTask,"is_completed",s.concat([null])):n>-1&&t.$set(t.presentTask,"is_completed",s.slice(0,n).concat(s.slice(n+1)))}else t.$set(t.presentTask,"is_completed",i)}}}),t._v(" Task Completed\n            ")])])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-success",class:{"is-loading":t.taskLoading},on:{click:function(e){t.editTask()}}},[t._v("Save Changes")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(e){t.addSubTaskModal=!1}}},[t._v("Cancel")])])])]),t._v(" "),t.presentSubTask.name?s("div",{staticClass:"modal",class:{"is-active":t.editSubTaskModal}},[s("div",{staticClass:"modal-background"}),t._v(" "),s("div",{staticClass:"modal-card"},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[t._v("Edit Subtask - "+t._s(t.presentSubTask.name))]),t._v(" "),s("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){t.editSubTaskModal=!1}}})]),t._v(" "),s("section",{staticClass:"modal-card-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.presentSubTask.name,expression:"presentSubTask.name"}],staticClass:"input ",attrs:{type:"text",placeholder:"Name"},domProps:{value:t.presentSubTask.name},on:{input:function(e){e.target.composing||t.$set(t.presentSubTask,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.presentSubTask.description,expression:"presentSubTask.description"}],staticClass:"input",staticStyle:{"min-height":"100px"},attrs:{type:"textarea",placeholder:"Description"},domProps:{value:t.presentSubTask.description},on:{input:function(e){e.target.composing||t.$set(t.presentSubTask,"description",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("div",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.presentSubTask.priority,expression:"presentSubTask.priority"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.presentSubTask,"priority",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"",selected:"",disabled:"",hidden:""}},[t._v("Set Task Priority")]),t._v(" "),t._l(5,function(e){return s("option",[t._v(t._s(e))])})],2)])])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("datepicker",{attrs:{placeholder:"Select date due"},model:{value:t.presentSubTask.due_date,callback:function(e){t.$set(t.presentSubTask,"due_date",e)},expression:"presentSubTask.due_date"}})],1)]),t._v(" "),s("div",{staticClass:"field"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.presentSubTask.is_completed,expression:"presentSubTask.is_completed"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.presentSubTask.is_completed)?t._i(t.presentSubTask.is_completed,null)>-1:t.presentSubTask.is_completed},on:{change:function(e){var s=t.presentSubTask.is_completed,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&t.$set(t.presentSubTask,"is_completed",s.concat([null])):n>-1&&t.$set(t.presentSubTask,"is_completed",s.slice(0,n).concat(s.slice(n+1)))}else t.$set(t.presentSubTask,"is_completed",i)}}}),t._v(" Task Completed\n            ")])])]),t._v(" "),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button is-success",class:{"is-loading":t.taskLoading},on:{click:function(e){t.editSubTask()}}},[t._v("Save Changes")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(e){t.editSubTaskModal=!1}}},[t._v("Cancel")])])])]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navbar-item is-centered"},[e("h1",[this._v("Task")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"card-header"},[e("p",{staticClass:"card-header-title"},[this._v("\n              SubTasks\n            ")])])}]};var f=s("VU/8")(_,k,!1,function(t){s("KPp9")},"data-v-7c8ede94",null).exports,h={name:"AllTasks",data:function(){return{allTasks:"",searchItem:"",dropdownButton:!1,overdue:!1,selectPriority:"",orderOptions:[{name:"Descending Name",value:{order:"name",direction:-1}},{name:"Ascending Name",value:{order:"name",direction:1}},{name:"Descending Priority",value:{order:"priority",direction:-1}},{name:"Ascending Priority",value:{order:"priority",direction:1}},{name:"Descending Due Date",value:{order:"due_date",direction:-1}},{name:"Ascending Due Date ",value:{order:"due_date",direction:1}},{name:"Descending Created Date",value:{order:"createdAt",direction:-1}},{name:"Ascending Created Date",value:{order:"createdAt",direction:1}}],filterAndSortObj:{filter:{}},selectedDate:""}},methods:{getAllTasks:function(){var t=this;this.$axios.get("/task").then(function(e){t.searchModule(e)})},searchModule:function(t){var e=this;this.allTasks=t.data.data.map(function(t){return e.$moment().diff(t.due_date)<=0?t.overdue=!1:t.overdue=!0,t})},sortBy:function(t){this.filterAndSortObj.sort=t.value,this.dropdownButton=!1},runFilter:function(){var t=this;this.selectedDate&&(this.filterAndSortObj.filter.due_date={$gt:this.selectedDate}),this.$axios.get("/task",{params:{filter:this.filterAndSortObj}}).then(function(e){t.searchModule(e),t.dropdownButton=!1,t.selectedDate="",t.filterAndSortObj={filter:{}}}).catch(function(e){t.$modalResponse({type:e.response.data.status,title:"Oops...",text:e.response.data.message,footer:"<p>No Tasks With Those Criterias</p>"}),t.selectedDate="",t.filterAndSortObj={filter:{}}})}},computed:{filterTasks:function(){var t=this;return this.allTasks.filter(function(e){if(e.name.toLowerCase().indexOf(t.searchItem.toLowerCase())>=0){if(1!=t.overdue)return e;if(1==e.overdue)return e}})}},components:{Datepicker:c.a},mounted:function(){this.getAllTasks()}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("nav",{staticClass:"navbar "},[s("div",{staticClass:"navbar-menu",attrs:{id:"navbarExampleTransparentExample"}},[s("div",{staticClass:"navbar-start"},[s("a",{staticClass:"navbar-item"},[s("router-link",{staticClass:"button",attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),s("a",{staticClass:"navbar-item"},[s("a",{staticClass:"button",on:{click:function(e){t.openAddProject()}}},[t._v("Create a project")])])]),t._v(" "),t._m(0)])]),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"filterBox"},[s("datepicker",{attrs:{placeholder:"Select date due"},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}}),t._v(" "),s("div",{staticClass:"dropdown",class:{"is-active":t.dropdownButton}},[s("div",{staticClass:"dropdown-trigger"},[s("button",{staticClass:"button",attrs:{"aria-haspopup":"true","aria-controls":"dropdown-menu"},on:{click:function(e){t.dropdownButton=!t.dropdownButton}}},[s("span",[t._v("Order by")]),t._v(" "),t._m(1)])]),t._v(" "),s("div",{staticClass:"dropdown-menu",attrs:{id:"dropdown-menu",role:"menu"}},[s("div",{staticClass:"dropdown-content"},t._l(t.orderOptions,function(e){return s("a",{staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(s){t.sortBy(e)}}},[t._v("\n                      "+t._s(e.name)+"\n                    ")])}))])]),t._v("\n              Priority:\n              "),s("div",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.filterAndSortObj.filter.priority,expression:"filterAndSortObj.filter.priority"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.filterAndSortObj.filter,"priority",e.target.multiple?s:s[0])}}},[s("option",{attrs:{selected:"",disabled:"",hidden:"",value:""}},[t._v("Set Task Priority")]),t._v(" "),s("option",{domProps:{value:{priority:0}}},[t._v("None")]),t._v(" "),t._l(5,function(e){return s("option",{domProps:{value:e}},[t._v(t._s(e))])})],2)]),t._v(" "),s("a",{staticClass:"button",on:{click:function(e){t.runFilter()}}},[t._v("Filter")]),t._v(" "),s("a",{staticClass:"button",on:{click:function(e){t.getAllTasks()}}},[t._v("Clear")])],1),t._v(" "),s("hr"),t._v(" "),s("div",[t._v("\n              Search:\n              "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchItem,expression:"searchItem"}],attrs:{type:"text",placeholder:"search tasks"},domProps:{value:t.searchItem},on:{input:function(e){e.target.composing||(t.searchItem=e.target.value)}}}),t._v(" "),s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.overdue,expression:"overdue"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.overdue)?t._i(t.overdue,null)>-1:t.overdue},on:{change:function(e){var s=t.overdue,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&(t.overdue=s.concat([null])):n>-1&&(t.overdue=s.slice(0,n).concat(s.slice(n+1)))}else t.overdue=i}}}),t._v(" Overdue\n                  ")])])]),t._v(" "),t.allTasks.length?s("div",[s("div",{staticClass:"container"},[s("table",{staticClass:"table is-centered"},[t._m(2),t._v(" "),s("tbody",t._l(t.filterTasks,function(e){return s("tr",[s("td",[t._v(t._s(e.name))]),t._v(" "),s("td",[t._v(t._s(e.description))]),t._v(" "),s("td",[t._v(t._s(e.priority))]),t._v(" "),s("td",[t._v(t._s(e.is_completed))]),t._v(" "),s("td",[t._v(t._s(t._f("moment")(e.due_date,"dddd, MMMM Do YYYY")))]),t._v(" "),s("td",[t._v(t._s(t._f("moment")(e.createdAt,"dddd, MMMM Do YYYY")))]),t._v(" "),s("td",[t._v(t._s(e.overdue))])])}))])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navbar-item is-centered"},[e("h1",[this._v("All tasks")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fas fa-angle-down",attrs:{"aria-hidden":"true"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[s("abbr",{attrs:{title:"Name"}},[t._v("Name")])]),t._v(" "),s("th",[s("abbr",{attrs:{title:"Description"}},[t._v("Description")])]),t._v(" "),s("th",[s("abbr",{attrs:{title:"Priority"}},[t._v("Priority")])]),t._v(" "),s("th",[s("abbr",{attrs:{title:"Completed"}},[t._v("Completed")])]),t._v(" "),s("th",[s("abbr",{attrs:{title:"Due Date"}},[t._v("Due Date")])]),t._v(" "),s("th",[s("abbr",{attrs:{title:"Created Date"}},[t._v("Created Date")])]),t._v(" "),s("th",[s("abbr",{attrs:{title:"Over Due"}},[t._v("Over Due")])])])])}]};var b=s("VU/8")(h,C,!1,function(t){s("60Ey")},"data-v-399f70ce",null).exports;a.a.use(o.a);var j=new o.a({mode:"history",routes:[{path:"/",name:"Home",component:m},{path:"/task/:id",name:"Task",component:f,props:!0},{path:"/task",name:"AllTasks",component:b}]}),g=s("MMSg"),T=s.n(g),y=s("mtWM"),w=s.n(y),S=s("e7x4"),x=s.n(S);s("doPI");w.a.defaults.baseURL=void 0,a.a.use(T.a),a.a.use(s("mjDs")),a.a.prototype.$axios=w.a,a.a.prototype.$modalResponse=x.a,a.a.config.productionTip=!1,new a.a({el:"#app",router:j,components:{App:n},template:"<App/>"})},ZuSC:function(t,e){},biFK:function(t,e){},doPI:function(t,e){},uslO:function(t,e,s){var a={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(t){return s(n(t))}function n(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}i.keys=function(){return Object.keys(a)},i.resolve=n,t.exports=i,i.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.30924c1a6744a3064280.js.map