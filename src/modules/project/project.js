const Project = require('../../models/Project');
const Domain = require('../../models/Domain');

export async function allProjects(req, res) {
  try {
    const domains = await Domain.find();
    const projects = await Project.find();
    //добавляем количество доменов в каждом проекте
    projects.map(project => {
      project.countDomains = domains.filter(item =>
        item.projects.includes(project._id)
      ).length;
      project.countEmails = domains
        .filter(item => item.projects.includes(project._id))
        .filter(item => item.emails.length > 0).length;
    });
    res.status(200).send(projects);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Проекты не найдены или иная ошибка' });
  }
}

export async function getProject(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).send(project);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Проект не найден' });
  }
}

export async function updateProject(req, res) {
  try {
    await Project.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json({ status: 'success', message: 'Успешно обновлено' });
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: 'error', message: 'Ошибка при обновлении' });
  }
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
