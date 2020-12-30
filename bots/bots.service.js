import { readFile, writeFile } from 'fs/promises'

/**
 * Os informações de exibição do Bot.
 * @typedef {Object} botDetails
 * @property {String[]} tags - Categorias do bot.
 * @property {String[]} otherOwners  -	Id dos demais donos do bot
 * @property {String} prefix 	 -	Prefixo do Bot
 * @property {String} customInviteLink 	 -	Link customizado para o convite do bot
 * @property {String} library 	 	- Biblioteca que o bot foi programado
 * @property {String} shortDescription - Descrição curta do bot
 * @property {String} longDescription  -	Descrição longa formatada em MarkDown
 * @property {String} htmlDescription 	 -	Descrição longa formatada em HTML
 * @property {String} website 	 	- Site do bot
 * @property {String} supportServer 	 -	Id do convite do Discord
 * @property {String} customURL  -	Url customiza da pagina do Bot
 */

/**
 * As informações de Votos do Bot.
 * @typedef {Object} botVotes
 * @property {Number} current - Número atual dos votos do bot
 * @property {String[]} votesLog - Id das pessoas que votaram a partir de 19/09/2020
 */

/**
 * As informações de Datas do Bot.
 * @typedef {Object} botDates
 * @property {String} sent - Dia do envio do Bot para o Zuraaa!
 */

/**
 * Um bot e todas suas informações
 * @typedef {Object} Bot
 * @property {String} _id - Id do usuário (O mesmo da URL)
 * @property {String} username - Usuário do Bot no Discord
 * @property {String} discriminator - Tag do usuário no Discord (Ex: #0001)
 * @property {String} owner - O dono que registrou o bot no Zuraaa!
 * @property {String} avatar - Hash do avatar que está sendo exibido no Zuraaa!
 * @property {String} status - Status da conta do Bot no Discord (WIP)
 * @property {botDates} dates - Datas relacionadas a conta.
 * @property {botDetails} details - Informações de exibição do Bot.
 * @property {botVotes} votes - Votos que o bot possui.
 */

const dbPath = './bots/bots.json'

/**
 * Array de bots vindo da database
 * @type {Bot[]}
 */
const data = await JSON.parse(await readFile(dbPath))

/**
 * - Retorna todos os bots
 * @returns {Bot[]} - Todos bots
 */
const getAll = () => {
  return data
}

/**
 * - Retorna apenas um bot por ID
 * @param {Bot['_id']} id 
 * @returns {Bot | {}} - O bot
 */
const getById = (id) => {
  return data.find(bot => bot._id === id || bot.details.customURL === id) || {}
}

/**
 * - Retorna o Top 6 mais votados!
 * @param {Number} length - A quantidade de tops que você quer
 * @returns {Bot[]} - Os Tops
 */
const getTop = (length) => {
  data.sort((a, b) => b.votes.current - a.votes.current)
  const newData = []
  for (let index = 0; index < length; index++) {
    newData.push(data[index])
  }
  return newData
}

/**
 * - Cria um bot no banco de dados
 * @param {Bot} bot - O bot para ser criado
 * @returns {Promise<String>} status final da criação, 'OK' se ocorrer tudo bem e 'ERR' se ocorrer um erro
 */
const createBot = async (bot) => {
  if(bot._id === undefined) return 'ERR'
  if(bot.username === undefined) return 'ERR'
  if(bot.discriminator === undefined) return 'ERR'
  if(bot.owner === undefined) return 'ERR'
  if(bot.avatar === undefined) return 'ERR'
  if(bot.status === undefined) return 'ERR'
  if(bot.dates === undefined) return 'ERR'
  if(bot.details === undefined) return 'ERR'
  if(bot.votes === undefined) return 'ERR'
  data.push(bot)
  await writeFile(dbPath, JSON.stringify(data, null, 4), 'utf-8')
  return 'OK'
}

/**
 * 
 * @param {Bot} oldBot 
 * @param {Bot} updatedBot 
 */
const updateBot = async (oldBot, updatedBot) => {
  // TODO: Implementar isso
  throw new Error('Not Implemented!')
}

/**
 * - Deleta um bot por ID
 * @param {Bot['_id']} id 
 * @returns {String}
 */
const deleteBot = async (id) => {
  // TODO: Implementar isso
  throw new Error('Not Implemented!')
}

export { getAll, getById, getTop, createBot, updateBot, deleteBot }
