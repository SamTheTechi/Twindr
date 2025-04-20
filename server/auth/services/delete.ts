import { bloomFilter } from "core/bloom"
import { pgClient } from "core/pgClient"
import { redisClient } from "core/redisClient"
import { HttpStatus } from "@packages/statusCodes/status"

export const Delete = async (
  contact: number
): Promise<[number]> => {
  try {
    if (!contact) {
      return [HttpStatus.BAD_REQUEST]
    }

    const contactStr: string = String(contact);
    if (bloomFilter.check(contactStr)) {
      return [HttpStatus.NOT_FOUND]
    }

    await pgClient.query(
      "DELETE FROM users WHERE contact = $1",
      [contact]
    );
    redisClient.del(contactStr);

    return [HttpStatus.OK]
  } catch (error) {
    console.log(error)
    return [HttpStatus.INTERNAL_SERVER_ERROR]
  }
}

