import { required, search, ServerError } from '../util'

/**
 * Used to CRUD in database
 */
class Rest {
  storageKey = '';
  list = [];

  /**
   * a function to return a function which return a record list
   * @returns {*}
   */
  get listMap() {
    return this.list.reduce((prev, next) => {
      return { ...prev, [next.id]: next };
    }, {});
  }

  /**
   * a function to save to database (using localStorage)
   */
  persist = () =>
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.list));

  /**
   * a function to load from database (using localStorage)
   * @returns {any|*[]}
   */
  load = () =>
    (this.list =
      JSON.parse(window.localStorage.getItem(this.storageKey)) || []);

  /**
   * A function to check if an item with a certain ID exists; if not, throw an error
   * @param id
   */
  validateItem = (id) => {
    this.load();
    if (!this.listMap[id]) {
      const error = new ServerError(`No item with the id "${id}"`);
      error.status = 404;
      throw error;
    }
  };


  /**
   * a function to reorder items in the database
   * @param fromId
   * @param type 'after'|'before'
   * @param toId
   */
  reorder({ fromId, type, referenceId }) {
    const movingItemIndex = this.list.findIndex((item) => item.id === fromId);
    if (!referenceId) {
      insertAfter(this.list, movingItemIndex, this.list.length - 1);
      this.persist();
      return;
    }
    const targetIndex = this.list.findIndex((item) => item.id === referenceId);
    const insert = type === 'after' ? insertAfter : insertBefore;
    insert(this.list, movingItemIndex, targetIndex);
    this.persist();
  }

  /**
   * a function to push items into 'list'
   * @param items items to be pushed into 'list'
   */
  push(items) {
    items.forEach((item) => this.create(item));
    this.persist();
  }

  /**
   * a function to return a record object
   * @param id
   * @returns {*}
   */
  detail = (id) => {
    this.validateItem(id);
    return this.listMap[id];
  };

  /**
   * A function to mark a certain item as "deleted"
   * @param id
   */
  remove = (id) => {
    this.validateItem(id);
    const target = this.list.find(item => item.id === id)
    if(!target){
      return
    }
    target.deleted = true
    // this.list = this.list.filter((item) => item.id !== id);
    this.persist();
  };

  /**
   * A function to update a record object
   * @param id
   * @param updates
   * @returns {*}
   */
  update(id, updates) {
    this.validateItem(id);

    const target = this.list.find((item) => item.id === id);
    this.list[this.list.indexOf(target)] = { ...target, ...updates };

    this.persist();
    return this.detail(id);
  }

  /**
   * A function to create a record object
   * @param name
   * @param rest
   * @returns {*}
   */
  create({ name = required('name'), ...rest }) {
    const ids = Object.keys(this.listMap).map(Number);
    const id = Math.max(...ids, 0) + 1;
    const newItem = { ...rest, name, id };
    this.list.push(newItem);
    this.persist();
    return this.detail(id);
  }

  /**
   * A function to query by params
   * @param param
   * @returns {*}
   */
  query(param) {
    return search(this.list, param).filter(item => !item.deleted);
  }

  /**
   * A function to query by params and ownerId
   * @param userId
   * @param param
   * @returns {*}
   */
  queryByOwnerId(userId, param) {
    return this.query(param).filter((item) =>
      'ownerId' in item ? item['ownerId'] === userId : true
    );
  }

  constructor(storageKey) {
    this.storageKey = storageKey;
    try {
      this.load();
    } catch (error) {
      this.persist();
    }
  }
}

// create databases
export const projectDB = new Rest("__evm__project");
export const epicDB = new Rest("__evm__epic");
export const taskDB = new Rest("__evm__task");
export const kanbanDB = new Rest("__evm__kanban");
// TODO
export const userDB = new Rest("__evm__users");
export const taskTypeDB = new Rest("__evm__task__type");
export const tagDB = new Rest("__evm__tag__");
export const evmDB = new Rest('__evm__evm__');

const insertBefore = (list, from, to) => {
  const toItem = list[to];
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

const insertAfter = (list, from, to) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};
