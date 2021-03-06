import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderQuote from '../components/headerQuote';
import ModalLogin from '../components/modalLogin';
import ModalSignup from '../components/modalSignup';
import ModalRegisterToko from '../components/modalRegisterToko';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import Axios from 'axios';
import BackToTop from '../components/backToTop';
import swal from 'sweetalert';

class CheckoutPage extends React.Component {
  handleCheckout = () => {
    if (
      this.props.checkoutNama !== '' &&
      this.props.checkoutAlamat !== '' &&
      this.props.checkoutPembayaran !== '' &&
      this.props.checkoutTelepon !== ''
    ) {
      store.setState({ isLoadingCheckout: false });
      const req = {
        method: 'post',
        url: this.props.baseUrl + '/checkout',
        data: {
          nama_penerima: this.props.checkoutNama,
          no_telepon: this.props.checkoutTelepon,
          alamat_penerima: this.props.checkoutAlamat,
          metode_pembayaran: this.props.checkoutPembayaran
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      const self = this;
      Axios(req)
        .then(function(response) {
          store.setState({
            detailPembayaran: response.data.detail,
            isLoadingCheckout: true,
            checkoutNama: '',
            checkoutTelepon: '',
            checkoutAlamat: '',
            checkoutPembayaran: ''
          });
          swal('Sukses', 'Checkout Berhasil', 'success');
          self.props.history.push('/post-checkout');
        })
        .catch(function(error) {
          swal('Gagal', 'Terjadi Kesalahan Server', 'warning');
          store.setState({ isLoadingCheckout: true });
        });
    } else {
      swal('Gagal', 'Form tidak boleh kosong', 'warning');
    }
  };
  handleCancleCheckout = () => {
    const req = {
      method: 'delete',
      url: this.props.baseUrl + '/checkout',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const self = this;
    Axios(req).then(function(response) {
      swal(
        'Checkout Dibatalkan',
        `${response.data.status} ${response.data.message}`,
        'success'
      );
      self.props.history.push('/keranjang');
    });
  };
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
    const req = {
      method: 'get',
      url: this.props.baseUrl + '/checkout',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    Axios(req).then(function(response) {
      store.setState({
        listCheckout: response.data.list_belanjaan,
        totalHargaCheckout: response.data.total_belanja
      });
    });
    console.log(this.props.listCheckout);
  }
  render() {
    const listBelanja = this.props.listCheckout.map(value => (
      <li>
        {value.nama_barang} qty: {value.jumlah} ukuran: {value.ukuran} harga:{' '}
        {value.harga_barang}
      </li>
    ));
    return (
      <body className="bgHome">
        <Header handleSearch={this.props.handleSearch} />
        <ModalLogin />
        <ModalRegisterToko />
        <ModalSignup />
        <div className="bgHome">
          <HeaderQuote />
        </div>
        <div className="container-fluid pb-lg-5">
          <div className="container py-3">
            <div
              class="card"
              style={{
                backgroundColor: '#F7F7F7'
              }}
            >
              <div class="card-header text-center py-4">
                <div className="row">
                  <h4 class="card-title mx-auto my-auto">
                    <b>CHECKOUT</b>
                  </h4>
                </div>
              </div>
              <div className="container">
                <div className="row py-3">
                  <div className="col-md-12 text-center">
                    <h5>
                      <b>DETAIL PENGIRIMAN</b>
                    </h5>
                  </div>
                </div>
                <div className="container">
                  <form
                    onSubmit={e => e.preventDefault(e)}
                    className="border px-lg-5"
                  >
                    <div className="form-group pt-3 row">
                      <label
                        for="checkoutNama"
                        className="col-sm-4 col-form-label"
                      >
                        Nama Penerima
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="checkoutNama"
                          className="form-control"
                          id="checkoutNama"
                          placeholder="Nama Penerima"
                          onChange={e => this.props.handleInput(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group pt-3 border-top row">
                      <label
                        for="checkoutTelepon"
                        className="col-sm-4 col-form-label"
                      >
                        No. Telepon
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="checkoutTelepon"
                          className="form-control"
                          id="checkoutTelepon"
                          placeholder="08151111111"
                          onChange={e => this.props.handleInput(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group pt-3 border-top row">
                      <label
                        for="checkoutAlamat"
                        className="col-sm-4 col-form-label"
                      >
                        Alamat Penerima
                      </label>
                      <div className="col-sm-8">
                        <textarea
                          type="text"
                          name="checkoutAlamat"
                          className="form-control"
                          id="checkoutAlamat"
                          placeholder="Jl. Tidar No.23 Malang, Jawa Timur, Indonesia"
                          onChange={e => this.props.handleInput(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="container">
                <div className="row py-3">
                  <div className="col-md-12 text-center">
                    <h5>DETAIL PEMBAYARAN</h5>
                  </div>
                </div>
                <div className="container">
                  <form
                    onSubmit={e => e.preventDefault(e)}
                    className="border px-lg-5"
                  >
                    <div className="row py-3 border-bottom">
                      <div className="col-md-4">
                        <span>Total Harga</span>
                      </div>
                      <div className="col-md-8">
                        <span>Rp. {this.props.totalHargaCheckout}</span>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-md-4">
                        <span>List Belanja</span>
                      </div>
                      <div className="col-md-8">
                        <ul>{listBelanja}</ul>
                      </div>
                    </div>
                    <div className="form-group row pt-3 border-top">
                      <label
                        for="checkoutPembayaran"
                        className="col-sm-4 col-form-label"
                      >
                        Metoda Pembayaran
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          id="checkoutPembayaran"
                          name="checkoutPembayaran"
                          onChange={e => this.props.handleInput(e)}
                        >
                          <option value=""></option>
                          <option value="Cash on Delivery">
                            Cash on Delivery
                          </option>
                          <option value="TEESIGNR-PAY (Coming Soon)" disabled>
                            TEESIGNR-PAY (Coming Soon)
                          </option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div className="row py-3">
                    <div className="col-md-6 text-left col-6">
                      <button
                        type="submit"
                        onClick={this.handleCancleCheckout}
                        className="btn btn-dark"
                        data-dismiss="modal"
                      >
                        BATAL
                      </button>
                    </div>
                    <div className="col-md-6 text-right col-6">
                      {this.props.isLoadingCheckout ? (
                        <button
                          type="submit"
                          onClick={this.handleCheckout}
                          className="btn btn-dark"
                          data-dismiss="modal"
                        >
                          CHECKOUT
                        </button>
                      ) : (
                        <span>Sedang Checkout, Harap Tunggu</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  'isLoadingQuote, listCheckout, baseUrl, totalHargaCheckout, isLoadingCheckout, checkoutNama, checkoutTelepon, checkoutAlamat, checkoutPembayaran, detailPembayaran',
  actions
)(withRouter(CheckoutPage));
