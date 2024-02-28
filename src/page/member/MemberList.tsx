import { ReactQueryDevtools } from "react-query/devtools";
import MemberList from "../../components/member/MemberList";
import { useMemberListQuery } from "../../http/query";

const MemberListPage = () => {
  const members = useMemberListQuery(true);

  return (
    <>
      <MemberList members={members?.data} />
      <ReactQueryDevtools />
    </>
  )
}

export default MemberListPage;