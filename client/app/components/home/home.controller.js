class HomeController {

  constructor () {

    this.signIn = true;
    this.signUp = false;
    this.isCustomer = true;
    this.isProvider = false;

  }

  onSignUp (credentials) {
    console.log(credentials);
  }

  onSignIn (credentials) {
    console.log(credentials);
  }

}

export default HomeController;
