const data = require('./data');
const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((value) => ids.includes(value.id));
}

function getAnimalsOlderThan(animal, age) {
  const animalSpecie = species.find((value) => value.name === animal);
  return animalSpecie.residents.every((value) => value.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((element) => element.firstName === employeeName
    || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managers = employees.map((employee) => employee.managers);
  return managers.some((employee) => employee.includes(id));
}

isManager('9e7d4524-363c-416a-8759-8aa7e50c0992');

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(countSpecies) {
  if (!countSpecies) {
    return species.reduce((acc, curr) =>
      ({ ...acc, [curr.name]: curr.residents.length }), {});
  }
  return species.find((element) => element.name === countSpecies).residents.length;
}

function calculateEntry({ Adult = 0, Senior = 0, Child = 0 } = {}) {
  return (prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const week = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return week;
  }

  return { [`${dayName}`]: week[`${dayName}`] };
}

function getOldestFromFirstSpecies(id) {
  const getAnimalId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const specieArray = species.find((animal) => animal.id === getAnimalId).residents;
  const ageArray = specieArray.reduce((acc, curr) => (curr.age > acc.age ? curr : acc));
  return Object.values(ageArray);
}

function increasePrices(percentage) {
  const increase = percentage / 100;
  const adultNewPrice = prices.Adult + (increase * (prices.Adult));
  const childNewPrice = prices.Child + (increase * (prices.Child));
  const seniorNewPrice = prices.Senior + (increase * (prices.Senior));
  prices.Adult = Math.round(adultNewPrice * 100) / 100;
  prices.Child = Math.round(childNewPrice * 100) / 100;
  prices.Senior = Math.round(seniorNewPrice * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
