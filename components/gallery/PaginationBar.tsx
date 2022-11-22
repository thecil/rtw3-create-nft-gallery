import { Pagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  pageKeys: any[];
  onClickPage(e: any, pageIndex: number): any;
}

const PaginationBar: React.FC<PaginationProps> = ({
  currentPage,
  pageKeys,
  onClickPage,
}) => {
  return (
    <Pagination className="justify-center ">
      <Pagination.First
        disabled={currentPage === 0}
        onClick={(e) => onClickPage(e, 0)}
      />
      <Pagination.Prev
        disabled={currentPage === 0}
        onClick={(e) => onClickPage(e, currentPage - 1)}
      />

      {pageKeys.map((page, i) => {
        return (
          <Pagination.Item
            key={page}
            active={currentPage === i}
            onClick={(e) => onClickPage(e, i)}
          >
            {i + 1}
          </Pagination.Item>
        );
      })}

      <Pagination.Next
        disabled={!pageKeys[currentPage + 1]}
        onClick={(e) => onClickPage(e, currentPage + 1)}
      />
    </Pagination>
  );
};

export default PaginationBar;
