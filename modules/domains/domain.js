const Domain = require('../../models/Domain');

export async function allDomains(req, res) {
  const domains = await Domain.find({});
  res.status(200).send(domains);
}

export async function allDomainsByIds(req, res) {
  try {
    let ids = req.body;
    console.log(ids);
    const domains = await Domain.find({ _id: { $in: ids } });
    res.status(200).send(domains.map(row => row.domain));
  } catch (e) {
    console.log('Error', e);
  }
}

export async function addDomain(req, res) {
  try {
    const newDomain = req.body;
    const domain = await new Domain(newDomain);
    if (await domain.save())
      res.status(200).json({ message: 'Домен успешно добавлен' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Ошибка добавления' });
  }
}

export async function domainById(req, res) {
  try {
    const domain = await Domain.findById(req.params.id);
    res.send(domain);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Домен не найден' });
  }
}

export async function deleteDomain(req, res) {
  try {
    await Domain.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: 'success', message: 'Успешно удалено' });
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: 'error', message: 'Ошибка при удалении' });
  }
}

export async function updateDomain(req, res) {
  try {
    await Domain.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json({ status: 'success', message: 'Успешно обновлено' });
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: 'error', message: 'Ошибка при обновлении' });
  }
}
