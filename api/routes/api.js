const _ = require('lodash');
const Task = require('../model/tasks');
const Project = require('../model/project');
const Subtask = require('../model/subtasks');
const utils = require('../functions')

module.exports = (express) => {

    const api = express.Router();

    require('./projects')(api, _, Task, Project, utils);
    require('./tasks')(api, _, Task, Project, utils, Subtask);
    require('./subtasks')(api, _, Task, Project, utils, Subtask);

    return api;
}