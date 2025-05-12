import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn: Function) => fn),
}));

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  let mockAxiosClient: Partial<AxiosInstance>;

  const mockResponseData = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };

  beforeEach(() => {
    jest.resetAllMocks();

    mockAxiosClient = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    } as Partial<AxiosInstance>;

    mockedAxios.create.mockReturnValue(mockAxiosClient as AxiosInstance);
  });

  test('should create instance with provided base url', async () => {
    expect.assertions(1);

    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('/posts/1');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    expect.assertions(1);

    await throttledGetDataFromApi('/posts/1');

    expect(mockAxiosClient.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    expect.assertions(1);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockResponseData);
  });
});
