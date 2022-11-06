
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import moment from "moment";
import thumb from "./Images/thumbUp.jpg";
import thumblike from "./Images/thumbUplike.jpg";

function TopRated() {
  const [img, setImg] = useState();

  useEffect(() => {
    const images = localStorage.getItem("imageData");
    images && images !== null ? setImg(JSON.parse(images)) : setImg();
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="container">
          <div className="row">
            {img?.map((val, ind) => {
              return (
                <>
                  {
                    val.like ? (
                      <div className="col-md-4 col-sm-6 my-2">
                        <CardGroup>
                          <Card>
                            <Card.Img
                              key={ind}
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
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                  />
                                ) : (
                                  <img
                                    src={thumblike}
                                    width="30"
                                    height="30"
                                    style={{ cursor: "pointer" }}
                                    alt=""
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
                    ) : (
                      <></>
                    )
                  }
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopRated;
