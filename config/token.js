const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (payload, expiresIn='2h') => {
    return jwt.sign(payload, 'aksesAPI', {
      expiresIn
    });
  },
  readToken: (req, res, next) => {
    // console.log(req.token);
    jwt.verify(req.token, 'aksesAPI', (err, decode) => {
      // console.log(decode);
      if (err){
        return res.status(400).send({
          status: 'fail',
          message: 'otentikasi error',
        })
      }
      if (decode.role === 'admin') {
        req.dataToken = decode;
        next();
      } else {
        res.send({
          status: 'permission failed',
          message: 'role bukan admin',
        })
      }
    });
  }
}