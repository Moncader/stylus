
/*!
 * Stylus - Visitor
 * Copyright (c) Automattic <developer.wordpress.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Visitor` with the given `root` Node.
 *
 * @param {Node} root
 * @api private
 */

var Visitor = module.exports = function Visitor(root) {
  this.root = root;
  this.recentNodes = [];
};

/**
 * Visit the given `node`.
 *
 * @param {Node|Array} node
 * @api public
 */

Visitor.prototype.visit = function(node, fn){
  var method = 'visit' + node.constructor.name;
  var ret;

  if (this[method]) {
    this.recentNodes.push(node);
    ret = this[method](node);
    this.recentNodes.pop();

    return ret;
  }

  return node;
};

Visitor.prototype.getRecent = function(nodeClass) {
  var nodes = this.recentNodes;
  var i = nodes.length;

  while (--i) {
    if (nodes[i] instanceof nodeClass) {
      return nodes[i];
    }
  }
};

