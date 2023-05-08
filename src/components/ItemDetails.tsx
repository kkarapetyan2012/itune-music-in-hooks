import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TListData } from "../types/listTypes";

type TListType = {
  list?: TListData[];
};

const ItemDetails: FC<TListType> = ({ list }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { trackId } = params as { trackId: string };

  function handleClick() {
    navigate("/");
  }

  const newData = list?.find(
    (data: TListData) => data.trackId === Number(trackId)
  );

  return (
    <div>
      <h2>iTunes Mucis Searcher</h2>
      <br />
      <button type="button" onClick={handleClick}>
        Go Back
      </button>
      <br />
      <br />
      <div>
        <img src={newData?.artworkUrl60} alt="img" />
      </div>
      <div>{newData?.artistName}</div>
      <br />
      <div>
        Preview: <span>{newData?.trackName}</span>
      </div>
      <div>
        <audio controls autoPlay src={`${newData?.previewUrl}`}>
          <source src={`${newData?.previewUrl}`} type="audio/mp3" />
          <source src={`${newData?.previewUrl}`} type="audio/ogg" />
        </audio>
      </div>
    </div>
  );
};

export default ItemDetails;
