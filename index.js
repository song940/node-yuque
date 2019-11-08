const xttp = require('xttp');
const pkg = require('./package');
/**
 * YuQue
 * @docs https://yuque.alibaba-inc.com/lark/developer/api-v2 
 */
class YuQue {
  constructor(options) {
    this.api = 'https://yuque.alibaba-inc.com/api/v2';
    Object.assign(this, options);
  }
  request(method, path, params) {
    const { api, token } = this;
    return xttp(api + path, {
      method,
      headers: {
        'User-Agent': `${pkg.name}/${pkg.version}`,
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
      body: params
    })
      .then(res => res.json())
      .then(res => res.data)
  }
  /**
   * hello
   */
  hello() {
    return this.request('get', '/hello');
  }

  /**
     * user
     * @param {*} id 
     */
  user(id) {
    return this.request('get', `/users/${id}`);
  }

  /**
   * topics
   */
  topics() {
    return this.request('get', '/user/topics');
  }

  getRepositoies(user) {
    return this.request('get', `/users/${user}/repos`);
  }

  /**
   * 往自己下面创建仓库
   * @param {*} repo 
   * @param {*} user 
   */
  createRepositoryToUser(repo, user) {
    return this.request('post', `/users/${user}/repos`, repo);
  }

  groups(user) {
    if (user) return this.request('get', `/users/${user}/groups`);
    return this.request('get', '/groups');
  }
  createGroup(name, description) {
    return this.request('post', '/groups', {
      name,
      description
    });
  }
  group(id) {
    return this.request('get', `/groups/${id}`);
  }
  /**
   * 更新单个组织的详细信息
   * @param {*} id 
   * @param {*} name 
   * @param {*} description 
   */
  modifyGroup(id, name, description) {
    return this.request('put', `/groups/${id}`, {
      name,
      description
    });
  }
  /**
   * 删除组织
   * @param {*} id 
   */
  deleteGroup(id) {
    return this.request('delete', `/groups/${id}`);
  }
  /**
   * 获取组织成员信息
   * @param {*} id 
   */
  getUsersByGroupId(id) {
    return this.request('get', `/groups/${id}/users`);
  }
  /**
   * 增加或更新组织成员
   */
  modifyGroupUser(user, group) {
    return this.request('PUT', `/groups/${group}/users/${user}`);
  }
  /**
   * 删除组织成员
   * @param {*} user 
   * @param {*} group 
   */
  removeUserFromGroup(user, group) {
    return this.request('delete', `/groups/${group}/users/${user}`);
  }

  /**
   * 往组织创建仓库
   * @param {*} repo 
   * @param {*} group 
   */
  createRepositoryToGroup(repo, group) {
    return this.request('post', `/groups/${group}/repos`, repo);
  }

  /**
   * 获取知识库详情
   * @param {*} id 
   */
  getRepository(id) {
    return this.request('get', `/repos/${id}`);
  }
  /**
   * 更新仓库信息
   */
  modifyRepository(id) {
    return this.request('put', `/repos/${id}`);
  }
  /**
   * 删除仓库
   * @param {*} id 
   */
  deleteRepository(id) {
    return this.request('put', `/repos/${id}`);
  }

  /**
   * 获取一个仓库的目录结构
   */
  toc(id) {
    return this.request('get', `/repos/${id}/toc`);
  }
  /**
     * 创建文档
     * @param {*} repository 
     * @param {*} doc 
     */
  createDocument(repository, doc) {
    return this.request('post', `/repos/${repository}/docs`, doc);
  }
  modifyDocument(repository, id, doc) {
    return this.request('put', `/repos/${repository}/docs/${id}`, doc);
  }
  deleteDocument(repository, id) {
    return this.request('delete', `/repos/${repository}/docs/${id}`);
  }
  getDocuments(repository) {
    return this.request('get', `/repos/${repository}/docs`);
  }
  getDocument(repository, slug, isRaw) {
    return this.request('get', `/repos/${repository}/docs/${slug}`, {
      raw: +isRaw
    });
  }
  documentVersions(id) {
    return this.request('get', `/doc_versions?doc_id=${id}`);
  }

  artboard(id) {
    return this.request('get', `/artboards/${id}`);
  }
  artboards(book_ids) {
    return this.request('get', `/artboards`, { book_ids });
  }


  search(query) {
    return this.request('get', `/search?q=${encodeURIComponent(query)}`);
  }
}

module.exports = YuQue;