import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class OauthGuard extends AuthGuard('oauth') {
    // 1
    async canActivate(context: ExecutionContext) {
        // 2
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest() // 3
        await super.logIn(request) // 4
        // if (request.user.auth) request.session.totpRequire = true	// 5

        return result // 6
    }
}

/*

	1. The guard extends Passport's AuthGuard class and specifies that it is associated
	with the OAuth strategy via the "oauth" argument passed to AuthGuard("oauth").
	___________________________________________________________________________________

	2. The canActivate method of the guard is implemented to perform validation and
	authentication handling. It receives the execution context as argument.

	The authentication strategy is used in the context of the OauthGuard when the
	super.canActivate(context) method is invoked in the guard's canActivate method.

	When super.canActivate(context) is called, the OauthGuard delegates authentication
	to the Passport AuthGuard associated with the OAuth strategy. This AuthGuard is
	responsible for performing the entire authentication process using the specified
	strategy.

	The Passport AuthGuard, in turn, uses the strategy during the authentication
	process to verify the user's credentials and perform all necessary interactions
	with the corresponding OAuth provider (e.g., requesting an access token, verifying
	it and obtaining the authenticated user's details).

	___________________________________________________________________________________

	3. The current HTTP request is obtained from the context using
	context.switchToHttp().getRequest().
	___________________________________________________________________________________

	4. Super.logIn(request) method is called to complete the login process using
	Passport. This sets the authenticated user in the request.
	___________________________________________________________________________________

	5. Checks if the authenticated user has the auth property defined in its object.
	If so, request.session.totpRequire is set to true. This implies that two-factor
	authentication (e.g., via OTP) is required for the user.
	___________________________________________________________________________________

	6. The result of the initial validation performed in step 4 is returned true, the
	guard allows the request to continue processing. If false, the request is the
	request is blocked.

*/
