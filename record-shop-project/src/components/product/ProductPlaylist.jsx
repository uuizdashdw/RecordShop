import React from 'react';

// CSS
import styles from '../css/productPlaylist.module.css';

// Hooks
import { useEffect, useState } from 'react';

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
				<div className={styles.key_point_wrapper}>
					{qauntityInfo?.period && (
						<p className={styles.key_point}>
							* 사전예약 기간 : {qauntityInfo?.period}
						</p>
					)}
					<p className={styles.key_point}>
						* 입고 예정일 : {qauntityInfo?.arrivalDate}
					</p>
					<p className={styles.key_point}>
						* 1인당 최대 구매수량 : {qauntityInfo?.maximumPurchaseQuantity}장
					</p>
				</div>
			)}

			<div className={styles.item_spec_wrapper}>
				<p className={styles.item_spec}>
					* 스펙 : {qauntityInfo?.spec ? qauntityInfo?.spec : 'LP'}
				</p>
				<p className={styles.item_spec}>* 색상 : {qauntityInfo?.color}</p>
			</div>

			<ul className={styles.playlist}>
				<li>
					<h4 className={styles.playlist_title}>Disc 1 Side A</h4>
					<ul>
						{qauntityInfo?.trackList?.['Disc 1 Side A'].length ? (
							qauntityInfo?.trackList?.['Disc 1 Side A'].map((item, index) => (
								<li key={index}>
									<p className={styles.playlist_text}>
										{index + 1}. {item}
									</p>
								</li>
							))
						) : (
							<li>
								<p className={styles.playlist_text}>정보 없음</p>
							</li>
						)}
					</ul>
				</li>

				<li>
					<h4 className={styles.playlist_title}>Disc 1 Side B</h4>
					<ul>
						{qauntityInfo?.trackList?.['Disc 1 Side B'].length ? (
							qauntityInfo?.trackList?.['Disc 1 Side B'].map((item, index) => (
								<li key={index}>
									<p className={styles.playlist_text}>
										{index + 1}. {item}
									</p>
								</li>
							))
						) : (
							<li>
								<p className={styles.playlist_text}>정보 없음</p>
							</li>
						)}
					</ul>
				</li>

				{qauntityInfo?.trackList?.['Disc 2 Side A'].length > 0 && (
					<>
						<li>
							<ul>
								{qauntityInfo?.trackList?.['Disc 2 Side A'].length ? (
									qauntityInfo?.trackList?.['Disc 2 Side A'].map(
										(item, index) => (
											<li key={index}>
												<p className={styles.playlist_text}>
													{index + 1}. {item}
												</p>
											</li>
										),
									)
								) : (
									<li>
										<p className={styles.playlist_text}>정보 없음</p>
									</li>
								)}
							</ul>
						</li>
						<li>
							<ul>
								{qauntityInfo?.trackList?.['Disc 2 Side B'].length ? (
									qauntityInfo?.trackList?.['Disc 2 Side B'].map(
										(item, index) => (
											<li key={index}>
												<p className={styles.playlist_text}>
													{index + 1}. {item}
												</p>
											</li>
										),
									)
								) : (
									<li>
										<p className={styles.playlist_text}>정보 없음</p>
									</li>
								)}
							</ul>
						</li>
					</>
				)}
			</ul>
		</div>
	);
});

export default ProductPlaylist;
