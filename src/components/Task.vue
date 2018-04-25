<template>
  <div class="task">
    <nav class="navbar ">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/" class="button">Home</router-link>
          </a>
          </a> 

        </div>
        <div class="navbar-item is-centered">
          <h1>Task</h1>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="columns ">
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{presentTask.name}}
              </p>

            </header>
            <div class="card-content">
              <div class="content">
                {{presentTask.description}}
              </div>

              <div class="content">
                Priority: {{presentTask.priority}}
              </div>
              <div class="content">
                Due Date: {{presentTask.due_date | moment("dddd, MMMM Do YYYY") }}
              </div>
              <div class="content">
                Completed: {{presentTask.is_completed}}
              </div>

            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="createSubTaskModal = true">Add SubTask</a>
              <a href="#" class="card-footer-item" @click="editTaskModal=true">Edit Task</a>
              <a href="#" class="card-footer-item" @click="deleteTask()">Delete Task</a>
            </footer>
          </div>
        </div>
        <div class="column is-two-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                SubTasks
              </p>
            </header>
            <div class="card-content">
              <div class="columns is-multiline">
                <div v-for="subtask in subtasks" class="column is-one-third">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        {{subtask.name}}
                      </p>

                    </header>
                    <div class="card-content">
                      <div class="content">
                        {{subtask.description}}
                      </div>

                      <div class="content">
                        Priority: {{subtask.priority}}
                      </div>
                      <div class="content">
                        Due Date: {{subtask.due_date | moment("dddd, MMMM Do YYYY") }}
                      </div>
                      <div class="content">
                        Completed: {{subtask.is_completed}}
                      </div>

                    </div>
                    <footer class="card-footer">

                      <a href="#" class="card-footer-item" @click="openEditSubTaskModal(subtask)">Edit SubTask</a>
                      <a href="#" class="card-footer-item" @click="deleteSubTask(subtask)">Delete SubTask</a>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>



    <div>
      <!--Add Subtask Modal-->
      <div class="modal" :class="{'is-active':createSubTaskModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add a Subtask</p>
            <button class="delete" aria-label="close" @click="createSubTaskModal=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <div class="control">
                <input class="input " type="text" placeholder="Name" v-model='newSubtask.name'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <textarea class="input" type="textarea" placeholder="Description" v-model="newSubtask.description" style="min-height:100px"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="newSubtask.priority">
                    <option value="" selected disabled hidden>Set Task Priority</option>
                    <option v-for="n in 5">{{ n }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <datepicker placeholder="Select date due" v-model="newSubtask.due_date"></datepicker>
              </div>
            </div>
          </section>

          <footer class="modal-card-foot">
            <button class="button is-success" :class="{'is-loading':taskLoading}" @click='createSubTask()'>Add SubTask</button>
            <button class="button" @click="createSubTaskModal=false">Cancel</button>
          </footer>

        </div>

      </div>

      <!--Edit Task Modal -->
      <div class="modal" :class="{'is-active':editTaskModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Task - {{presentTask.name}}</p>
            <button class="delete" aria-label="close" @click="editTaskModal=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <div class="control">
                <input class="input " type="text" placeholder="Name" v-model='presentTask.name'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <textarea class="input" type="textarea" placeholder="Description" v-model="presentTask.description" style="min-height:100px"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">

                <div class="select">
                  <select v-model="presentTask.priority">
                    <option value="" selected disabled hidden>Set Task Priority</option>
                    <option v-for="n in 5">{{ n }}</option>
                  </select>
                </div>

              </div>
            </div>

            <div class="field">
              <div class="control">
                <datepicker placeholder="Select date due" v-model="presentTask.due_date"></datepicker>
              </div>
            </div>

            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="presentTask.is_completed"> Task Completed
              </label>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" :class="{'is-loading':taskLoading}" @click='editTask()'>Save Changes</button>
            <button class="button" @click="createSubTaskModal=false">Cancel</button>
          </footer>
        </div>

      </div>

      <!--Edit Subtask modal -->

      <div v-if="presentSubTask.name" class="modal" :class="{'is-active':editSubTaskModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Subtask - {{presentSubTask.name}}</p>
            <button class="delete" aria-label="close" @click="editSubTaskModal=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <div class="control">
                <input class="input " type="text" placeholder="Name" v-model='presentSubTask.name'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <textarea class="input" type="textarea" placeholder="Description" v-model="presentSubTask.description" style="min-height:100px"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">

                <div class="select">
                  <select v-model="presentSubTask.priority">
                    <option value="" selected disabled hidden>Set Task Priority</option>
                    <option v-for="n in 5">{{ n }}</option>
                  </select>
                </div>

              </div>
            </div>

            <div class="field">
              <div class="control">
                <datepicker placeholder="Select date due" v-model="presentSubTask.due_date"></datepicker>
              </div>
            </div>

            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="presentSubTask.is_completed"> Task Completed
              </label>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" :class="{'is-loading':taskLoading}" @click='editSubTask()'>Save Changes</button>
            <button class="button" @click="editSubTaskModal=false">Cancel</button>
          </footer>
        </div>

      </div>
    </div>



  </div>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  export default {
    name: 'Task',
    data() {
      return {
        presentTask: '',
        presentSubTask: '',
        subtasks: '',
        createSubTaskModal: false,
        taskLoading: false,
        newSubtask: {
          name: '',
          description: '',
          priority: '',
          due_date: '',

        },
        editTaskModal: false,
        editSubTaskModal: false,

      }
    },
    methods: {

      getTask() {
        this.$axios.get(`/task/${this.$route.params.id}`).then(resp => {
          this.presentTask = resp.data.data
        })
      },
      editTask() {
        this.taskLoading = true
        this.$axios.put(`/task/${this.$route.params.id}`, this.presentTask).then(resp => {
          this.presentTask = resp.data.data
          this.taskLoading = false;
          this.editTaskModal = false;
          this.$modalResponse(resp.data.status, resp.data.message, resp.data.status);
        })
      },
      deleteTask() {
        this.$modalResponse({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.$axios.delete(`/task/${this.$route.params.id}`).then(resp => {
              this.$modalResponse(
                'Deleted!',
                resp.data.message,
                'success'
              )
              setTimeout(() => {
                this.$router.push('/');
              }, 1500)
            })
          }
        })
      },
      getSubTask() {
        this.$axios.get(`task/${this.$route.params.id}/subtask`).then(resp => {
          this.subtasks = resp.data.data
        }).catch(e => {
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>No Subtasks/p>',
          })
            this.subtasks ='';
            
        })
      },
      createSubtask() {
        this.taskLoading = true
        this.newSubtask.task_id = this.$route.params.id;
        this.$axios.post('/subtask', this.newSubtask).then(resp => {
          this.taskLoading = false
          this.createSubTaskModal = false
          this.$modalResponse(resp.data.status, resp.data.message, resp.data.status)
          this.getSubTask();
          this.newSubtask = {
            name: '',
            description: '',
            priority: '',
            due_date: '',

          }
        }).catch((e)=>{
          this.taskLoading = false
          this.createSubTaskModal = false
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p></p>',
          })
          this.newSubtask = {
            name: '',
            description: '',
            priority: '',
            due_date: '',

          }
        })
      },
      openEditSubTaskModal(subtask) {
        this.presentSubTask = subtask
        this.editSubTaskModal = !this.editSubTaskModal;
      },
      editSubTask() {
        this.taskLoading = !this.taskLoading
        this.$axios.put(`/subtask/${this.presentSubTask._id}`, this.presentSubTask).then(resp => {
          this.taskLoading = !this.taskLoading
          this.editSubTaskModal = false;
          this.$modalResponse(resp.data.status, resp.data.message, resp.data.status);
        }).catch(e => {
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>Error While Editing Subtask</p>',
          })
        })
      },
      deleteSubTask(subtask) {
        this.$modalResponse({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
         
          if (result.value) {
            this.$axios.delete(`/subtask/${subtask._id}`).then(resp => {
              this.$modalResponse(
                'Deleted!',
                resp.data.message,
                'success'
              )
              setTimeout(() => {
                this.getSubTask();
              }, 500)

            }).catch(e => {
              return e;
            })
          }
        })
      }

    },
    components: {
      Datepicker
    },
    mounted() {
      this.getTask();
      this.getSubTask();
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

</style>
