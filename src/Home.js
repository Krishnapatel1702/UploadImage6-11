import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import moment from "moment";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import thumb from "./Images/thumbUp.jpg";
import thumblike from "./Images/thumbUplike.jpg";
// import {ThumbUp} from 'react-feather';

function Home() {
  const [img, setImg] = useState();
  const [imgSetup, setImgSetup] = useState(false);

  const schema = Yup.object().shape({
    image: Yup.string().required("image is a required field"),
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLike = (ind) => {
    const data = JSON.parse(localStorage.getItem("imageData"));

    const likedData = data.map((val, index) => {
      return index === ind ? { ...val, like: !val.like } : val;
    });

    localStorage.setItem("imageData", JSON.stringify(likedData));
    setImg(likedData);
    setImgSetup(!imgSetup);

    // console.log("likedData", likedData);
    // navigate("/home");
  };

  useEffect(() => {
    const images = localStorage.getItem("imageData");
    images && images !== null ? setImg(JSON.parse(images)) : setImg();
  }, []);

  useEffect(() => {
    console.log("getting out");
    const images = localStorage.getItem("imageData");
    images && images !== null ? setImg(JSON.parse(images)) : setImg();
  }, [imgSetup]);

  return (
    <>
      <div>
        <Header />

        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShow}>
            Upload Image
          </Button>
        </div>

        <div className="container">
          <div className="row">
            {img?.map((val, ind) => {
              return (
                <>
                  <div className="col-md-4 col-sm-6 my-2">
                    <CardGroup>
                      <Card>
                        <Card.Img
                          variant="top"
                          width="300"
                          src={val.image}
                          style={{ height: "250px", objectFit: "contain" }}
                        />

                        <Card.Footer>
                          <div className="d-flex justify-content-between">
                            {!val.like || val.like === "" ? (
                              <img
                                width="30"
                                height="30"
                                src={thumb}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleLike(ind);
                                }}
                                alt=""
                              />
                            ) : (
                              <img
                                src={thumblike}
                                width="30"
                                height="30"
                                style={{ cursor: "pointer" }}
                                alt=""
                                onClick={() => {
                                  handleLike(ind);
                                }}
                              />
                            )}

                            <small className="text-muted">
                              {moment(val.createdAt).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )}
                            </small>
                          </div>
                        </Card.Footer>
                      </Card>
                    </CardGroup>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={schema}
              initialValues={{ image: "" }}
              validateOnMount={true}
              onSubmit={(values) => {
                // console.log("getting in ");
                // console.log(
                //   "values",
                //   values,
                //   localStorage.getItem("imageData") === "null"
                // );

                if (
                  localStorage.getItem("imageData") === "null" ||
                  localStorage.getItem("imageData") === null
                ) {
                  localStorage.setItem("imageData", JSON.stringify([values]));
                } else {
                  const Images = JSON.parse(localStorage.getItem("imageData"));
                  Images.push(values);
                  // console.log(Images, "Images");
                  localStorage.setItem("imageData", JSON.stringify(Images));
                }

                setImgSetup(!imgSetup);
              }}
            >
              {({
                values,
                errors,
                setValues,
                touched,
                isValid,
                handleBlur,
                handleSubmit,
              }) => (
                <div className="">
                  <div className="">
                    <form noValidate onSubmit={handleSubmit}>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => {
                          setValues({
                            image: URL.createObjectURL(e.target.files[0]),
                            createdAt: new Date(),
                            like: false,
                          });
                        }}
                        onBlur={handleBlur}
                        placeholder="Enter file id / username"
                        className="form-control inp_text"
                      />
                      <div className="mt-3">
                        {values.image !== "" ? (
                          <img
                            width="50px"
                            height="50px"
                            style={{ objectFit: "cover" }}
                            src={values.image}
                            alt="not found"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <p className="error" style={{ color: "red" }}>
                        {errors.image && touched.image && errors.image}
                      </p>
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="secondary"
                          className="me-3"
                          onClick={handleClose}
                        >
                          Close
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          onClick={() => {
                            console.log("isValid", isValid);
                            if (isValid) {
                              handleClose();
                            }
                          }}
                        >
                          Save Image
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Home;
