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

    const checkBloomFilter: string = String(contact);
    if (!bloomFilter.check(checkBloomFilter)) {
      const result = await pgClient.query("SELECT id FROM users WHERE contact = $1", [contact]);
      if (result.rows.length === 0) {
        return [HttpStatus.NOT_FOUND, null];
      }
      bloomFilter.add(checkBloomFilter);
    } else {
      const result = await pgClient.query("SELECT id FROM users WHERE contact = $1", [contact]);
      if (result.rows.length === 0) {
        return [HttpStatus.NOT_FOUND, null];
      }
    }

    console.log(result)
    const userId = result.rows[0].id

    const loadPrivateKey = await loadKey("private.key")
    const token: string = await sign({ userId }, loadPrivateKey, "RS256")

    return [HttpStatus.CREATED, token]
  } catch (error) {
    console.log(error)
    return [HttpStatus.INTERNAL_SERVER_ERROR, null]
  }
}

