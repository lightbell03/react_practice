import { useQueryGetDummy } from "../../http/query";

const JwtPage = () => {

  const getDummy1 = useQueryGetDummy({ dummyId: 1 });
  const getDummy2 = useQueryGetDummy({ dummyId: 2 });
  const getDummy3 = useQueryGetDummy({ dummyId: 3 });
  const getDummy4 = useQueryGetDummy({ dummyId: 4 });

  return (
    <div>
      <div>
        <h2>{getDummy1.data?.data.dummyData}</h2>
        <h2>{getDummy2.data?.data.dummyData}</h2>
        <h2>{getDummy3.data?.data.dummyData}</h2>
        <h2>{getDummy4.data?.data.dummyData}</h2>
      </div>
    </div>
  )
}

export default JwtPage;