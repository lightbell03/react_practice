import { useLocation, useParams } from "react-router-dom";
import Member from "../../components/member/Member"
import { useMemberQuery } from "../../http/query";

const MemberPage = () => {
  const { id } = useParams();
  const member = useMemberQuery({ id: id ?? '' }, true);

  return (
    <Member member={member.data} />
  )
}

export default MemberPage;