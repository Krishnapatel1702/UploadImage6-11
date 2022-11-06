import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import moment from "moment";
import thumb from "./Images/thumbUp.jpg";
import thumblike from "./Images/thumbUplike.jpg";

function RecentlyAdded() {
  const [img, setImg] = useState();
  const [imgSetup, setImgSetup] = useState(false);

  const handleLike = (ind) => {
    const data = JSON.parse(localStorage.getItem("imageData"));

    const likedData = data.map((val, index) => {
      return index === ind ? { ...val, like: !val.like } : val;
    });

    localStorage.setItem("imageData", JSON.stringify(likedData));
    setImg(likedData);

    console.log("likedData", likedData);
    setImgSetup(!imgSetup);
  };

  useEffect(() => {
    const images = localStorage.getItem("imageData");
    images && images !== null ? setImg(JSON.parse(images)) : setImg();
  }, []);

  useEffect(() => {
    const images = localStorage.getItem("imageData");
    images && images !== null ? setImg(JSON.parse(images)) : setImg();
  }, [imgSetup]);

  return (
    <>
      <div>
        <Header />
        <div className="container">
          <div className="row">
            {img?.map((val, ind) => {
              return (
                <>
                  {moment().subtract(1, "day") < moment(val.createdAt) ? (
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
                                  style={{ cursor: "pointer" }}
                                  height="30"
                                  src={thumb}
                                  onClick={() => {
                                    handleLike(ind);
                                  }}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={thumblike}
                                  width="30"
                                  style={{ cursor: "pointer" }}
                                  height="30"
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
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentlyAdded;
