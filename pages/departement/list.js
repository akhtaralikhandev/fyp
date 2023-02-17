import Depart_List from "../../components/departement/list_depart";
import axios from "axios";
const List = ({ list }) => {
  return (
    <>
      <Depart_List list={list} />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(
    "http://localhost:3000/api/departement/departement"
  );
  return {
    props: {
      list: res.data,
    },
  };
};

export default List;
