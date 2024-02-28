import { Link } from "react-router-dom";
import { GetMemberListResponse } from "../../http/response";
import { Dispatch, SetStateAction, useState } from "react";
import { useAddMemberQuery } from "../../http/query";

type FormDataType = {
  name: string;
  email: string;
  age: string;
}

type MemberListProps = {
  members: GetMemberListResponse | undefined;
};

const MemberList = ({ members }: MemberListProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const addMember = useAddMemberQuery();

  const addMemberHandler = function (e: React.FormEvent) {
    e.preventDefault();

    addMember.mutate({
      name: name,
      age: age,
      email: email,
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <div>멤버 리스트 컴포넌트</div>
        <div>
          <form onSubmit={addMemberHandler}>
            <div>
              <span>이름</span>
              <input type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}></input>
            </div>
            <div>
              <span>이메일</span>
              <input type="text" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <span>나이</span>
              <input type="number" value={age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value))}></input>
            </div>
            <button>등록</button>
          </form>
        </div>
      </div>
      <div>
        {
          members?.map(member => {
            return (
              <div key={member.id}>
                <Link to={`/member/${member.id}`}>
                  <span>{member.name}</span>
                  <span>{member.email}</span>
                  <span>{member.age}</span>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MemberList;