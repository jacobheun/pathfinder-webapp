/**
 * Created by jheun on 11/14/13.
 */


exports.item = function(req, res){
  res.render('players/player/index', { title: 'Item: ' + req.params.id });
};