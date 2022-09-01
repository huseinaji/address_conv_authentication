
const axios = require('axios');
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
      res.send({
        status: 'request token berhasil',
        data: {
          reqToken,
          expTime: '2 Hours',
        },
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

    axios.get('https://kasirpintar.co.id/allAddress.txt')
    .then((response) => {
      const dat = response.data
      keys = Object.keys(dat);

      for (var i=1; i<keys.length; i++) {
        const arfilter = dat[keys[i]].filter((n) => n.id === id);
        console.log(arfilter);

        if(arfilter.length>0){
          return res.send({
            status: 'success',
            data: arfilter[0].nama,
          });
        }else{
          res.status(400).send({
            status: 'gagal',
            message: 'input body tidak ditemukan pada data dummy',
          });
        }
      }
    })
    .catch((error) => {
      res.send(error);
    })
  },
  getNamaByKotaID: (req, res) => {
    const { kota_id } = req.params;
    const namaKota = [];
    axios.get('https://kasirpintar.co.id/allAddress.txt')
    .then((response) => {
      const dat = response.data;
      keys = Object.keys(dat);

      const arfilter = dat[keys[1]].filter((n) => n.kota_id === kota_id);

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
      
    }).catch((error) => {
      res.status(400).send({
        status: 'fail',
        message: error,
      });
    })
  }
};
