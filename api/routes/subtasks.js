module.exports = (api, _, Task, Project, utils, Subtask) => {

  api.post('/subtask', (req, res) => {
    if(_.isEmpty(req.body)) return utils.jsonResponse(400, 'error', null, res, 'Fields are empty')
    req.checkBody('name', "Name field cannot be empty").notEmpty();
    req.checkBody('description', "Description field cannot be empty").notEmpty();
    req.checkBody('due_date', 'Date cannot be empty').notEmpty();
    req.checkBody('priority', 'Priority cannot be empty').notEmpty();

    req.getValidationResult()
      .then((result) => {
        if (!result.isEmpty()) {
          return utils.jsonResponse(400, 'error', null.res, 'Data Validation Failed', result.array())
        }
        const subtask_data = _.pick(req.body, ['name', 'description', 'priority', 'due_date']);
        subtask_data.due_date = new Date(subtask_data.due_date);

        Task.findById(req.body.task_id).exec((err, task) => {
          if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while finding Task', err);
          if (!task) return utils.jsonResponse(404, 'error', null, res, 'Task not found', err);

          subtask_data.task = task._id;

          Subtask.findOne({
            name: subtask_data.name,
            task: subtask_data.task
          }).exec((err, subtask) => {

            if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while finding Subtask', err);
            if (subtask) return utils.jsonResponse(500, 'error', null, res, 'Duplicate Subtask found', err);


            const new_subtask = new Subtask(subtask_data);

            new_subtask.save((err) => {
              if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while creating subtask', err);

              Task.findByIdAndUpdate(new_subtask.task, {
                is_completed: false
              }, {
                new: true
              }, (err, task) => {
                if (err) utils.jsonResponse(500, 'error', null, res, 'Error Occured while Updating Task', err);
                return utils.jsonResponse(200, 'success', new_subtask, res, 'Subtask Created');
              })

            })
          })


        })
      })
  })

  api.get('/subtask', (req, res) => {
    Subtask.find({}).exec((err, subtasks) => {

      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while finding Subtasks', err);
      if (!subtasks || _.isEmpty(subtasks)) return utils.jsonResponse(404, 'error', null, res, 'Subtasks have not been created', err);
      return utils.jsonResponse(200, 'success', subtasks, res, 'Subtasks Retrieved');
    })
  })

  api.get('/subtask/:id', (req, res) => {
    Subtask.findById(req.params.id).exec((err, subtask) => {
      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while finding Subtask', err);
      if (!subtask) return utils.jsonResponse(404, 'error', null, res, 'Subtask not found', err);
      return utils.jsonResponse(200, 'success', subtask, res, 'Subtasks Retrieved');
    })
  })

  api.put('/subtask/:id', (req, res) => {
    const subtask_update = _.pick(req.body, ['name', 'description', 'is_completed', 'priority', 'due_date']);

    Subtask.findById(req.params.id, (err, subtask) => {
      if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while finding subtask', err);
      if (!subtask) return utils.jsonResponse(404, 'error', null, res, 'Subtask not found');

      if (subtask_update.due_date) subtask_update.due_date = new Date(subtask_update.due_date);

      subtask = Object.assign(subtask, subtask_update)

      subtask.save((err) => {
        if (err) utils.jsonResponse(500, 'error', null, res, 'Error encountered while saving subtask', err);
        if (subtask.is_completed !== true) {
          return utils.jsonResponse(200, 'success', subtask, res, 'Subtask updated');
        }

        Subtask.find({
          task: subtask.task
        }, (err, subtasks) => {
          if (err) utils.jsonResponse(500, 'error', null, res, 'Error occured while Retreiving Subtasks', err);
          if (!subtasks) utils.jsonResponse(500, 'error', null, res, 'No Subtasks found', err);

          let completed_subtask = 0;

          subtasks.forEach(subtask => {
            if (subtask.is_completed == true) completed_subtask++;
          })

          if (completed_subtask !== subtasks.length) {
            return utils.jsonResponse(200, 'success', subtask_update, res, 'Subtask updated');
          } else {

            Task.findByIdAndUpdate(subtask.task, {
              is_completed: true
            }, {
              new: true
            }, (err, task) => {
              if (err) return utils.jsonResponse(500, 'error', null, res, 'Error occured while Retreiving Subtasks', err);
              return utils.jsonResponse(200, 'success', task, res, 'Task Updated Successfully');
            })
          }
        })


      })
    })
  })

  api.delete('/subtask/:id', (req, res) => {
    Subtask.findByIdAndRemove(req.params.id).exec((err) => {
      if (err) return utils.jsonResponse(500, 'error', null, res, 'An Error Occured While Deleting', err);
      return utils.jsonResponse(200, 'success', null, res, 'Subtask Deleted Successfully')
    })
  })
}
