import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  netxPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState({ ...initState });

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
      setFetching(false);
    });
  }, [page, size, refresh]);
  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <h1>Products List Component</h1>
      {fetching ? <FetchingModal /> : <></>}
    </div>
  );
};

export default ListComponent;
