import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

// TODO CONTINUE HERE REVIEW
@Injectable()
export class OauthGuard extends AuthGuard('totp') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        if (request.user.auth) request.session.totpRequire = true

        return result
    }
}
