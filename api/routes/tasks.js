module.exports = (api, _, Task, Project, utils, Subtask) => {

  api.post('/task', (req, res) => {
    if(_.isEmpty(req.body)) return utils.jsonResponse(400, 'error', null, res, 'Fields are empty')
    req.checkBody('name', "Name field cannot be empty").notEmpty();
    req.checkBody('description', "Description field cannot be empty").notEmpty();
    req.checkBody('due_date', 'Date cannot be empty').notEmpty();
    req.checkBody('priority', 'Priority cannot be empty').notEmpty();

    req.getValidationResult()
      .then((result) => {
          console.log(result);
        if (!result.isEmpty()) {
          return utils.jsonResponse(400, 'error', null,res, 'Data Validation Failed', result.array())
        }
        const task_data = _.pick(req.body, ['name', 'description', 'priority', 'due_date'])
        task_data.due_date = new Date(task_data.due_date);

        Project.findById(req.body.project_id).exec((err, project) => {
          if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while getting Project', err);
          if (!project) return utils.jsonResponse(404, 'error', null, res, 'Project not found', err)
          task_data.project = project._id;

          Task.findOne({
            name: task_data.name,
            project: task_data.project
          }).exec((err, task) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error', err);
            if (task) return utils.jsonResponse(500, 'error', null, res, 'Duplicate Task Name', err);

            const new_task = new Task(task_data);
            new_task.save((err) => {
              if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error Saving', err);

              Project.findByIdAndUpdate(req.body.project_id, {
                is_completed: false
              }).exec((err, project) => {
                if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error Updating Project', err);
                return utils.jsonResponse(200, 'success', new_task, res, 'Task Created');
              })
            })
          })
        })
      })
  })


  api.get('/task', (req, res) => {

    if (req.query.filter) {
      const SortParams = JSON.parse(req.query.filter);
      let query = {};
      let filter = {};
      if (SortParams.sort && SortParams.sort !==null) query[SortParams.sort.order] = SortParams.sort.direction;
      if (SortParams.filter && SortParams.filter !==null) filter = SortParams.filter;

      Task.find(filter).exec((err, tasks) => {
        if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error retrieving tasks', err);
        if (!tasks || _.isEmpty(tasks)) return utils.jsonResponse(404, 'error', null, res, 'Tasks not found', err)
        return utils.jsonResponse(200, 'success', tasks, res, 'Tasks Retrieved')
      })
    } else {
      Task.find({}, (err, tasks) => {
        if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while getting tasks', err);
        if (!tasks || _.isEmpty(tasks)) return utils.jsonResponse(404, 'error', null, res, 'Tasks not found', err);
        return utils.jsonResponse(200, 'success', tasks, res, 'Tasks Found');
      })
    }

  })

  api.get('/task/:id', (req, res) => {
    Task.findById(req.params.id).exec((err, task) => {
      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while getting tasks', err);
      if (!task) return utils.jsonResponse(404, 'error', null, res, 'Tasks not found', err);
      return utils.jsonResponse(200, 'success', task, res, 'Task Found');
    })
  })

  api.get('/task/:id/subtask', (req, res) => {
    Subtask.find({
      task: req.params.id
    }).exec((err, subtask) => {
      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while getting subtasks', err);
      if (!subtask || _.isEmpty(subtask)) return utils.jsonResponse(404, 'error', null, res, 'Subtasks not found', err);
      return utils.jsonResponse(200, 'success', subtask, res, 'Subtasks found');
    })
  })

  api.put('/task/:id', (req, res) => {
    Task.findById(req.params.id).exec((err, task) => {

      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while getting tasks', err);
      if (!task) return utils.jsonResponse(404, 'error', null, res, 'Tasks not found', err);

      const task_update = _.pick(req.body, ['name', 'description', 'is_completed', 'due_date', 'priority']);
      if (task_update.due_date) task_update.due_date = new Date(task_update.due_date);

      task = Object.assign(task, task_update)

      task.save((err) => {
        if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while saving tasks', err);
        if (req.body.is_completed != true) return utils.jsonResponse(200, 'success', task, res, 'Task Updated');

        Task.find({
          project: task.project
        }, (err, tasks) => {
          if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while retrieving tasks', err);
          if (!tasks) return utils.jsonResponse(404, 'error', null, res, 'Error occured while retrieving tasks', err);
          let completed_tasks = 0;

          tasks.forEach(task => {
            if (task.is_completed == true) completed_tasks++
          });

          if (completed_tasks != tasks.length) {
            return utils.jsonResponse(200, 'success',
              task, res, 'Task Updated');
          }

          Project.findByIdAndUpdate(task.project, {
            is_completed: true
          }, {
            new: true
          }, (err, project) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error', err)
            return utils.jsonResponse(200, 'success', project, res, 'Task updated')
          })

        })
      })
    })
  })

  api.delete('/task/:id', (req, res) => {
    console.log(req.params.id);
    Task.findByIdAndRemove(req.params.id).exec((err) => {
      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while removing task', err);
      utils.jsonResponse(200, 'success', null, res, 'Task Successfully Removed');
    })
  })
}
