import { GetMemberResponse } from "../../http/response";

type MemberProps = {
  member: GetMemberResponse | undefined;
}

const Member = ({ member }: MemberProps) => {
  return (
    <div>
      <h2>Member components</h2>
      <div>
        <span>이름</span>
        <input type="text" disabled value={member?.name} />
      </div>
      <div>
        <span>이메일</span>
        <input type="text" disabled value={member?.email} />
      </div>
      <div>
        <span>나이</span>
        <input type="text" disabled value={member?.age} />
      </div>
    </div>
  )
};

export default Member;