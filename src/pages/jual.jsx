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

class JualProduk extends React.Component {
    validateNumber = number => {
        const re = /^\d+$/;
        return re.test(number);
    };
    handleJual = () => {
        if (
            this.props.jualNamaProduk === "" ||
            this.props.jualKeuntungan === "" ||
            this.props.jualDeskripsi === "" ||
            this.props.jualDesignUrl === "" ||
            this.props.jualJenisBahan === ""
        ) {
            alert("form tidak boleh kosong");
        } else if (!this.validateNumber(this.props.jualKeuntungan)) {
            alert("keuntungan harus berupa angka");
        } else {
            const req = {
                method: "post",
                url: this.props.baseUrl + "/toko/jual",
                headers: {
                    Authorization: "Bearer " + this.props.token
                },
                data: {
                    nama_barang: this.props.jualNamaProduk,
                    keuntungan: this.props.jualKeuntungan,
                    desain: this.props.jualDesignUrl,
                    jenis_bahan: this.props.jualJenisBahan,
                    deskripsi: this.props.jualDeskripsi
                }
            };
            console.log(this.props.jualJenisBahan);
            console.log(req.data);
        }
    };
    componentDidMount() {
        if (this.props.punyaToko) {
            this.props.getRandomQuote();
        } else {
            alert("kamu belum mempunyai toko");
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <body>
                <Header />
                <ModalLogin />
                <ModalRegisterToko />
                <ModalSignup />
                <div className="bgHome">
                    <HeaderQuote />
                </div>
                <div className="container-fluid">
                    <div className="container py-3">
                        <div
                            class="card"
                            style={{
                                backgroundColor: "#F7F7F7"
                            }}
                        >
                            <div class="card-header text-center">
                                Copyright &copy; 2020 TEESIGNR.
                            </div>
                            <div class="card-body border-bottom text-center">
                                <div className="row border-bottom">
                                    <h5 class="card-title mx-auto">
                                        <b>JUAL PRODUK</b>
                                    </h5>
                                </div>
                            </div>
                            <div className="container px-lg-5">
                                <form
                                    onSubmit={e => e.preventDefault(e)}
                                    className="border px-lg-5"
                                >
                                    <div className="form-group pt-3 row">
                                        <label
                                            for="jualNamaProduk"
                                            className="col-sm-4 col-form-label"
                                        >
                                            NAMA PRODUK
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="jualNamaProduk"
                                                className="form-control"
                                                id="jualNamaProduk"
                                                placeholder="Nama Produk"
                                                onChange={e =>
                                                    this.props.handleInput(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            for="jualKeuntungan"
                                            className="col-sm-4 col-form-label"
                                        >
                                            KEUNTUNGAN (Rp. /pcs)
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="jualKeuntungan"
                                                className="form-control"
                                                id="jualKeuntungan"
                                                placeholder="5000"
                                                onChange={e =>
                                                    this.props.handleInput(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            for="jualJenisBahan"
                                            className="col-sm-4 col-form-label"
                                        >
                                            JENIS BAHAN
                                        </label>
                                        <div className="col-sm-8">
                                            <select
                                                className="form-control"
                                                id="jualJenisBahan"
                                                name="jualJenisBahan"
                                                onChange={e =>
                                                    this.props.handleInput(e)
                                                }
                                            >
                                                <option value=""></option>
                                                <option
                                                    value="Combed 20s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Combed 20s
                                                </option>
                                                <option
                                                    value="Combed 24s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Combed 24s
                                                </option>
                                                <option
                                                    value="Combed 30s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Combed 30s
                                                </option>
                                                <option
                                                    value="Combed 40s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Combed 40s
                                                </option>
                                                <option
                                                    value="Bamboo 30s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Bamboo 30s
                                                </option>
                                                <option
                                                    value="Modal 30s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Modal 30s
                                                </option>
                                                <option
                                                    value="Supima 30s"
                                                    onClick={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    Supima 30s
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            for="jualDeskripsi"
                                            className="col-sm-4 col-form-label"
                                        >
                                            DESKRIPSI
                                        </label>
                                        <div className="col-sm-8">
                                            <textarea
                                                type="password"
                                                name="jualDeskripsi"
                                                className="form-control"
                                                id="jualDeskripsi"
                                                onChange={e =>
                                                    this.props.handleInput(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            for="jualDesignUrl"
                                            className="col-sm-4 col-form-label"
                                        >
                                            DESIGN (URL)
                                        </label>
                                        <div className="col-sm-8">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <input
                                                        type="text"
                                                        name="jualDesignUrl"
                                                        className="form-control"
                                                        id="jualDesignUrl"
                                                        placeholder="http://www.google.com/photo.jpg"
                                                        onChange={e =>
                                                            this.props.handleInput(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {!(
                                                this.props.jualDesignUrl === ""
                                            ) ? (
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <img
                                                            src={
                                                                this.props
                                                                    .jualDesignUrl
                                                            }
                                                            width={"100%"}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <React.Fragment></React.Fragment>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 py-1">
                                            <button
                                                type="submit"
                                                onClick={this.handleJual}
                                                className="btn btn-dark btn-block"
                                                data-dismiss="modal"
                                            >
                                                JUAL
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
    "quote, quoteAuthor, isLoadingQuote, jualNamaProduk, jualKeuntungan, jualJenisBahan, jualDesignUrl, jualDeskripsi, punyaToko",
    actions
)(withRouter(JualProduk));
