import { HttpResponse, delay, http } from "msw";
import { memberData } from "./data";
import { AddMemberPayload } from "../../http/payload";

export const getMember: Parameters<typeof http.get>[1] = ({ params }) => {
  const p = params as { id: string };
  const member = memberData.filter(member => member.id === Number(p.id));

  return HttpResponse.json(member[0]);
};

export const getMemberList = () => {
  return HttpResponse.json(memberData);
}

export const addMember: Parameters<typeof http.post>[1] = async ({ request }) => {
  delay(125);

  const body = (await request.json()) as AddMemberPayload;
  let id = (memberData.length === 0 ? 0 : memberData[memberData.length - 1].id) + 1;

  let newMember = {
    id: id,
    name: body.name,
    email: body.email,
    age: body.age
  };

  memberData.push(newMember);
  return HttpResponse.json(null);
}