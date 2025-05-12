import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval * 2);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  let mockJoin: jest.Mock;
  let mockExistsSync: jest.Mock;
  let mockReadFile: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockJoin = path.join as jest.Mock;
    mockExistsSync = fs.existsSync as jest.Mock;
    mockReadFile = fsPromises.readFile as jest.Mock;
  });

  test('should call join with pathToFile', async () => {
    expect.assertions(1);

    mockExistsSync.mockReturnValue(false);

    await readFileAsynchronously('test.txt');

    expect(mockJoin).toHaveBeenCalledWith(expect.any(String), 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    expect.assertions(1);

    mockJoin.mockReturnValue('/mock/path/non-existent.txt');
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('non-existent.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect.assertions(3);

    const fileContent = 'This is the file content';
    mockJoin.mockReturnValue('/mock/path/existing.txt');
    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously('existing.txt');

    expect(result).toBe(fileContent);
    expect(mockExistsSync).toHaveBeenCalledWith('/mock/path/existing.txt');
    expect(mockReadFile).toHaveBeenCalledWith('/mock/path/existing.txt');
  });
});
