import React from 'react';
import axios from 'axios';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

class ListHome extends React.Component {
  componentDidMount() {
    store.setState({ isLoadingSearch: true });
    // get listBarangSearch via API
    const req = {
      method: 'get',
      url: this.props.baseUrl + `/baju?orderby=terjual&sort=desc`
    };
    axios(req).then(function(response) {
      store.setState({
        listBarangSearch: response.data,
        isLoadingSearch: false
      });
      console.log(response.data);
    });
    // get listTokoSearch via API
    const reqToko = {
      method: 'get',
      url: this.props.baseUrl + '/toko?orderby=popularitas&sort=desc'
    };
    axios(reqToko).then(function(response) {
      store.setState({
        listTokoSearch: response.data,
        isLoadingSearch: false
      });
    });
  }
  render() {
    const loopBaju = this.props.listBarangSearch.slice(0, 4).map(value => (
      <div className="col-md-3 px-auto pb-4 col-sm-6">
        <div className="card text-center cardItem">
          <img
            src={value.gambar}
            className="card-img-top"
            style={{ width: '100%', height: '40vh', objectFit: 'cover' }}
            alt="..."
          />
          <Link to={'/detail-produk/' + value.id}>
            <span
              className="btn btn-light border-bottom w-100"
              style={{ color: 'black' }}
            >
              <TextTruncate line={2} truncateText="…" text={value.nama} />
            </span>
          </Link>
          <span className="text-center py-1">
            {value.harga.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        </div>
      </div>
    ));
    const loopToko = this.props.listTokoSearch.slice(0, 4).map(value => (
      <div className="col-md-4 px-auto pb-4 col-sm-4">
        <div className="card text-center">
          {value.barang_populer !== '' ? (
            <img
              src={value.barang_populer.gambar}
              className="card-img-top"
              style={{ width: '100%', height: '50vh', objectFit: 'cover' }}
              alt="..."
            />
          ) : (
            <img
              src={require('../img/no-image.jpg')}
              class="card-img-top img-fluid"
              alt="..."
              style={{ width: '100%', height: '50vh', objectFit: 'cover' }}
            />
          )}
          <Link to={'/toko/' + value.id}>
            <span
              className="btn btn-light border-bottom w-100"
              style={{ color: 'black' }}
            >
              <TextTruncate line={2} truncateText="…" text={value.nama} />
            </span>
          </Link>
          <span className="text-center py-1">
            Popularitas : {value.popularitas}
          </span>
        </div>
      </div>
    ));
    return (
      <React.Fragment>
        <div className="container py-3">
          <div className="card" style={{ backgroundColor: '#f2f6f5' }}>
            <div className="card-header">
              <Link to="/hasil">
                <span
                  className="btn btn-light border-bottom w-100"
                  style={{ color: 'black' }}
                >
                  T-SHIRT POPULER <i className="fa fa-fw fa-angle-right"></i>
                </span>
              </Link>
            </div>
            <div className="card-body">
              <div className="row">{loopBaju}</div>
            </div>
          </div>
        </div>
        <div className="container py-3">
          <div className="card" style={{ backgroundColor: '#f2f6f5' }}>
            <div className="card-header">
              <Link to="hasil-toko">
                <span
                  className="btn btn-light border-bottom w-100"
                  style={{ color: 'black' }}
                >
                  TOKO POPULER <i className="fa fa-fw fa-angle-right"></i>
                </span>
              </Link>
            </div>
            <div className="card-body">
              <div className="row">{loopToko}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  'baseUrl, listBarangSearch, listTokoSearch, isLoadingSearch',
  actions
)(withRouter(ListHome));
