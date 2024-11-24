import React from 'react';

// CSS
import styles from '../css/tracklist.module.css';

interface TrackListProps {
	disc: string;
	trackList: string[];
}

const TrackList = React.memo(function TrackList({
	disc,
	trackList,
}: TrackListProps) {
	return (
		<li>
			<h4 className={styles.playlist_title}>{disc}</h4>
			<ul>
				{trackList && trackList.length ? (
					trackList.map((title, index) => (
						<li key={index}>
							<p className={styles.playlist_text}>
								{index + 1}. {title}
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
	);
});

export default TrackList;
