import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
import TextTruncate from "react-text-truncate";
import { Link } from "react-router-dom";

class TokoPage extends React.Component {
    getTokoInfo = () => {
        const req = {
            method: "get",
            url: this.props.baseUrl + `/toko/${this.props.match.params.id}`
        };
        console.log("get toko");
        axios(req).then(function(response) {
            store.setState({
                tokoNama: response.data.nama,
                tokoDeskripsi: response.data.deskripsi,
                tokoPopularitas: response.data.popularitas,
                tokoListBarang: response.data["daftar jualan"]
            });
        });
    };
    componentDidMount() {
        store.setState({ isLoadingQuote: true });
        this.props.getRandomQuote();
        this.getTokoInfo();
    }
    render() {
        const loopBarangToko = this.props.tokoListBarang.map(value => (
            <div className="col-md-3 px-auto pb-4">
                <div class="card cardItem text-center">
                    <img
                        src={value.gambar}
                        class="card-img-top img-fluid"
                        alt="..."
                    />
                    <Link to={"/detail-produk/" + value.id}>
                        <a
                            class="btn btn-light border-bottom"
                            style={{ color: "black" }}
                        >
                            <TextTruncate
                                line={2}
                                truncateText="…"
                                text={value.nama}
                            />
                        </a>
                    </Link>
                    <span className="text-center py-1">{value.harga}</span>
                </div>
            </div>
        ));
        return (
            <body className="bgHome">
                <Header handleSearch={this.props.handleSearch} />
                <ModalLogin />
                <ModalRegisterToko />
                <ModalSignup />
                <HeaderQuote />
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-3 pr-0">
                            <div
                                class="card w-100"
                                style={{
                                    backgroundColor: "#1D2124"
                                }}
                            >
                                <img
                                    src={require("../img/storepic.jpg")}
                                    class="card-img-top"
                                    alt="..."
                                />
                                <div
                                    class="card-body"
                                    style={{ color: "white" }}
                                >
                                    <h4
                                        className="card-text text-center border-bottom pb-2"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {this.props.tokoNama}
                                    </h4>
                                    <span>
                                        Pop score : {this.props.tokoPopularitas}
                                    </span>
                                    <p className="card-text text-justify border-top py-2">
                                        {this.props.tokoDeskripsi}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div
                                class="card"
                                style={{ backgroundColor: "#1D2124" }}
                            >
                                <div class="card-header border-bottom">
                                    <span
                                        className="border-bottom border-dark"
                                        style={{ color: "white" }}
                                    >
                                        Menampilkan
                                        <i class="fa fa-fw fa-angle-right"></i>
                                        {" " + this.props.tokoNama}
                                    </span>
                                </div>
                                <div class="card-body">
                                    <div className="row">{loopBarangToko}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </body>
        );
    }
}
export default connect(
    "baseUrl, isLoadingQuote, quoteAuthor, tokoNama, tokoDeskripsi, tokoPopularitas, tokoListBarang",
    actions
)(withRouter(TokoPage));
