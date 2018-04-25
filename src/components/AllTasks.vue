<template>
  <div class="home">
    <nav class="navbar ">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/" class="button">Home</router-link>
          </a>


        </div>
        <div class="navbar-item is-centered">
          <h1>All tasks</h1>
        </div>
      </div>
    </nav>
    <div class="container">
        <div class="filterBox">
                <datepicker placeholder="Select date due" v-model="selectedDate"></datepicker>
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
                Priority:
                <div class="select">
                  <select v-model="filterAndSortObj.filter.priority">
                    <option selected disabled hidden value="">Set Task Priority</option>
                    <option :value="{priority:0}" >None</option>
                    <option v-for="n in 5" :value="n">{{ n }}</option>
                  </select>
                </div>
          
                <a class="button" @click="runFilter()" :class="{'is-loading':taskLoading}">Filter</a>
                <a class="button" @click="getAllTasks()">Clear</a>
        </div>
        <hr>
        <div>
                Search:
                <input type="text" v-model="searchItem" placeholder="search tasks"></input>
               
                <label class="checkbox">
                      <input type="checkbox" v-model="overdue"> Overdue
                    </label>
        </div>
      
    </div>
    <div v-if="allTasks.length">
      <div class="container">
        <table class="table is-centered">
          <thead>
            <tr>
              <th>
                <abbr title="Name">Name</abbr>
              </th>
              <th>
                <abbr title="Description">Description</abbr>
              </th>
              <th>
                <abbr title="Priority">Priority</abbr>
              </th>
              <th>
                <abbr title="Completed">Completed</abbr>
              </th>
              <th>
                <abbr title="Due Date">Due Date</abbr>
              </th>
              <th>
                <abbr title="Created Date">Created Date</abbr>
              </th>
              <th>
                <abbr title="Over Due">Over Due</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in filterTasks">
              <td>{{task.name}}</td>
              <td>{{task.description}}</td>
              <td>{{task.priority}}</td>
              <td>{{task.is_completed}}</td>
              <td>{{task.due_date | moment("dddd, MMMM Do YYYY") }}</td>
              <td>{{task.createdAt | moment("dddd, MMMM Do YYYY")}}</td>
              <td>{{task.overdue}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>



  </div>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import {
    EventBus
  } from '../bus.js'
  export default {
    name: 'AllTasks',
    data() {
      return {
        allTasks: '',
        searchItem: '',
        dropdownButton: false,
        overdue: false,
        taskLoading:false,
        selectPriority: '',
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
        ],
        filterAndSortObj: {
          filter: {

          }
        },
        selectedDate: ''


      }
    },
    methods: {
     
      getAllTasks() {
        this.$axios.get('/task').then(resp => {
          this.searchModule(resp);
        })
      },
      searchModule(resp) {
        this.allTasks = resp.data.data.map(task => {
          if (this.$moment().diff(task.due_date) <= 0) {
            task.overdue = false
          } else task.overdue = true
          return task
        })
      },
      sortBy(option) {
        this.filterAndSortObj.sort = option.value
        this.dropdownButton = false;
      },

      runFilter() {
        if (this.selectedDate) {
          this.filterAndSortObj.filter.due_date = {
            $gt: this.selectedDate
          }
        }
        this.taskLoading=true
        this.$axios.get('/task', {
          params: {
            filter: this.filterAndSortObj
          }
        }).then(resp => {
          this.searchModule(resp);
          this.dropdownButton = false;
          this.selectedDate = '';
          this.filterAndSortObj = {filter: {}}
          this.taskLoading=false
        }).catch((e)=>{
            this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>No Tasks With Those Criterias</p>',
          })
          this.selectedDate = '';
          this.filterAndSortObj = {filter: {}}
          this.taskLoading=false
        })
      }

    },
    computed: {
      filterTasks() {
        return this.allTasks.filter(task => {
          if (task.name.toLowerCase().indexOf(this.searchItem.toLowerCase()) >= 0) {
            if (this.overdue == true) {
              if (task.overdue == true) {
                return task;
              }
            } 
            else return task;
          }
        })
      }
    },
    components: {
      Datepicker
    },
    mounted() {
      this.getAllTasks();
    }
  }

</script>

<style scoped>
  .navbar-item h1 {
    color: white;

  }

  .navbar {
    background-color: teal;
  }

  .is-centered {
    margin: 0 auto;
  }

  .container {
    margin-top: 40px;
  }

  .vdp-datepicker {
    position: relative;
    text-align: left;
    display: inline-block !important;
  }

</style>
