import { inject, Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private readonly router: Router = inject(Router)
  private readonly poolData: ICognitoUserPoolData = {
    UserPoolId: environment.userPoolId,
    ClientId: environment.clientId
  }
  private readonly userPool: CognitoUserPool

  constructor() {
    this.userPool = new CognitoUserPool(this.poolData)
  }

  signUp(email: string, password: string) {
    this.userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        console.log("Sign up error", err)
        return
      }

      console.log("Sign up successful", result)

      this.router.navigate(['/confirm'])
    })
  }

  confirmSignUp(email: string, code: string) {
    const userData = { Username: email, Pool: this.userPool }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log("Confirm sign up error", err)
        return
      }

      console.log("Confirm sign up successful", result)

      this.router.navigate(['/login'])
    })
  }

  signIn(email: string, password: string) {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    })

    const userData = { Username: email, Pool: this.userPool }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("Sign in successful", result)

        this.router.navigate(['/home'])
        sessionStorage.setItem("token", result.getIdToken().getJwtToken())
      },
      onFailure: (err) => {
        console.log("Sign in error", err)
      }
    })
  }

  signOut() {
    const cognitoUser = this.userPool.getCurrentUser()

    if (cognitoUser) {
      cognitoUser.signOut()
    }

    sessionStorage.removeItem("token")
    this.router.navigate(['/login'])
  }
}
