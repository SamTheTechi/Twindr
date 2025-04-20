import { bloomFilter } from "core/bloom"
import { pgClient } from "core/pgClient"
import { redisClient } from "core/redisClient"
import { verify } from "hono/jwt"
import { HttpStatus } from "@packages/statusCodes/status"

export const Delete = async (
  contact: number
): Promise<[number]> => {
  try {
    if (!contact) {
      return [HttpStatus.BAD_REQUEST]
    }

    const checkBloomFilter: string = String(contact);
    console.log(bloomFilter.check(checkBloomFilter))
    if (bloomFilter.check(checkBloomFilter)) {
      return [HttpStatus.NOT_FOUND]
    }

    //const result = await pgClient.query(
    //  "DELETE FROM users WHERE contact = $1",
    //  [contact]
    // );

    return [HttpStatus.CREATED]
  } catch (error) {
    console.log(error)
    return [HttpStatus.INTERNAL_SERVER_ERROR]
  }
}

