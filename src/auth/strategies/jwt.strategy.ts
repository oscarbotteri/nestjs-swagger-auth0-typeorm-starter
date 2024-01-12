import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AUTH0_CLIENT_ID'),
      issuer: `${configService.get<string>('AUTH0_ISSUER')}/`, // Last slash is important
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        cacheMaxEntries: 5,
        jwksUri: `${configService.get<string>(
          'AUTH0_ISSUER',
        )}/.well-known/jwks.json`,
      }),
    });
  }

  /**
   * Based on the way JWT signing works, we're guaranteed that we're receiving a
   * valid token that we have previously signed and issued to a valid user.
   * So, in this strategy this method is trivial, but we are extending a
   * global strategy, we need to implement this method.
   *
   * @param payload - Parsed JWT payload with the user data
   * @see https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/#Create-an-Authorization-Module
   * @see https://auth0.com/docs/secure/tokens/access-tokens
   * @see https://auth0.com/docs/secure/tokens/id-tokens
   */
  validate(payload: Record<string, unknown>): Record<string, unknown> {
    // TODO: transform to UserDTO
    return {
      firstName: payload.given_name,
      lastName: payload.family_name,
      nickName: payload.nickname,
      fullName: payload.name,
      picture: payload.picture,
    };
  }
}
