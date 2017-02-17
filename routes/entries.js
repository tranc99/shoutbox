var Entry = require('../lib/entry');

exports.list = function(req, res, next) {
  var page = req.page;
  Entry.getRange(page.from, page.to function(err, entries) {
    if (err) return next(err);

    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

exports.form = function(req, res) {
  if (!req.session.uid) {
    req.session.messages = req.session.messages || [];
    req.session.messages.push({ type: 'error', string: 'Please login to make posts' });
    console.log('Avoid the silent error');
    res.redirect('/');
  }
  res.render('post', { title: 'Post' });
};

exports.submit = function(req, res, next) {
  var data = req.body.entry;

  var entry = new Entry({
    "username": res.locals.user.name,
    "title": data.title,
    "body": data.body
  });

  entry.save(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
};
