const Project = require('../../models/Project');
const Domain = require('../../models/Domain');

export async function allProjects(req, res) {
  // const { owner } = req.body;
  // console.log(owner);
  const projects = await Project.find();
  res.status(200).send(projects);
  // if (owner && owner.length !== 0) {
  //   const projects = await Project.find({ owner: owner });
  //   res.status(200).send(projects);
  // } else {
  //   res.status(200).json({ message: 'Проектов нет' });
  // }
}

export async function addProject(req, res) {
  try {
    const newProject = req.body;
    const project = await new Project(newProject);
    if (await project.save())
      res
        .status(200)
        .json({ status: 'success', message: 'Проект успешно создан' });
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: 'error', message: 'Что-то не то' });
  }
}

export async function getDomainsByProjectId(req, res) {
  // const project = await Project.findById(req.params.id);
  const idProject = req.params.id;
  const domains = await Domain.find({
    blacklist: false,
    projects: { $in: [idProject] },
  });
  res.send(domains);
}

export async function deleteProjectById(req, res) {
  try {
    await Project.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: 'success', message: 'Успешно удалено' });
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: 'error', message: 'Ошибка при удалении' });
  }
}
