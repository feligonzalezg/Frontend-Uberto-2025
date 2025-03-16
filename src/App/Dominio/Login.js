export class Login {
    constructor(user = '', pass = '') {
      this.user = user
      this.pass = pass
    }
    
  
    toJSON() {
      return {
        user: this.user,
        pass: this.pass,
      }
    }
  }
  
  Login.instance = null
  
  Login.getInstance = function() {
  if (!Login.instance) {
    Login.instance = new Login()
  }
  return Login.instance
  }
  