import { bloomFilter } from "core/bloom"
import { pgClient } from "core/pgClient"
import { redisClient } from "core/redisClient"
import { generateUID } from "core/uidGenerater"
import { sign } from "hono/jwt"
import { HttpStatus } from "@packages/statusCodes/status"
import { loadKey } from "core/loadkeys"

export const SignUp = async (
  contact: number
): Promise<[number, string | null]> => {
  try {
    if (!contact) {
      return [HttpStatus.BAD_REQUEST, null];
    }

    const contactStr: string = String(contact);

    if (bloomFilter.check(contactStr)) {

      const checkCache = await redisClient.get(contactStr);

      if (checkCache) {
        bloomFilter.add(contactStr);
        return [HttpStatus.CONFLICT, null];

      }
      else {
        const result = await pgClient.query(
          "SELECT id FROM users WHERE contact = $1",
          [contact]
        );
        if (result.rows.length > 0) {
          bloomFilter.add(contactStr)
          return [HttpStatus.CONFLICT, null]
        }
      }
    }

    // creatino process
    const id = generateUID(contact);

    const useInsert = await pgClient.query(
      "INSERT INTO users (id, contact) VALUES ($1, $2) RETURNING id",
      [id, contact]
    );

    const userId = useInsert.rows[0].id;
    redisClient.set(contactStr, userId);
    bloomFilter.add(contactStr);

    // sign token
    const payload = { userId }
    const privateKey = await loadKey("private.key");
    const token: string = await sign(payload, privateKey, "RS256");

    return [HttpStatus.CREATED, token]
  } catch (error) {
    console.log(error)
    return [HttpStatus.INTERNAL_SERVER_ERROR, null]
  }
}

