import { bloomFilter } from "core/bloom"
import { pgClient } from "core/pgClient"
import { redisClient } from "core/redisClient"
import { sign } from "hono/jwt"
import { HttpStatus } from "@packages/statusCodes/status"
import { loadKey } from "core/loadkeys"

export const Login = async (
  contact: number
): Promise<[number, string | null]> => {
  try {
    if (!contact) {
      return [HttpStatus.BAD_REQUEST, null]
    }

    const contactStr = String(contact);
    let userId: string | null = null;

    if (bloomFilter.check(contactStr)) {
      const cacheUserId = await redisClient.get(contactStr);
      if (cacheUserId) {
        userId = cacheUserId;
      } else {
        const result = await pgClient.query(
          "SELECT id FROM users WHERE contact = $1",
          [contact]
        );
        if (result.rows.length === 0) {
          return [HttpStatus.NOT_FOUND, null];
        }
        userId = result.rows[0].id;
        await redisClient.set(contactStr, userId as string);
      }
    } else {
      const result = await pgClient.query(
        "SELECT id FROM users WHERE contact = $1",
        [contact]
      );
      if (result.rows.length === 0) {
        return [HttpStatus.NOT_FOUND, null];
      }
      userId = result.rows[0].id;

      bloomFilter.add(contactStr);
      await redisClient.set(contactStr, userId as string);
    }

    const privateKey = await loadKey("private.key");
    const token: string = await sign({ userId }, privateKey, "RS256");

    return [HttpStatus.OK, token];
  } catch (error) {
    console.log(error)
    return [HttpStatus.INTERNAL_SERVER_ERROR, null]
  }
}

