import { http } from 'msw';
import { getMember, addMember, getMemberList } from './response';

export const apiList = [
  http.get(`/member`, getMemberList),
  http.get(`/member/:id`, getMember),
  http.post('/member', addMember),
]