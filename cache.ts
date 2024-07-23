import { join } from "https://deno.land/std@0.221.0/path/join.ts";
import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";

const CACHE_DIR_NAME = ".ip_checker_cache";
const EXPIRE_TIME = 1000 * 60 * 60 * 24; // 1 day

type CacheData = {
  data: string;
  expireEpoch: number;
};

export async function fetchWithCache<T extends object>(
  key: string,
  input: string | URL | Request,
  init?: RequestInit,
  isText?: false
): Promise<T>;
export async function fetchWithCache<T = string>(
  key: string,
  input: string | URL | Request,
  init?: RequestInit,
  isText?: true
): Promise<T>;
export async function fetchWithCache<T>(
  key: string,
  input: string | URL | Request,
  init?: RequestInit,
  isText?: boolean
): Promise<T> {
  const cacheData = read(key);
  if (cacheData != null) {
    return isText ? cacheData.data : JSON.parse(cacheData.data);
  }

  const res = await fetch(input, init);
  if (!res.ok || res.status !== 200) {
    throw new Error(`Failed to fetch ${input}`);
  }

  const responseData = await res.text();
  write(key, responseData);

  return isText ? responseData : JSON.parse(responseData);
}

// write cache data to file
function write(fileName: string, data: string) {
  const cacheData: CacheData = {
    data,
    expireEpoch: Date.now() + EXPIRE_TIME,
  };

  Deno.writeTextFileSync(
    join(tmpDir(), `${fileName}.json`),
    JSON.stringify(cacheData)
  );
}

// read cache data from file
function read(fileName: string): CacheData | null {
  try {
    const data = Deno.readTextFileSync(join(tmpDir(), `${fileName}.json`));
    const cacheData: CacheData = JSON.parse(data);

    // if cache data is expired, return null
    if (cacheData.expireEpoch < Date.now()) {
      return null;
    }

    return cacheData;
  } catch {
    return null;
  }
}

// return cache dir path
function tmpDir(): string {
  const currentDir = Deno.cwd();
  const dirPath = join(currentDir, CACHE_DIR_NAME);

  // if cache dir does not exist, create it
  if (!existsSync(dirPath)) {
    Deno.mkdirSync(dirPath);
  }

  return dirPath;
}
