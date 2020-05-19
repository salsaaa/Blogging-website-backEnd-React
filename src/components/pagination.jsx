import React from "react";
import _ from "lodash";

const Pagination = props => {
  const pages = _.range(1, props.pageCount + 1);
  return (
      <React.Fragment>

<div className="paging">

  {/* page number */}
  <div className="row mt-5">
      <div className="col text-center">
        <div className="block-27">
          <ul>
          {/* <li><a >&lt;</a></li> */}
  {pages.map(page => (
      <li
        className={page===props.activePage ?"active":"" } 
        
      >
      <a
      key={page}
      onClick={()=>props.onPageClicked(page)}
      >
            {page}
      </a>
      </li>
      
      
  ))}
            {/* <li><a >&gt;</a></li> */}

          </ul>
        </div>
      </div>
    </div>
</div>

      </React.Fragment>
  );
};

export default Pagination;
