export const storageService = {
  query,
  get,
  post,
  put,
  remove,
};
<<<<<<< HEAD
=======

>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
function query(entityType, delay = 500) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('OOOOPs')
      resolve(entities);
    }, delay);
  });
  // return Promise.resolve(entities)
}
<<<<<<< HEAD
function get(entityType, entityId) {
  return query(entityType).then((entities) => entities.find((entity) => entity._id === entityId));
}
=======

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  );
}

>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}
<<<<<<< HEAD
function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
=======

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}
<<<<<<< HEAD
=======

>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}
<<<<<<< HEAD
function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
function _makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
=======

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
