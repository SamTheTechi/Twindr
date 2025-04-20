import { BloomFilter } from "@packages/bloomfilters/bloom";

const bf = new BloomFilter(1000, 5);

bf.add("some");
bf.add("new");

console.log(bf.check("kljh"));
