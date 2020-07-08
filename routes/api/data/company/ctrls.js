const Company = require('../../../../models/companies');
const Group = require('../../../../models/groups');

exports.list = (req, res) => {
    let { draw, search, skip, limit, order, sort } = req.query;

    if (draw === undefined) return res.send({success: false, msg: 'param err draw'});
    if (search === undefined) return res.send({success: false, msg: 'param err search'});
    if (skip === undefined) return res.send({success: false, msg: 'param err skip'});
    if (limit === undefined) return res.send({success: false, msg: 'param err limit'});
    if (order === undefined) return res.send({success: false, msg: 'param err order'});
    if (sort === undefined) return res.send({success: false, msg: 'param err sort'});

    skip = parseInt(skip);
    limit = parseInt(limit);
    sort = parseInt(sort);

    let d = {
        draw: draw, 
        cnt: 0, 
        ds: []
    };

    Company.count()
        .where('name').regex(search)
        .then((c) => {
            d.cnt = c;
            const s = {};
            s[order] = sort;
            return Company.find()
                .where('name').regex(search)
                .populate('gr_ids')
                .sort(s)
                .skip(skip)
                .limit(limit);
        })
        .then((ds) => {
            d.ds = ds;
            res.send({ success: true, d:d });
        })
        .catch(err => {
            res.send({ success: false, msg: err.message });
        });
}

exports.add = (req, res) => {
    //res.send({success: false, msg: 'add 준비중입니다.'});
    const { name } = req.body;

    console.log('name: ' + name);
    if (!name) { return res.send({ success: false, msg: '이름 없음'}); }
    const cp = new Company({ name: name });
    cp.save()
        .then(() => {
            console.log('create company');
            res.send({success: true})
        })
        .catch(err => {
            console.log('error: ' + err.message);
            res.send({ success: false, msg: err.message })
        });
}

exports.mod = (req, res) => {
    const set = req.body;
    if (!Object.keys(set).length) return res.send({ success: false, msg: 'body not set'});
    if (!set._id) return res.send({ success: false, msg: 'id not exitst'});
    set.ut = new Date();
    const f = { _id: set._id };
    const s = { $set: set };
    Company.findOneAndUpdate( f, s )
        .then(() => res.send({success: true}))
        .catch(err => res.send({ success: false, msg: err.message }));
}

exports.del = (req, res) => {
    const { id } = req.query;
    if (!id) return res.send({ success: false, msg: 'id not exitst'});
    let cp;
    Company.findOne({ _id:id })
        .then(r => {
            cp = r;
            return Group.remove({ _id: { $in: r.gr_ids }});
        })
        .then(() => { return Company.remove({ _id:id }) })
        .then(() => res.send({success: true}))
        .catch(err => res.send({ success: false, msg: err.message }))
}
