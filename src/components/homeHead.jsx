import React from 'react';
import '../style/main.css';
import { Link } from 'react-router-dom';

const HomeHead = () => {
  return (
    <div
      className="container-fluid py-3 text-justify CousineFont"
      style={{ color: 'white' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Perkenalan,</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1>TEESIGNR.</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque blandit et velit ut elementum. Nulla facilisi. Nullam
              volutpat nulla massa, ut eleifend dui molestie eu. Suspendisse nec
              mi mauris. Mauris ornare justo ut lobortis pharetra. Fusce a nisl
              eu justo viverra ornare et ac arcu. Suspendisse eget nunc
              pharetra, sagittis neque nec, pretium justo. Praesent et odio at
              tellus luctus posuere. Pellentesque non gravida risus, accumsan
              ultrices risus. Pellentesque dapibus magna sit amet rhoncus
              convallis. Morbi et nibh venenatis, suscipit sapien non,
              ullamcorper ligula. Proin imperdiet mollis massa, id tincidunt
              arcu euismod sit amet. Vestibulum et porta lectus. Nunc pretium.
            </p>
          </div>
          <div className="col-md-5"></div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Link to="/tentang-kami">
              <button type="button" class="btn btn-dark">
                Tentang Kami <i class="fa fa-fw fa-angle-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHead;
