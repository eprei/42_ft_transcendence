import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {

	constructor(private readonly userService: UserService) {
		super()
	}

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user.id)
    }
    deserializeUser(
        payload: any,
        done: Function
    ): any {
		this.userService.findOne(payload).then((user) => {
			done(null, user)
		}).catch((err) => {
			done(err, null)
		});
    }
}

/*

	To maintain a login session, Passport serializes and deserializes user information
	to and from the session. The information that is stored is determined by the
	application, which supplies a serializeUser and a deserializeUser function.

	A login session is established upon a user successfully authenticating using a
	credential. The following route will authenticate a user using a username and
	password. If successfully verified, Passport will call the serializeUser function,
	which in the below example is storing the user's ID, username, and picture.

		passport.serializeUser(function(user, cb) {
		process.nextTick(function() {
			return cb(null, {
			id: user.id,
			username: user.username,
			picture: user.picture
			});
		});
		});

	When the session is authenticated, Passport will call the deserializeUser function,
	which in the above example is yielding the previously stored user ID, username, and
	picture. The req.user property is then set to the yielded information.

*/
