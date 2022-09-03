const axios = require('axios');
const db = require('../config/dbconfig');
const { createToken } = require('../config/token');

// Home page
module.exports = {
  getAlldata: (req, res) => {
    axios.get('https://kasirpintar.co.id/allAddress.txt')
    .then((response) => {
      const dat = response.data
      res.send(dat);
    })
    .catch((error) => {
      res.status(500).send(error);
    })
  },
  login: async (req, res) => {
    try {
      let { email, role } = req.body;
      let reqToken = createToken({email, role});
      const insertAll = `INSERT INTO auth (email, role, token) VALUES ('${email}', '${role}', '${reqToken}')`;
      const check = `SELECT token FROM auth WHERE email = '${email}'`;
      
      // cek user pada db, jika ada ? update token : insert all kolom
      db.query(check, (err, result) => {
        if (err) {
          return res.send({
            status: 'gagal insert database',
            message: err,
          });
        };
        // jika terdapat user, update token
        if (result.length > 0) {
          const updateToken = `UPDATE auth SET token = '${reqToken}' WHERE email = '${email}'`;
          db.query(updateToken, (errUpdt, resUpdt) => {
            if (errUpdt) {
              return res.send({
                status: 'query gagal',
                message: errUpdt,
              });
            };
            return res.send({
              status: 'success',
              message: `Berhasil update token pada email ${email}`,
              data: {
                token: reqToken,
                expTime: '2 Hours',
              },
            })
          });
        }else{  // insertAll jika belum ada user yang terdaftar
          db.query(insertAll, (errInAl, resInAl) => {
            if (errInAl) {
              return res.send({
                status: 'query gagal',
                message: errInAl,
              });
            };
            return res.send({
              status: 'success',
              message: `Berhasil membuat user baru ${email}`,
              data: {
                token: reqToken,
                expTime: '2 Hours',
              },
            })
          })
        }
      });  
    } catch (error) {
      console.log(error)
      res.status(500).send({
        status: 'gagal login',
        message: error,
      });
    }
  },
  getNamaByID: (req, res) => {
    const { id } = req.params;
    const header = req.headers;
    const tokenHeader = header['authorization'].split(' ')[1]
    const tokenVerif = `SELECT * FROM auth WHERE token = '${tokenHeader}'`;

    axios.get('https://kasirpintar.co.id/allAddress.txt')
    .then((response) => {
      const dat = response.data;
      keys = Object.keys(dat);
      
      db.query(tokenVerif, (err, result) => {
        if (err) {
          return res.send({
            status: 'query gagal',
            message: err,
          });
        }
        if (result.length > 0) {
          for (var i=1; i<keys.length; i++) {
            const arfilter = dat[keys[i]].filter((n) => n.id === id);
            console.log(arfilter);
    
            if(arfilter.length>0){
              return res.send({
                status: 'success',
                data: arfilter[0].nama,
              });
            }else{
              return res.status(400).send({
                status: 'gagal',
                message: 'input body tidak ditemukan pada data dummy',
              });
            }
          }
        } else {
          return res.status(400).send({
            status: 'fail',
            message: 'otentikasi error, token salah',
          })
        }
      });

      
    })
    .catch((error) => {
      res.send(error);
    })
  },
  getNamaByKotaID: (req, res) => {
    const { kota_id } = req.params;
    const header = req.headers;
    const tokenHeader = header['authorization'].split(' ')[1]
    const tokenVerif = `SELECT * FROM auth WHERE token = '${tokenHeader}'`;
    const namaKota = [];

    axios.get('https://kasirpintar.co.id/allAddress.txt')
    .then((response) => {
      const dat = response.data;
      keys = Object.keys(dat);

      const arfilter = dat[keys[1]].filter((n) => n.kota_id === kota_id);

      db.query(tokenVerif, (err, result) => {
        if (err) {
          return res.send({
            status: 'query gagal',
            message: err,
          });
        }
        if (result.length > 0) {
          if (arfilter.length > 0) {
            for (var i=0; i<arfilter.length; i++) {
              namaKota.push(arfilter[i].nama);
            }
            return res.send({
              status: 'success',
              data: namaKota,
            })
          } else {
            res.status(400).send({
              status: 'gagal',
              message: 'input body tidak ditemukan pada data dummy',
            });
          }
        } else {
          return res.status(400).send({
            status: 'fail',
            message: 'otentikasi error, token salah',
          })
        }
      });
      
    }).catch((error) => {
      res.status(400).send({
        status: 'fail',
        message: error,
      });
    })
  }
};
