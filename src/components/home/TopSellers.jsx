import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import AOS from "aos";

const TopSellers = () => {
  AOS.init();

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopSellers = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div data-aos="fade-in" data-aos-duration="750">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12">
              <ol className="author_list">
                {loading
                  ? new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Skeleton circle={true} height={50} width={50} />
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={100} />
                          <Skeleton width={60} />
                        </div>
                      </li>
                    ))
                  : sellers.map((seller, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage || AuthorImage}
                              alt={seller.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`}>
                            {seller.authorName}
                          </Link>
                          <span>{seller.price} ETH</span>
                        </div>
                      </li>
                    ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
