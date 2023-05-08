import React, { useState, lazy, Suspense  } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TListData } from "./types/listTypes";
import useListAPI from "./api/useListAPI";
import "./App.css";

const ListItem = lazy(() => import('./components/ListItem'))
const ItemDetails = lazy(() => import('./components/ItemDetails'))

type TListType = {
  list?: TListData[];
};

export default function App() {
  const [text, setText] = useState({ entryText: "" });

  const [listData, setListData] = useState<TListType>({ list: [] });

  const updateList = (newList: TListData[]) => {
    setListData({ list: newList });
  };

  const updateEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText({ entryText: e.target.value });
    const timer = setTimeout(() => {
      useListAPI.handleSearch(text.entryText, updateList);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <div className="App">
                <div>
                  <label>Search:</label>
                  <input type="text" value={text.entryText} onChange={(e) => updateEntry(e)} />
                  {text.entryText.trim().length !== 0 ? (
                    <p>Searching</p>
                  ) : (
                    <p>Please type in a filter...</p>
                  )}
                </div>
                <table>
                  <tbody>
                    {listData.list?.map(
                      (
                        { artworkUrl60, trackName, artistName, trackId },
                        index
                      ) => (
                        <ListItem
                          key={index}
                          artworkUrl60={artworkUrl60}
                          trackName={trackName}
                          artistName={artistName}
                          trackId={trackId}
                        />
                      )
                    )}
                  </tbody>
                </table>
              </div>
            }
            path="/"
          />
          <Route
            element={<ItemDetails list={listData?.list} />}
            path="/:trackId"
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
