import { createHash } from "crypto";

export class BloomFilter {
  private array: boolean[];
  private hashFunctions: Function[];

  constructor(size: number, hashFunctionCount: number) {
    this.array = new Array(size).fill(false)
    this.hashFunctions = this.generateHashFunctions(hashFunctionCount)
  }

  private generateHashFunctions(num: number): Function[] {
    const hashFunctions = [];
    for (let i = 0; i < num; i++) {
      hashFunctions.push((str: string) => this.hash(str + i as string))
    }
    return hashFunctions;
  }

  private hash(str: string): number {
    const hash = createHash("sha256").update(str).digest("hex")
    const hashInt = parseInt(hash.slice(0, 8), 16)
    return hashInt % this.array.length
  }

  public add(item: string) {
    this.hashFunctions.forEach((hashFunc) => {
      const index = hashFunc(item);
      this.array[index] = true;
    })
  }

  public check(item: string): boolean {
    return this.hashFunctions.every((hashFunc) => {
      const index = hashFunc(item);
      return this.array[index]
    })
  }
}
