db.more.aggregate([{$group: {_id: "$name",age: { $sum: 1 },},},]);
db.more.aggregate([{$match:{$gt:16}}, {$group:{_id:"age", age:{$sum:'$age'}}}])
