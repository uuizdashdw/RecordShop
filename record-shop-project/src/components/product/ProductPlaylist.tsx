import React from 'react';

// CSS
import styles from '../css/productPlaylist.module.css';

// Hooks
import { useEffect, useState } from 'react';

// Component
import dynamic from 'next/dynamic';
const DynamicTrackList = dynamic(() => import('./TrackList'));
import PeriodInfo from './PeriodInfo';

// Type
import { ProductType, AboutItemType, QuntityInfo } from '../../types';

const ProductPlaylist = React.memo(function ProductPlayList({
	product,
}: {
	product: ProductType;
}) {
	const initialAboutItem = {
		id: 0,
		quntityInfo: {
			arrivalDate: '',
			color: '',
			maximumPurchaseQuantity: '',
			period: '',
			price: 0,
			spec: '',
			trackList: {
				'Disc 1 Side A': [],
				'Disc 1 Side B': [],
				'Disc 2 Side A': [],
				'Disc 2 Side B': [],
			},
		},
		subTitle: '',
		title: '',
		text: '',
	};
	const [aboutItem, setAboutItem] = useState<AboutItemType>(initialAboutItem);
	const [qauntityInfo, setQauntityInfo] = useState<QuntityInfo>(
		initialAboutItem.quntityInfo,
	);

	useEffect(() => {
		if (product && product.aboutItem) {
			const { aboutItem } = product;

			// aboutItem이 존재하는 경우에만 상태 업데이트
			setAboutItem(aboutItem);

			if (aboutItem && aboutItem.quntityInfo) {
				setQauntityInfo(aboutItem.quntityInfo);
			}
		}
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
					* 스펙 : {qauntityInfo?.spec ? qauntityInfo?.spec : 'LP'}
				</p>
				<p className={styles.item_spec}>* 색상 : {qauntityInfo?.color}</p>
			</div>

			<ul className={styles.playlist}>
				<DynamicTrackList
					disc={'Disc 1 Side A'}
					trackList={qauntityInfo?.trackList?.['Disc 1 Side A']}
				/>
				<DynamicTrackList
					disc={'Disc 1 Side B'}
					trackList={qauntityInfo?.trackList?.['Disc 1 Side B']}
				/>
				{qauntityInfo.trackList['Disc 2 Side A']?.length ? (
					<DynamicTrackList
						disc={'Disc 2 Side A'}
						trackList={qauntityInfo.trackList['Disc 2 Side A']}
					/>
				) : null}
				{qauntityInfo.trackList['Disc 2 Side B']?.length ? (
					<DynamicTrackList
						disc={'Disc 2 Side B'}
						trackList={qauntityInfo.trackList['Disc 2 Side B']}
					/>
				) : null}
			</ul>
		</div>
	);
});

export default ProductPlaylist;
