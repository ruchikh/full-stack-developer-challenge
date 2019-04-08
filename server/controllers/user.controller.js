const User = require('./../models/User')
const passport = require('passport')

module.exports = {
  signUp: (req, res) => {
      User.find({username: req.body.username}, (err, user) => {
			if(err) res.send(err)
				if(!user.length){
					var newUser = new User({
					username: req.body.username,
					email: req.body.email,
					password: req.body.password
		})

				newUser.save((err, data) => {
					if(err) res.send(err);
					res.json(data)
				})
				} else res.send({message:"user already exist"})
		})
	
	},
  logIn: (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      console.log(user)
      if (err) { return next(err); }
      if (!user) { 
        return res.status(404).json({
          msg: 'Invalid Username or Password'
        }) 
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).json({
          user 
        })
      });
    })(req, res, next);
  },
 isLoggedIn : (req, res) => {
    if(req.user) {
      User.findOne({_id : req.user._id}, (err, data) => {
        if(data) {
          res.json({
            user : data
          })
        } else {
          res.status(404).json({
            msg : "Please Sign Up. You are not logged in."
          })
        }
      })
    }
  },


  logout:(req, res) => {
    req.session.destroy();
    res.status(200).json({
      msg : "Session is removed"
    })
  },

  readArticles: (req, res) => {
    const id = req.user._id
    User.findByIdAndUpdate(id, {$push: {isRead: req.params.id}}, {new :true}, (err, post) => {
        if(err) return res.json({
          message: err,
          success: false
        });
          return res.json({
          message: "Article Added"
        });
    })
  },

 
  

}

