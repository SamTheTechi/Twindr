import { BloomFilter } from "@packages/bloomfilters/bloom"

const ESTIMATED_ITEMS = 958500;
const ESTIMATED_HASHFUNCTIONS = 7;

export const bloomFilter = new BloomFilter(ESTIMATED_ITEMS, ESTIMATED_HASHFUNCTIONS)
