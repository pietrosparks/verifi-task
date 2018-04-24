module.exports = (api, _, Task, Project, utils) => {

    api.post('/project', (req, res) => {
        const new_project = _.pick(req.body, ['name', 'description']);
        const project = new Project(new_project);
        project.save((err, data) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error', err);
            return utils.jsonResponse(200, 'success', data, res, 'Project Created Successfully');
        })
    })

    api.get('/project', (req, res) => {
        Project.find({}).exec((err, projects) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error', err);
            if (!projects) return utils.jsonResponse(404, 'error', null, res, 'Projects not found', err);
            return utils.jsonResponse(200, 'success', projects, res, 'Projects Found');
        })
    })

    api.get('/project/:id', (req, res) => {
        Project.findById(req.params.id).exec((err, project) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error', err);
            if (!project) return utils.jsonResponse(404, 'error', null, res, 'Projects not found', err);
            return utils.jsonResponse(200, 'success', project, res, 'Project Found');
        })
    })

    api.get('/project/:id/tasks', (req, res) => {
        if (req.query.sort) {
            const SortParams = JSON.parse(req.query.sort);
            let query = {};
            query[SortParams.order] = SortParams.direction;

            Task.find({project: req.params.id}).sort(query).exec((err, tasks) => {
                if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error retrieving tasks', err);
                if (!tasks || _.isEmpty(tasks)) return utils.jsonResponse(404, 'error', null, res, 'Tasks not found', err)
                return utils.jsonResponse(200, 'success', tasks, res, 'Tasks Retrieved')
            })
        } else {

            Task.find({
                project: req.params.id
            }, (err, tasks) => {
                if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error retrieving tasks', err);
                if (!tasks || _.isEmpty(tasks)) return utils.jsonResponse(404, 'error', null, res, 'Tasks not found', err)
                return utils.jsonResponse(200, 'success', tasks, res, 'Tasks Retrieved')
            })
        }

    })

    api.put('/project/:id', (req, res) => {
        const updated_project = _.pick(['name', 'description', 'is_completed']);
        Project.findByIdAndUpdate(req.params.id, updated_project, {
            new: true
        }, (err, project) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error while updating Project', err);
            return utils.jsonResponse(200, 'success', project, res, 'Project Edited Successfully', err);
        })
    })

    api.delete('/project/:id', (req, res) => {
        Project.findByIdAndRemove(req.params.id).exec((err) => {
            if (err) return utils.jsonResponse(500, 'error', null, res, 'There was an error while deleting a project', err);
            return utils.jsonResponse(200, 'success', null, res, 'Project Deleted Successfully');
        })
    })


}