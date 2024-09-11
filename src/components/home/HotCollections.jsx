import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { PrevArrow, NextArrow } from "./CustomSliderArrows";
import AOS from "aos";

const HotCollections = () => {
  AOS.init();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotCollections = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hot collections:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div data-aos="fade-in" data-aos-duration="750">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <Slider {...sliderSettings}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="col-12" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton height={200} width={200} />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton circle height={40} width={40} />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton height={20} width={120} />
                          <Skeleton height={15} width={80} />
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((collection) => (
                    <div className="col-12" key={collection.nftId}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
