import React from "react";

// CSS
import styles from "../css/productPlaylist.module.css";

// Hooks
import { useEffect, useState } from "react";

// Component
import dynamic from "next/dynamic";
const DynamicTrackList = dynamic(() => import("./TrackList"));
import PeriodInfo from "./PeriodInfo";

const ProductPlaylist = React.memo(function ProductPlayList({ product }) {
  const [aboutItem, setAboutItem] = useState({});
  const [qauntityInfo, setQauntityInfo] = useState();

  useEffect(() => {
    const { aboutItem } = product;
    setAboutItem(aboutItem);
    setQauntityInfo(aboutItem?.quntityInfo);
  }, [product]);

  return (
    <div className={styles.aboutItem_wrapper}>
      <h3 className={styles.aboutItem_title}>{aboutItem?.title}</h3>
      <p className={styles.aboutItem_subTitle}>{aboutItem?.subTitle}</p>
      {product.quantityTerms && (
        <PeriodInfo
          period={qauntityInfo?.period}
          arrivalDate={qauntityInfo?.arrivalDate}
          maximum={qauntityInfo?.maximumPurchaseQuantity}
        />
      )}

      <div className={styles.item_spec_wrapper}>
        <p className={styles.item_spec}>
          * 스펙 : {qauntityInfo?.spec ? qauntityInfo?.spec : "LP"}
        </p>
        <p className={styles.item_spec}>* 색상 : {qauntityInfo?.color}</p>
      </div>

      <ul className={styles.playlist}>
        <DynamicTrackList
          disc={"Disc 1 Side A"}
          trackList={qauntityInfo?.trackList?.["Disc 1 Side A"]}
        />
        <DynamicTrackList
          disc={"Disc 1 Side B"}
          trackList={qauntityInfo?.trackList?.["Disc 1 Side B"]}
        />
        {qauntityInfo?.trackList?.["Disc 2 Side A"].length > 0 && (
          <DynamicTrackList
            disc={"Disc 2 Side A"}
            trackList={qauntityInfo.trackList["Disc 2 Side A"]}
          />
        )}
        {qauntityInfo?.trackList?.["Disc 2 Side B"].length > 0 && (
          <DynamicTrackList
            disc={"Disc 2 Side B"}
            trackList={qauntityInfo.trackList["Disc 2 Side B"]}
          />
        )}
      </ul>
    </div>
  );
});

export default ProductPlaylist;
