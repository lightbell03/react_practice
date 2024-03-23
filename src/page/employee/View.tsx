import { useEffect } from "react";
import { getEmployees } from "../../http/api";

const EmployeePagingPage = () => {

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getEmployees();
  }

  return (<div>
    employee paging page
  </div>);
}

export default EmployeePagingPage;