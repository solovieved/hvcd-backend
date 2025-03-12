var adminDB = db.getSiblingDB('admin');

adminDB.createUser({
  user: 'dickhead',
  pwd: 'Vxs5YE84Do57bhWV',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }],
});

const hvcdDB = db.getSiblingDB('hvcd');

hvcdDB.createUser({
  user: 'hvcd_user',
  pwd: '2FEAF46U3sn4adNQ',
  roles: [{ role: 'readWrite', db: 'hvcd' }],
});
