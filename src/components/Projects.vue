<template>
  <div class="projectCard">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{project.name}}
        </p>

      </header>
      <div class="card-content">
        <div class="content">
          Desc: {{project.description}}
          <hr> Completed: {{project.is_completed}}
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" @click='getTasks(project)'>View Tasks</a>

        <a href="#" class="card-footer-item" @click='openTaskModal(project)'>Add Tasks</a>
        <!-- <a href="#" class="card-footer-item">Delete Project</a> -->
      </footer>
    </div>

    <!--Add Task Modal -->
    <div class="modal" :class="{'is-active':addTaskModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a Task</p>
          <button class="delete" aria-label="close" @click="closeTaskModal()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input class="input " type="text" placeholder="Name" v-model='newTask.name'>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="input" type="textarea" placeholder="Description" v-model="newTask.description" style="min-height:100px"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">

              <div class="select">
                <select v-model="newTask.priority">
                  <option value="" selected disabled hidden>Set Task Priority</option>
                  <option v-for="n in 5">{{ n }}</option>
                </select>
              </div>

            </div>
          </div>

          <div class="field">
            <div class="control">
              <datepicker placeholder="Select date due" v-model="newTask.due_date"></datepicker>
            </div>
          </div>

        </section>

        <footer class="modal-card-foot">
          <button class="button is-success" :class="{'is-loading':creatingTaskLoader}" @click="addTask()">Add Task</button>
          <button class="button" @click='closeTaskModal()'>Cancel</button>
        </footer>
      </div>

    </div>

    <!--View Task Modal -->
    <div class="modal" :class="{'is-active':selectTaskModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{selectedProject.name}}</p>
          <button class="delete" aria-label="close" @click="selectTaskModal = false"></button>
        </header>
        <section class="modal-card-body">
          Search:
          <input type="text" v-model="searchItem" placeholder="search tasks"></input>
          <div class="dropdown" :class="{'is-active':dropdownButton}">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="dropdownButton = !dropdownButton">
                <span>Order by</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item" v-for="sort in orderOptions" @click="sortBy(sort)">
                  {{sort.name}}
                </a>
              </div>
            </div>
          </div>
          <hr>
          <div class="columns is-multiline" v-if="selectedProject.data">
            <div class="column" v-for="task in search">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    {{task.name}}
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    {{task.description}}
                  </div>

                  <div class="content">
                    Priority: {{task.priority}}
                  </div>
                  <div class="content">
                    Due Date: {{task.due_date | moment("dddd, MMMM Do YYYY") }}
                  </div>
                  <div class="content">
                    Completed: {{task.is_completed}}
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item" @click='viewTask(task)'>View Task</a>
                  <!-- <a href="#" class="card-footer-item">Edit Task</a>
                  <a href="#" class="card-footer-item">Delete Task</a> -->
                </footer>
              </div>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <!-- <button class="button is-success">Save changes</button> -->
          <button class="button" @click="selectTaskModal = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {
    EventBus
  } from '../bus.js'
  export default {
    name: 'ProjectCard',
    props: ['project'],
    data() {
      return {
        selectTaskModal: false,
        addTaskModal: false,
        creatingTaskLoader: false,
        selectedProject: {},
        searchItem: '',
        newTask: {
          name: '',
          description: '',
          priority: '',
          due_date: '',
          project_id: ''
        },
        dropdownButton: false,
        orderOptions: [{
            name: 'Descending Name',
            value: {
              order: 'name',
              direction: -1
            }
          },
          {
            name: 'Ascending Name',
            value: {
              order: 'name',
              direction: 1
            }
          },
          {
            name: 'Descending Priority',
            value: {
              order: 'priority',
              direction: -1
            }
          },
          {
            name: 'Ascending Priority',
            value: {
              order: 'priority',
              direction: 1
            }
          },
          {
            name: 'Descending Due Date',
            value: {
              order: 'due_date',
              direction: -1
            }
          },
          {
            name: 'Ascending Due Date ',
            value: {
              order: 'due_date',
              direction: 1
            }
          },
          {
            name: 'Descending Created Date',
            value: {
              order: 'createdAt',
              direction: -1
            }
          },
          {
            name: 'Ascending Created Date',
            value: {
              order: 'createdAt',
              direction: 1
            }
          },
        ]

      }
    },
    methods: {
      getTasks(project) {
        this.$axios.get(`/project/${project._id}/tasks`).then(resp => {
        this.selectedProject={
            name:project.name,
            data:resp.data.data
        }
          this.selectTaskModal = !this.selectTaskModal;

        }).catch((e) => {
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>No Tasks Created Under This Project</p>',
          })
        })
      },
      viewTask(task) {
        this.$router.push({
          name: 'Task',
          params: {
            id: task._id
          }
        })
      },
      openTaskModal(project) {
        this.addTaskModal = true;
        this.newTask.project_id = project._id
      },
      closeTaskModal() {
        this.addTaskModal = false;
        this.newTask = {
          name: '',
          description: '',
          priority: '',
          due_date: '',
          project_id: ''
        }
      },
      addTask() {
        this.creatingTaskLoader = !this.creatingTaskLoader;
        this.$axios.post('/task', this.newTask).then(resp => {
          if (resp.data.status == 'success') {
            this.creatingTaskLoader = !this.creatingTaskLoader;
            this.closeTaskModal();
            this.$modalResponse(resp.data.status.toUpperCase(), resp.data.message, resp.data.status)
            EventBus.$emit('added-task', resp);
          }
        }).catch((e)=>{
            this.creatingTaskLoader = !this.creatingTaskLoader;
            this.closeTaskModal();
            this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>Task Name Has Been Taken</p>',
          })
        })
      },
      sortBy(option) {
        this.$axios.get(`/project/${this.project._id}/tasks`, {
          params: {
            sort: option.value
          }
        }).then(resp => {
          this.selectedProject.data = resp.data.data;
          this.dropdownButton = false;
        }).catch(e=>{
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>Error Sorting</p>',
          })
          this.dropdownButton = false;
        })
      }
    },
    computed: {
      search() {
        return this.selectedProject.data.filter(task => {
          if (task.name.toLowerCase().indexOf(this.searchItem.toLowerCase()) >= 0) {
            return task;
          }
        })
      }
    },
    components: {
      Datepicker
    }
  }

</script>

<style scoped>


</style>
