const buildClassMethods = require('./methods/class')
const buildInstanceMethods = require('./methods/instance')

module.exports = client => ({
  withCache (modelClass, options = { dataToInstance: true }) {
    modelClass.cache = function (customId) {
      return customId
        ? buildClassMethods.manual(client, this, customId, options)
        : buildClassMethods.auto(client, this)
    }

    modelClass.prototype.cache = function () {
      return buildInstanceMethods(client, this)
    }

    return modelClass
  }
})
