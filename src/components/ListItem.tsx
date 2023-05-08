import React, { FC } from "react";
import { Link } from "react-router-dom";

type TListType = {
  artworkUrl60?: string;
  trackName?: string;
  artistName?: string;
  trackId?: number;
};

const ListItem: FC<TListType> = ({
  artworkUrl60,
  trackName,
  artistName,
  trackId
}) => {
  return (
    <tr>
      <td>
        <img src={artworkUrl60} alt={trackName} />
      </td>
      <td>{artistName}</td>
      <td>{trackName}</td>
      <td>
        <Link to={`${trackId}`}>Details</Link>
      </td>
    </tr>
  );
};

export default ListItem;
