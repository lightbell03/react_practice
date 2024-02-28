import axios, { Axios, AxiosHeaders } from 'axios';
import { getHttp } from '../../../src/http';
import { getMember } from '../../../src/http/api/memberCrud';
import { HttpClient } from '../../../src/http/httpClient';

jest.mock('axios');
jest.mock('../../../src/http');

const mockedAxios = axios as jest.Mocked<typeof axios>
jest.spyOn(getHttp)
const mockHttp = (getHttp as jest.Mock<Axios>).mockReturnValue(mockedAxios);

describe('Test member crud', () => {
    test('get member', () => {
        const payload = { id: "1" };
        const mockResponse = new Promise(resolve => resolve({
            id: 1,
            name: "name",
            age: 20,
            email: "email",
        }));
        const mockedGet = (mockHttp as jest.Mocked<typeof axios>).get.mockReturnValueOnce(mockResponse);
        const response = getMember(payload);

        expect(axios.get).toHaveBeenCalled();
        expect(response).toBe(mockedGet);
    })
});