import { useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ReadPage = () => {
  const { tno } = useParams();

  const navigate = useNavigate();

  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  const queryStr = createSearchParams({ page, size }).toString();

  const moveToModify = useCallback((tno) => {
    navigate(
      {
        pathname: `/todo/modify/${tno}`, //동적 페이지 이동 -> 값에 따른 변화
        search: queryStr, // Query String 유지
      },
      [tno, page, size]
    );
  });

  const moveToList = useCallback(() => {
    navigate(
      {
        pathname: `/todo/list/`, //동적 페이지 이동 -> 값에 따른 변화
        search: queryStr, // Query String 유지
      },
      [page, size]
    );
  });
  return (
    <div className="text-3xl font-extrabold">
      Todo Read Page Component {tno}
      <div>
        <button onClick={() => moveToModify(33)}>Test Modify</button>
        <button className="px-4" onClick={() => moveToList()}>
          Test List
        </button>
      </div>
    </div>
  );
};

export default ReadPage;
