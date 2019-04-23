const tcomb = require('tcomb')
const checkDB = require('./dbConnection').checkDB;
const uuid = require('uuid/v4');

const CATEGORY = t.enums({
    Weather,
    sea,
    transport
  }, 'Category')

const STATUS = t.enums({
    warning,
    threat,
    danger,
    risk
  }, 'Status')

const ALERT = tcomb.struct({
    id: tcomb.String,
    type: CATEGORY,
    label: tcomb.String,
    status: STATUS,
    from: tcomb.DATE,
    to: tcomb.DATE

}, {strict: true})

const ERROR = tcomb.struct({
    code: tcomb.number,
    type: tcomb.String,
    message: tcomb.String
}, {strict: true})

const get = (id) => {
  const usersFound = users.filter((user) => user.id === id)
  return usersFound.length >= 1
      ? usersFound[0]
      : undefined
}

const getAll = () => {
  return users
}

const add = (user) => {
  const newUser = {
      ...user,
      id: uuidv1()
  }
  if (validateUser(newUser)) {
      users.push(newUser)
  } else {
      throw new Error('user.not.valid')
  }
  return newUser
}

const update = (id, newUserProperties) => {
  const usersFound = users.filter((user) => user.id === id)

  if (usersFound.length === 1) {
      const oldUser = usersFound[0]

      const newUser = {
          ...oldUser,
          ...newUserProperties
      }

      // Control data to patch
      if (validateUser(newUser)) {
          // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
          // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
          Object.assign(oldUser, newUser)
          return oldUser
      } else {
          throw new Error('user.not.valid')
      }
  } else {
      throw new Error('user.not.found')
  }
}

const remove = (id) => {
  const indexFound = users.findIndex((user) => user.id === id)
  if (indexFound > -1) {
      users.splice(indexFound, 1)
  } else {
      throw new Error('user.not.found')
  }
}

function validateUser(user) {
  let result = false
  /* istanbul ignore else */
  if (user) {
      try {
          const tcombUser = USER(user)
          result = true
      } catch (exc) {
          result = false
      }
  }
  return result
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove