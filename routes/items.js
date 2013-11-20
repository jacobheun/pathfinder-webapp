/**
 * Created by jheun on 11/14/13.
 */


exports.item = function(req, res){
  res.render('items/item/index', { title: 'Item: ' + req.params.id, active: 'items'  });
};

exports.items = function(req, res) {
  res.render('items/index', { title: 'Pathfinder - Items', active: 'items' });
}