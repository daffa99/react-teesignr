import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import { actions } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import BackToTop from "../components/backToTop";

class TentangKami extends React.Component {
  componentDidMount() {
    this.props.getRandomQuote();
  }
  render() {
    return (
      <body className="bgHome">
        <Header />
        <ModalLogin />
        <ModalSignup />
        <ModalRegisterToko />
        <HeaderQuote />
        <div className="container py-3">
          <div
            class="card text-center"
            style={{
              backgroundColor: "#f8f8f8",
              color: "#2b2b28"
            }}
          >
            <div class="card-header">
              <h5 class="card-title mx-auto my-auto py-2">
                <b>APA ITU TEESIGNR?</b>
              </h5>
            </div>
            <div class="card-body border-bottom">
              <p class="card-text">
                Secara singkat, TEESIGNR adalah sebuah <i>E-Commerce</i> A E S T
                H E T I C yang menyediakan tempat untuk semua orang yang ingin
                mendapatkan suatu desain atau karya original dari suatu desainer
                atau komunitas dalam bentuk T-SHIRT. Selain itu, TEESIGNR juga
                sebagai wadah untuk menghasilkan uang dengan bermodalkan karya
                atau desain
              </p>
            </div>
            <div class="card-body">
              <h5 class="card-title">
                <b>KEUNTUNGAN DALAM MENGGUNAKAN TEESIGNR</b>
              </h5>
              <div className="row border-bottom border-top">
                <div className="col-md-2 my-auto">
                  <img
                    src={require("../img/tentangkami1.png")}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-md-10 border-left my-auto">
                  <p class="card-text text-justify">
                    <b>Kualitas T-SHIRT yang terjamin. </b>
                    TEESIGNR menjadi tempat yang tepat untuk kebutuhan produksi
                    T-SHIRT dengan kamu sendiri yang menentukan desain dan bahan
                    T-SHIRT-nya. Kamu juga bisa pesan T-SHIRT untuk diri sendiri
                    dengan pilihan yang beragam dari berbagai desainer ataupun
                    komunitas dengan harga murah dan kualitas yang terjamin
                  </p>
                </div>
              </div>
              <div className="row py-3 border-bottom">
                <div className="col-md-10 border-right my-auto">
                  <p class="card-text text-justify">
                    <b>Buka toko dengan desain sendiri tanpa MODAL!</b> Buat
                    kamu yang punya banyak karya, ide, gambar, dan desain dapat
                    membuka toko online dengan hanya bermodalkan 0 rupiah dan
                    desain. TEESIGNR akan meng
                    <i>cover</i> semua biaya produksi, pengiriman, dan semuanya.
                    Kamu hanya tinggal mengirim desain, memilih bahan T-SHIRT,
                    dan menentukan berapa banyak keuntungan yang mau kamu ambil
                    dari setiap T-SHIRT yang terjual. TEESIGNR menjadi solusi
                    yang terbaik untuk mencari pendapatan sampingan dengan
                    memanfaatkan kreativitas kamu.
                  </p>
                </div>
                <div className="col-md-2 my-auto">
                  <img
                    src={require("../img/tentangkami2.png")}
                    className="w-100"
                    alt=""
                  />
                </div>
              </div>
              <div className="row py-3">
                <div className="col-md-12">
                  {localStorage.getItem("isLogin") === null ? (
                    <button
                      type="submit"
                      className="btn btn-dark"
                      data-toggle="modal"
                      data-target="#ModalSignup"
                    >
                      DAFTAR SEKARANG
                    </button>
                  ) : localStorage.getItem("punyaToko") === "false" ? (
                    <button
                      type="submit"
                      className="btn btn-dark"
                      data-toggle="modal"
                      data-target="#ModalRegisterToko"
                    >
                      MULAI BERJUALAN
                    </button>
                  ) : (
                    <Link to="/jual">
                      <button type="submit" className="btn btn-dark">
                        MULAI BERJUALAN
                      </button>
                    </Link>
                  )}
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
  "quote, quoteAuthor, isLoadingQuote",
  actions
)(withRouter(TentangKami));
