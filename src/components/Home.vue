<template>
  <div class="home">
    <nav class="navbar ">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/" class="button">Home</router-link>
          </a>
          <a class="navbar-item">
            <a class="button" @click="openAddProject()">Create a project</a>
          </a>
          <a class="navbar-item">
              <router-link to="/task" class="button">View All Tasks</router-link>
            </a>
        </div>
        <div class="navbar-item is-centered">
          <h1>Projects</h1>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="columns is-multiline">
        <div v-for="project in existingProjects">
          <div class="column ">
            <projectCard :project="project"></projectCard>
          </div>
        </div>

      </div>
    </div>
    <div>
      <div class="modal" :class="{'is-active':addProjectModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add a project</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <div class="control">
                <input class="input " type="text" placeholder="Name" v-model='newProject.name'>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <textarea class="input" type="textarea" placeholder="Description" v-model="newProject.description" style="min-height:100px"></textarea>
              </div>
            </div>

          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" :class="{'is-loading':createProjectLoading}" @click="createProject()">Create Project</button>
            <button class="button" @click="addProjectModal = false">Cancel</button>
          </footer>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import projectCard from '@/components/Projects'
  import {
    EventBus
  } from '../bus.js'
  export default {
    name: 'Home',
    data() {
      return {
        newProject:{},
        addProjectModal: false,
        createProjectLoading: false,
        existingProjects: null,
        selectedProject: null,
      }
    },
    methods: {
      openAddProject() {
        this.addProjectModal = !this.addProjectModal
      },
      createProject() {
        this.createProjectLoading = !this.createProjectLoading
        this.$axios.post('/project', this.newProject).then(resp => {

          this.createProjectLoading = !this.createProjectLoading
          this.newProject = {}
          this.openAddProject();
          this.$modalResponse(resp.data.status.toUpperCase(), resp.data.message, resp.data.status)
          this.getProjects()
          
        }).catch((e)=>{
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<p>Project Name Has Been Taken</p>',
          })
          this.createProjectLoading = !this.createProjectLoading
          this.openAddProject();
          this.getProjects()

        })
      },
      getProjects() {

        this.$axios.get('/project').then(resp => {
          console.log(resp);
          this.existingProjects = resp.data.data
        }).catch((e)=>{
          this.$modalResponse({
            type: e.response.data.status,
            title: 'Oops...',
            text: e.response.data.message,
            footer: '<pNo Projects Created Yet</p>',
          })
        })
      }
    },
    components: {
      projectCard
    },
    computed: {


    },
    mounted() {
      this.getProjects();
      EventBus.$on('added-task', resp => {
        this.getProjects();
      })
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
