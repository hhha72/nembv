const Company = require('../../../../models/companies');
const Group = require('../../../../models/groups');

exports.list = (req, res) => {
    let { draw, search, skip, limit, order, sort, cp_id } = req.query;

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

    let f = {};
    if(cp_id) f.cp_id = cp_id;

    Group.count(f)
        .where('name').regex(search)
        .then(c => {
            d.cnt = c;
            const s = {};
            s[order] = sort;
            return Group.find(f)
                .where('name').regex(search)
                .populate('cp_id')
                .sort(s)
                .skip(skip)
                .limit(limit);
        })
        .then(ds => {
            d.ds = ds;
            res.send({ success: true, d: d })
        })
        .catch(err => res.send({ success: false, msg: err.message }));

    //res.send({success: false, msg: 'list 준비중입니다.'});
}

exports.add = (req, res) => {
    let { name, cp_id } = req.body;
    console.log('create group(cp_id): ' + cp_id);
    console.log('create group(name): ' + name);
    if(!cp_id) return res.send({success: false, msg: 'cp_id not exists'});
    if(!name) return res.send({success: false, msg: 'name not exists'});
    const gr = new Group({ name: name, cp_id: cp_id });
    gr.save()
        .then(r => {
            const f = { _id: r.cp_id };
            const s = { $addToSet: { gr_ids: r._id } };
            return Company.updateOne(f, s);
        })
        .then(r => {
            console.log('update Comp[any]: ' + JSON.stringify(r));
            if(!r.nModified) res.send({ success: false, msg : 'already group' });
            res.send({ success: true });
        })
        .catch(err => res.send({ success: false, msg: err.message }));

    //res.send({success: false, msg: 'add 준비중입니다.'});
}

exports.mod = (req, res) => {
    const set = req.body;
    if(!Object.keys(set).length) return res.send({ success: false, msg: 'body not set'});
    if (!set._id) return res.send({ success: false, msg: 'id not exitst'});
    const f = { _id: set._id };
    const s = { $set: set };
    Group.findOneAndUpdate(f, s)
        .then(r => res.send({ success: true }))
        .catch(err => res.send({ success: false, msg: err.message }));
    
    //res.send({success: false, msg: 'mod 준비중입니다.'});
}

exports.del = (req, res) => {
    const _id = req.query._id;
    if (!_id) return res.send({ success: false, msg: 'id not exitst'});
    Group.findOne({_id: _id})
        .then(r => {
            if(!r) throw new Error('group not exists');
            const f = { _id: r.cp_id };
            const s = { $pull: { gr_ids: r._id } };
            return Company.updateOne( f, s );
        })
        .then(() => { return Group.remove({ _id: _id }); })
        .then(() => res.send({ success: true }))
        .catch(err => res.send({ success: false, msg: err.message }));
    //res.send({success: false, msg: 'del 준비중입니다.'});
}
